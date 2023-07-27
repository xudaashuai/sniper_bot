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

https://t.me/yuemin_sniper_bot
