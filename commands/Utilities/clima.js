const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const { API_CLIMA_KEY } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clima")
    .setDescription("Clima...")
    .addStringOption((option) =>
      option.setName("ciudad").setDescription("ciudad").setRequired(true)
    ),

  async run(client, interaction, language) {
    const ciudad = interaction.options.getString("ciudad");

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=${language}&APPID=${API_CLIMA_KEY}`;

    const response = await fetch(`${url}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));

    if (response.cod === 401) {
      return interaction.reply(
        `No se encontro resultado para la ciudad: ${ciudad}`
      );
    }

    const Embed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setTitle(
        `${client.languages.__({
          phrase: "clima.resBus",
          locale: language,
        })} ${response.name}`
      )

      .setDescription(
        `
**${client.languages.__({ phrase: "clima.res", locale: language })}**
${response.name} ${client.languages.__({
          phrase: "clima.mismH",
          locale: language,
        })} ${response.weather[0].description}.
\n
**${client.languages.__({ phrase: "clima.temp", locale: language })}** ${(
          response.main.temp * 0.1
        ).toFixed(1)} Celsius
**${client.languages.__({ phrase: "clima.senTer", locale: language })}** ${(
          response.main.feels_like * 0.1
        ).toFixed(1)} Celsius
\n
**${client.languages.__({ phrase: "clima.tempMin", locale: language })}** ${(
          response.main.temp_min * 0.1
        ).toFixed(1)} Celsius
**${client.languages.__({ phrase: "clima.tempMax", locale: language })}** ${(
          response.main.temp_max * 0.1
        ).toFixed(1)} Celsius
**${client.languages.__({ phrase: "clima.hum", locale: language })}** ${
          response.main.humidity
        }%
`
      );
    interaction.reply({ embeds: [Embed] });
  },
};
