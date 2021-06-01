const { Command } = require("discord-akairo");

class PlayCommand extends Command {
  constructor() {
    super("play", {
      aliases: ["play"],
      channel: "guild",
      cooldown: 5000,
      ratelimit: 3,
      userPermissions: ["SEND_MESSAGES", "CONNECT"],
      clientPermissions: ["SPEAK", "CONNECT", "SEND_MESSAGES"],
      args: [
        {
          id: "query",
          type: "string",
          match: "rest",
          prompt: {
            start: "What would you like to search?",
            retry: "Invalid search try again!",
            optional: "false",
          },
        },
      ],
    });
  }

  async exec(message, { query }) {
    if (!query) {
      return message.reply(this.client.embed.NO_TEXT);
    }
    const vc = message.member.voice.channel;

    if (!vc) {
      return message.reply(this.client.embed.NO_VC);
    }

    await this.client.player
      .play(message, query)
      .catch((err) => console.log(err));
  }
}

module.exports = PlayCommand;
