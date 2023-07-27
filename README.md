# Sniper bot

## 项目文件

- bot.ts
  - 程序入口， 主要包含用户的消息处理
- walletMenu.ts
  - 菜单定义
- types.ts
  - 类型定义
- utils.ts
  - 一些 util 函数

## 启动

clone 项目后在本地创建 .env 文件，写入

```
TELEGRAM_BOT_TOKEN="你的 bot token"
DEBUG="grammy*" # 设置这个环境变量可以看到运行日志
```

运行

```
deno task dev
```

## 演示

目前运行在 github codespace 上，可以点击 https://t.me/yuemin_sniper_bot 体验。

https://github.com/xudaashuai/sniper_bot/assets/19248941/fc151077-eca3-4a4b-b861-48482b95571d
