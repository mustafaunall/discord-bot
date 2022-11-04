const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const localization = require(`../localization/${config.localization_file}`);

module.exports.info = {
  title: localization.commands.delete.title,
  name: localization.commands.delete.name,
  color: localization.commands.delete.color,
  desc: localization.commands.delete.desc,
};

module.exports.execute = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(this.info.title)
    .setColor(this.info.color);

  const messageCount = args.length ? parseInt(args.shift()) : 10;

  await message.channel
    .bulkDelete(messageCount + 1)
    .then((m) => {
      console.log(`Bulk deleted ${m.size - 1} messages`);
      embed.addField(this.info.title, `${m.size - 1} mesaj silindi`);
    })
    .catch((e) => {
      embed.addField(this.info.title, "Hata nedeniyle mesajlar silinemedi!");
    });

  embed
    .setFooter({
      text: message.member.displayName,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp();

  message.channel.send({ embeds: [embed] }).then((msg) => {
    setTimeout(() => {
      msg.delete();
    }, 1500);
  });
};
