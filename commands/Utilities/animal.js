const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const translate = require('@iamtraction/google-translate');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('animal')
    .setDescription('Imagen random sobre animales!')
    .addStringOption(option => 
        option
        .setName('animal')
        .setDescription('Animales disponibles')
        .setRequired(true)
        .addChoice("Birds", "bird").addChoice("Cats", "cat").addChoice("Dogs", "dog").addChoice("Foxs", "fox").addChoice("Pandas", "panda").addChoice("Koalas", "koala").addChoice("Kangaroos", "kangaroo").addChoice("Raccoons", "raccoon").addChoice("Whales", "whale")
        ),


    async run (client, interaction, language){

        const animal = interaction.options.getString("animal");
        
        const emojis = {
            bird: "🐦",
            cat: "🐱",
            dog: "🐶",
            fox: "🦊",
            panda: "🐼",
            koala: "🐨",
            kangaroo: "🦘",
            raccoon: "🦡",
            whale: "🐳"
        };

        const photo = await axios.get(`https://some-random-api.ml/img/${animal}`);

        const embed = new MessageEmbed()
        .setTitle(`${emojis[animal]} ${animal} ${emojis[animal]}`)
        .setImage(photo.data.link)
        .setColor("RANDOM")
        return interaction.reply({ embeds: [embed] })
        
    }
}