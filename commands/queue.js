const { Command } = require("discord-akairo");
const { FieldsEmbed } = require("discord-paginationembed");

class QueueCommand extends Command {
  constructor() {
    super("queue", {
      aliases: ["queue"],
      channel: "guild",
      cooldown: 5000,
      ratelimit: 3,
      userPermissions: ["SEND_MESSAGES", "CONNECT"],
      clientPermissions: ["SPEAK", "CONNECT", "SEND_MESSAGES", "ADD_REACTIONS"],
      // args: [
      //   {
      //     id: "query",
      //     type: "string",
      //     match: "rest",
      //     prompt: {
      //       start: "What would you like to search?",
      //       retry: "Invalid search try again!",
      //       optional: "false",
      //     },
      //   },
      // ],
    });
  }

  async exec(message, { query }) {
    const vc = message.member.voice.channel;

    if (!vc) return message.reply(this.client.embed.NO_VC);

    const queue = this.client.player.getQueue(message);

    if (!queue) return message.reply("No queue available");

    if (queue.tracks.length === 1) {
      let embed = this.client.util
        .embed()
        .setColor(this.client.embed.RANDOM)
        .setAuthor(
          `current queue in ${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .addField(
          `Currently play`,
          `[${queue.tracks[0].title}](${queue.tracks[0].url})\n Requested by ${queue.tracks[0].requestedBy}`
        )
        .setColor(this.client.embed.RANDOM);

      return message.channel.send(embed);
    }

    let i = 0;

    const FieldEmbed = new FieldsEmbed();

    FieldEmbed.embed
      .setColor(this.client.embed.MUSIC)
      .setAuthor(
        `current queue in ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .addField(
        `Currently play`,
        `[${queue.track[1].title}](${queue.track[0].url})\n Requested by ${queue.track[0].requestedBy}`
      );
    FieldEmbed.setArray(
      queue.tracks[1] ? queue.tracks.slice(1, queue.tracks.length) : []
    )
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setElementsPerPage(5)
      .setPageIndicator(true)
      .formatField(
        "Queue",
        (track) =>
          `${++i}.[(${tracks.title})](${track.url})\n Requested By ${
            track[0].requestedBy
          } `
      );

    FieldEmbed.build();
  }
}

module.exports = QueueCommand;
