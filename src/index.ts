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

  on(event: ClientEvent, callback: any) {
    if (event === 'message') {
      this.client.on(event, msg => {
        callback.call(this.client, parse(msg.content), msg);
      });
    }
    this.client.on(event, callback.bind(this.client));
  }

  run() {
    this.client.login(this._token);
  }
}