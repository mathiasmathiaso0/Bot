const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
require('moment-duration-format');
const diagramMaker = require('../../functions/diagramMaker')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Mira el estado del bot!'),

    async run (client, interaction, language){
        await client.user.fetch();
        await client.application.fetch();

        interaction.reply({ content: 'Obteniendo estado del servidor...', ephemeral: true })
        const totalGuilds = client.guilds.cache.size
        const totalMembers = await client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)

        var mem = osu.mem
        let freeRAM, usedRAM, cpuUsage

        mem.info().then(info => {
            freeRAM = info['freeMemMb']
            usedRAM = info['totalMemMb'] - freeRAM
        })

        const cpu = osu.cpu
        const p1 = cpu.usage().then(cpuPercentage => {
            cpuUsage = cpuPercentage
        })

        await Promise.all([p1])


            if(client.ws.ping < 100){
                emoji = "🟢"
            } else if(client.ws.ping > 300){
                emoji = "🔴"
            } else {
                emoji = "🟠"
            }
        

        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setAuthor({ name: `Estado de ${client.user.username}`})
        .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096}))
        .addField(client.languages.__({ phrase: 'status.performance', locale: language}), "```" + `RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round((100 * usedRAM) / (usedRAM + freeRAM))}%]\nCPU: ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]\nPing: ${client.ws.ping} ms ${emoji}` + "```", false)
        .addField(client.languages.__({ phrase: 'status.system', locale: language}), "```" + `${client.languages.__({ phrase: 'status.processor', locale: language})}\nIntel ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB` + "```", false)
        .addField(client.languages.__({ phrase: 'status.so', locale: language}), "```" + `${os.type} ${os.release} ${os.arch}` + "```", false)
        .addField("Verified", "```" + `${client.user.flags.has("VERIFIED_BOT") ? "✅" : "⛔"}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.totalServers', locale: language}), "```" + `${totalGuilds}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.totalUsers', locale: language}), "```" + `${totalMembers}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.totalEmoticons', locale: language}), "```" + `${client.emojis.cache.size}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.totalChannels', locale: language}), "```" + `${client.channels.cache.filter((channel) => channel.type !== "GUILD_CATEGORY").size}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.totalCommands', locale: language}), "```" + `${client.commands.size}` + "```", true)
        .addField(client.languages.__({ phrase: 'status.botUptime', locale: language}), "```" + `${moment.duration(client.uptime).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", false)
        .addField(client.languages.__({ phrase: 'status.hostUptime', locale: language}), "```" + `${moment.duration(os.uptime * 1000).format(`D [Dias], H [Horas], m [Minutos], s [Segundos]`)}` + "```", false)
        .addField(client.languages.__({ phrase: 'status.lastStart', locale: language}), "```" + `${moment(client.readyAt).format("DD MMM YYYY HH:mm a")}` + "```", false)
        .addField("Node.js", "```" + `${process.version}` + "```", true)
        .addField("Discord.js", "```" + `${Discord.version}` + "```", true)
        .setFooter({ text: `Owner: ${interaction.client.application.owner.tag || "None"}`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()


        interaction.editReply({ content: ' ', embeds: [embed]})

    }
}