const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const localization = require(`../localization/${config.localization_file}`);
const ms = require("parse-ms-commonjs");

module.exports.info = {
  title: localization.commands.uptime.title,
  name: localization.commands.uptime.name,
  color: localization.commands.uptime.color,
  desc: localization.commands.uptime.desc,
  field: localization.commands.uptime.field,
};

module.exports.execute = async (client, message) => {
  const embed = new MessageEmbed()
    .setTitle(this.info.title)
    .setColor(this.info.color);

  let date = ms(client.uptime);

  embed.addField(
    this.info.field,
    `${date.days} gün ${date.hours} saat ${date.minutes} dakika ${date.seconds} saniye`
  );

  embed
    .setFooter({
      text: message.member.displayName,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp();

  message.channel.send({ embeds: [embed] });
};
