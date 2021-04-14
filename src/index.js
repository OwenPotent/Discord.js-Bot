const { Client, Collection } = require('discord.js')
const { readdirSync } = require('fs')

const config = require('./config/config.json')
const prefix = config.prefix

require('dotenv').config()

const client = new Client();

client.commands = new Collection()
const commandFiles = readdirSync('./src/commands/').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
    console.log(`Loaded command "${command.name}"`)
}

client.on('ready', () => {
    console.log('The client is ready!')

    client.user.setActivity('Watching the whole world', { type: 'WATCHING' })
})

client.on('message', message => {
    if (message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).trim.split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('it seems like an error occured!');
    }
})

client.login(process.env.TOKEN)