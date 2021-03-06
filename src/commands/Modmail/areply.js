const { bb } = require("../../Utils/colors.json");
const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "areply",
        aliases: ["areply", "a"],
        usage: "o!areply",
        description: "removes a user from Modmail thread",
        category:"Modmail",
        noalias: "d",
        accessibility: "d",
        example: "`o!help`\nView all the bots commands\n\n`o!help clap`\nGet more info about the clap command"
    },
    run: async (bot, message, args, user) => {
        try {
            if(message.channel.parentID !== '690370450219335681') return;

            message.react('✅')

            const array = message.channel.topic
            const id = array.split(' ')[2]
            const user = bot.users.cache.get(id)
            const content = args.slice(0).join(" ")
            const anon = bot.users.cache.find(x => x.username === 'DRIP')

            const am = new MessageEmbed()
                    .setAuthor('User#1234', anon.displayAvatarURL())
                    .setColor(bb)
                    .setDescription(content)
                    .setFooter('Message Recieved')
                    .setTimestamp()

            user.send(am)
        
        }
        catch(err) {
            const owner = await bot.fetchApplication().then(async application => `${application.owner.tag}`)
            message.channel.send(`**whoopsie doopsie**\nThere seems to be a problem with the \`sevrerinfo\` command, if this error occurs again message my creator for support (${owner})`)
            console.log(err)
        }
    }
}