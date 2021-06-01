const { AkairoClient } = require("discord-akairo");
const config = require("./config/config.json");

class MusicClient extends AkairoClient {
  constructor() {
    super(
      {
        // Options for Akairo go here.
      },
      {
        // Options for discord.js goes here.
      }
    );
  }
}

const client = new MusicClient();
client.login(config.token).then(console.log("Bot is online!"));
