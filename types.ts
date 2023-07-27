import {
  Context,
  SessionFlavor,
} from "https://deno.land/x/grammy@v1.17.2/mod.ts";

export interface SessionData {
  orderState: "Buy" | "Sell";

  // 记录一开始发给用户的带menu的 message id，之后完成wallet绑定之后需要修改这条message
  menuMessageId?: number;

  // 已经完成绑定的 wallet 信息
  wallet?: {
    name: string;
    address: string;
  };

  // 正在输入中的 wallet 信息
  inputWallet: {
    state: "NOT_START" | "WAIT_FOR_NAME" | "WAIT_FOR_ADDRESS";
    messageId?: number;
    name?: string;
    address?: string;
  };
}

export type BotContext = Context & SessionFlavor<SessionData>;
