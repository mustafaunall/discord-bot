const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const localization = require(`../localization/${config.localization_file}`)

module.exports.info = {
    'title': localization.commands.ping.title,
    'name': localization.commands.ping.name,
    'color': localization.commands.ping.color,
}

module.exports.execute = async (client, message) => {
    const embed = new MessageEmbed()
        .setTitle(this.info.title)
        .setColor(this.info.color)
    
    await client.commands.forEach(command => {
        if (command.info.desc)
            embed.addField(`${client.config.prefix}${command.info.name}`, command.info.desc)
    })

    embed.setFooter({
        text: message.member.displayName,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp()

    message.channel.send({ embeds: [ embed ] })
}