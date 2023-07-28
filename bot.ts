import { Bot, session } from "https://deno.land/x/grammy@v1.17.2/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { BotContext } from "./types.ts";
import { sessionInitial, updateMenuMessage } from "./utils.ts";
import { walletMenu } from "./walletMenu.ts";

const bot = new Bot<BotContext>(config().TELEGRAM_BOT_TOKEN ?? "");
bot.use(session({ initial: sessionInitial }));

bot.use(walletMenu);
bot.command("start", async (ctx) => {
  // 发送菜单并记录 message id
  ctx.session.menuMessageId = (
    await ctx.reply(
      `Hi, this is Sniper Bot!${
        ctx.session.wallet
          ? `${ctx.session.wallet.name} ${ctx.session.wallet.address}`
          : ""
      } `,
      {
        reply_markup: walletMenu,
      }
    )
  ).message_id;
});

bot.on("message", async (ctx) => {
  // 判断当前是否在输入 wallet 信息
  if (
    // 正处在输入wallet 信息状态
    ctx.session.inputWallet.state !== "NOT_START" &&
    // 是对提问消息的回复
    ctx.message?.reply_to_message?.message_id ===
      ctx.session.inputWallet.messageId &&
    ctx.message.text
  ) {
    switch (ctx.session.inputWallet.state) {
      // 处理输入wallet name
      case "WAIT_FOR_NAME":
        if (!ctx.message?.text?.match(/^[\w\d]{1,8}$/)) {
          await ctx.reply(
            "This is not a valid wallet name. Name must be alphanumeric, 8 letters max."
          );
          ctx.session.inputWallet = {
            state: "NOT_START",
          };
          return;
        }
        ctx.session.inputWallet.state = "WAIT_FOR_ADDRESS";
        ctx.session.inputWallet.name = ctx.message.text;
        ctx.session.inputWallet.messageId = (
          await ctx.reply(
            "Reply to this message with the desired wallet address you'd like to copy trades from.",
            {
              reply_markup: {
                force_reply: true,
              },
            }
          )
        ).message_id;
        break;

      // 处理输入wallet address
      case "WAIT_FOR_ADDRESS":
        if (!ctx.message?.text?.match(/^0x[\w\d]{40}$/)) {
          await ctx.reply(
            "This is not a valid wallet address. Please try again."
          );
          ctx.session.inputWallet = {
            state: "NOT_START",
          };
          return;
        }

        ctx.session.wallet = {
          name: ctx.session.inputWallet.name!,
          address: ctx.message.text,
        };
        ctx.session.inputWallet = {
          state: "NOT_START",
        };
        // 更新最开始发给用户的 message
        await updateMenuMessage(ctx);
        ctx.reply("Added wallet");
        break;
    }
  }
});

bot.start();
