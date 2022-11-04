const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const localization = require(`../localization/${config.localization_file}`);

module.exports.info = {
  title: localization.commands.ping.title,
  name: localization.commands.ping.name,
  color: localization.commands.ping.color,
  desc: localization.commands.ping.desc,
};

module.exports.execute = async (client, message) => {

  message.channel.send(this.info.title);
};
