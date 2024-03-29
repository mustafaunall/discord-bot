const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});
client.config = require("./config.json");
client.localization = require(`./localization/${client.config.localization_file}.json`);

client.commands = new Collection();
client.schedule = new Collection();
client.helpers = {};

client.on("ready", () => {
  console.log(
    client.localization.logged_in.toString().replace("{{BOT}}", client.user.tag)
  );
  //   setInterval(() => {
  //     client.channels.fetch("307197690863943691").then((user) => {
  //       try {
  //         user.send("Su içmeyi unutma");
  //       } catch (e) {
  //         console.log("Planlı mesaj hatası", e);
  //       }
  //     });
  //   }, 5000);
});

const helperFiles = fs
  .readdirSync("./helpers")
  .filter((file) => file.endsWith(".js"));

for (const file of helperFiles) {
  const helper = require(`./helpers/${file}`);
  const helperName = file.split(".js")[0];
  client.helpers[helperName] = helper;
  console.log(
    `${helperName} ${client.localization.console_logs.helper_loaded}`
  );
}

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.info.name, command);
  console.log(
    `${command.info.name} ${client.localization.console_logs.command_loaded}`
  );
}

const scheduleFiles = fs
  .readdirSync("./schedules")
  .filter((file) => file.endsWith(".js"));

for (const file of scheduleFiles) {
  const schedule = require(`./schedules/${file}`);
  const scheduleName = file.split(".js")[0];
  client.schedule.set(scheduleName, schedule);
  console.log(
    `${scheduleName} ${client.localization.console_logs.schedule_loaded}`
  );
}

client.on("messageCreate", async (message) => {
  if (client.config.spesific_channel === "yes") {
    if (message.channel.id !== client.config.channel_id) return;
  }
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;
  const commandBody = message.content.slice(client.config.prefix.length);
  const args = commandBody.split(" ");
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) {
    return await message.reply({
      content: client.localization.commands.not_found,
    });
  }

  await command.execute(client, message, args);
});

client.login(client.config.bot_token).then(() => {
  client.schedule.forEach((s) => {
    s.execute(client);
  });
});
