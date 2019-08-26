const Discord = require('discord.js');
const parse = require('shell-quote').parse

module.exports = class DiscordBot {
    constructor(apiKey) {
        this._apiKey = apiKey;
        this.client = new Discord.Client();
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}.`);
        })
    }

    setOnmessage(onmessage) {
        this.client.on('message', msg => {
            const command = parse(msg.content);
            onmessage(command, msg);
        });
    }

    start() {
        this.client.login(this._apiKey);
    }
}
