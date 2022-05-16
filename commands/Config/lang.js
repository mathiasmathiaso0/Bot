const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const guildModel = require('../../models/guild')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lang')
        .setDescription('Cambia el lenguaje del servidor!')
        .addStringOption(option => option.setName('lang').setDescription('Lenguaje del servidor').setRequired(true).addChoice('Español', 'es').addChoice('English', 'en').addChoice('Portugues', 'pt')),

    async run (client, interaction){
        const language = interaction.options._hoistedOptions[0].value
        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: client.languages.__({phrase: 'lang.noAdministrator', locale: language}), ephemeral: true})
        await guildModel.findOne({ guildId: interaction.guildId.toString()}).then((s, err) => {
            if (err) return console.log(err)
            if (s) {
                s.lang = language
                s.save().catch(e => console.log(e))
            } else {
                const newGuild = new guildModel({
                    guildId: interaction.guildId.toString(),
                    lang: language
                })
                new Guild.save().catch(e => console.log(e))
            }
        })
        return interaction.reply({ content: client.languages.__({phrase: 'lang.newLanguage', locale: language}), ephemeral: true})
    }
}