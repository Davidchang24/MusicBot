const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require("discord-akairo");
const config = require("./config/config.json");

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: "327752924472279040",
      },
      {
        disableMentions: "everyone",
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: "./commands/",
      prefix: "?",
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: "./inhibitors/",
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/",
    });
  }
}

const client = new MyClient();
client.login(config.token);
