const Discord = require("discord.js");
const moment = require("moment");
const color = require("../../Utils/colors.json");

module.exports = {
    config: {
        name: "channel",
        aliases: ["channel"],
        usage: "m!channel",
        description: "Shows information about the channel",
        category:"Core",
        noalias: "No Aliases",
        accessibility: "All members"
    },
    run: async (bot, message, args) => {
        try {
            const ch = message.mentions.channels.first() || message.channel
            const guild = message.channel.guild
            const createdBy = await guild.fetchAuditLogs()
            .then(async audit => audit.entries.find(entry=> entry.actionType == "CHANNEL_CREATE" && entry.target.name == ch.name).executor)

            

            const embed = new Discord.RichEmbed()
            .setColor(color.bb)
            .setAuthor(`Channel Info for ${ch.name}`)
            .setDescription(`<#${ch.id}>\nID: ${ch.id}`)
            .addField("Type", `${ch.type}`, true)
            .addField("Created at", `${moment(ch.createdAt).format('dddd, MMMM Do YYYY')}`, true)
            .addField("Information", `>>> ${ch.nsfw ? "false" : "NSFW is disabled in this channel"}\nCreated by ${createdBy.tag}`)
            

            message.channel.send(embed)
        } 
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`channel\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
            }
        }
    }