module.exports = {
  apps: [
    {
      name: "app",
      script: "./bot.ts",
      interpreter: "deno",
      interpreterArgs: "run --allow-env --allow-read --allow-net ",
    },
  ],
};
