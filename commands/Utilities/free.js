const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate");
const timestamp = require("unix-timestamp");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("free")
    .setDescription("Juegos gratis!"),

  async run(client, interaction, language) {
    const games = await require("free-games")("en", "US").then((games) =>
      games.filter(
        (game) =>
          game.price.totalPrice.discount &&
          game.price.totalPrice.originalPrice == game.price.totalPrice.discount
      )
    );

    const embed = new Discord.MessageEmbed()
      .setDescription(
        `${games
          .map(
            (data) =>
              `[**${
                data.title
              }**](https://store.epicgames.com/free-games):\n~~$${
                data.price.totalPrice.discount / 100
              }~~\n\n ${data.description}\n`
          )
          .join("")}`
      )
      .setColor("#2F3136");

    interaction.reply({ embeds: [embed] });
  },
};
