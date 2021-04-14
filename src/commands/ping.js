const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "A basic ping command.",
    category: "misc",
    execute(message, args, client) {
        message.reply("Calculating ping...").then((rmsg) => {
            const ping = rmsg.createdTimestamp - message.createdTimestamp

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Pong!")
                .setTimestamp()
                .setDescription(`Bot latency: ${ping}, API Latency: ${client.ws.ping}`)

            rmsg.edit(embed)
        })
    }
}