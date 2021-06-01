const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");

const config = require("./config/config.json");

const { Player } = require("discord-player");
const { MessageEmbed, Util } = require("discord.js");

class MusicBot extends AkairoClient {
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
      prefix: "!",
    });

    this.embed = require("./helpers/embed");

    this.listenerHandler = new ListenerHandler(this, {
      directory: "./listeners/",
    });

    this.player = new Player(this, {
      leaveOnEmpty: false,
    });

    this.player
      .on("trackStart", (message, track) =>
        message.channel.send(`Now playing ${track.title}...`)
      )
      .on("searchResults", (message, query, tracks) => {
        if (tracks.length > 10) tracks = tracks.slice(0, 10);
        let embed = new MessageEmbed()
          .setTitle("Top ten results")
          .setDescription()
          .setTimestamp(
            Util.escapeSpoiler(
              tracks.map((t, i) => `**${++i}-** ${t.title}`).join("\n")
            )
          )
          .setColor("RANDOM");
        message.channel.send(embed);
      });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }
}

const client = new MusicBot();
client.login(config.token);
