import { Menu } from "https://deno.land/x/grammy_menu@v1.2.1/menu.ts";
import { BotContext } from "./types.ts";

export const walletMenu = new Menu<BotContext>("wallet-menu", {
  onMenuOutdated: "Updated, try now.",
})
  .text("Add", async (ctx) => {
    // 发送消息并记录消息 id
    ctx.session.inputWallet.messageId = (
      await ctx.reply(
        "What would you like to name this copy trade wallet? 8 letters max, only numbers and letters.",
        {
          reply_markup: {
            force_reply: true,
          },
        }
      )
    ).message_id;
    ctx.session.inputWallet.state = "WAIT_FOR_NAME";
  })
  .text("Switch", (ctx) => {
    if (ctx.session.orderState === "Buy") {
      ctx.session.orderState = "Sell";
    } else {
      ctx.session.orderState = "Buy";
    }
    return ctx.menu.update();
  })
  .row()
  .text((ctx) => `${ctx.session.orderState} 0.01`)
  .text((ctx) => `${ctx.session.orderState} 0.05`)
  .row()
  // 动态添加 wallet 信息
  .dynamic(({ session }, range) => {
    if (session.wallet) {
      range.text(session.wallet.name).text(session.wallet.address).row();
    }
    return range;
  });
