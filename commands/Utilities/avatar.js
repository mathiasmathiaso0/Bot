const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Devuelve el avatar del usuario mencionado!')
        .addUserOption(option => option.setName('mención').setDescription('Usuario a mencionar')),

    async run (client, interaction, language){
        const user = interaction.options.getUser('mención')

        if (user) {
            const embed = new MessageEmbed()
            .setColor(config.colorDefault)
            .setDescription(client.languages.__mf({ phrase: 'avatar.objective', locale: language }, { username: user.username }))
            .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({ text: client.languages.__mf({ phrase: 'avatar.footer' , locale: language }, {username: interaction.user.username}), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()

            return interaction.reply({ embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setColor(config.colorSecundary)
            .setDescription(client.languages.__({ phrase: 'avatar.self', locale: language}))
            .setImage(interaction.user.displayAvatarURL({ size: 4096, dynamic: true }))
            .setFooter({ text: client.languages.__mf({ phrase: 'avatar.footer' , locale: language }, {username: interaction.user.username}), iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()

            return interaction.reply({ embeds: [embed]})
        }   
    }
}