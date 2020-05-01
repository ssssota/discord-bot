import * as Discord from 'discord.js'
import * as ShellQuote from 'shell-quote'
const { parse } = ShellQuote;

export default class DiscordBot {
  _token: string;
  client: Discord.Client;

  constructor(token: string) {
    this._token = token;
    this.client = new Discord.Client();
  }

  on(event: 'command', callback: (command: ShellQuote.ParseEntry[], message: Discord.Message) => void) {
    this.client.on('message', msg => {
      callback.call(this.client, parse(msg.content), msg);
    });
  }

  run() {
    this.client.login(this._token);
  }
}