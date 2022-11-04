const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const localization = require(`../localization/${config.localization_file}`);

module.exports.info = {
  title: localization.commands.cekilis.title,
  name: localization.commands.cekilis.name,
  color: localization.commands.cekilis.color,
  desc: localization.commands.cekilis.desc,
  field: localization.commands.cekilis.field,
};

module.exports.execute = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(this.info.title)
    .setColor(this.info.color);

  let members = message.guild.roles.cache
    .get(args[0].slice(3).slice(0, -1))
    .members.map((m) => m.user.id);

  const randomIdx = Math.floor(Math.random() * members.length);
  const winnerMember = message.guild.members.cache.get(members[randomIdx]).user;

  embed.addField(this.info.title, this.info.field.replace('##', `<@${winnerMember.id}>`));

  embed
    .setFooter({
      text: message.member.displayName,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp();

  message.channel.send({ embeds: [embed] });
};
