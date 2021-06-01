const { Command } = require("discord-akairo");

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
      channel: "guild",
      cooldown: 5000,
    });
  }

  exec(message) {
    return message.reply("Pong!");
  }
}

module.exports = PingCommand;
