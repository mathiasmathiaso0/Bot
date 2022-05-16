const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const translate = require('@iamtraction/google-translate');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('animals')
    .setDescription('Datos curiosos sobre animales!')
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
        const fact  = await axios.get(`https://some-random-api.ml/facts/${animal}`);

        const trad = await translate(fact.data.fact, { to: language })


        const embed = new MessageEmbed()
        .setTitle(`${emojis[animal]} Datos sobre ${animal} ${emojis[animal]}`)
        .setDescription(trad.text)
        .setImage(photo.data.link)
        .setTimestamp()
        .setColor("RANDOM")
        return interaction.reply({ embeds: [embed] })
        
    }
}