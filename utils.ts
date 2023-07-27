import { BotContext, SessionData } from "./types.ts";
import { walletMenu } from "./walletMenu.ts";

export function sessionInitial(): SessionData {
  return {
    orderState: "Buy",
    inputWallet: { state: "NOT_START" },
  };
}

export async function updateMenuMessage(ctx: BotContext) {
  if (ctx.session.wallet && ctx.chat?.id && ctx.session.menuMessageId) {
    await ctx.api.editMessageText(
      ctx.chat.id,
      ctx.session.menuMessageId,
      `Hi, this is Sniper Bot!\n${ctx.session.wallet.name} ${ctx.session.wallet.address}`
    );
    await ctx.api.editMessageReplyMarkup(
      ctx.chat.id,
      ctx.session.menuMessageId,
      {
        reply_markup: walletMenu,
      }
    );
  }
}
