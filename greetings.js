const { Channel } = require("discord.js")

module.exports = {
    name: 'greetings',
    description: "Sends greetings to new guild members",
    execute(guildMember){
        // 985722599541731359 is the id of the welcome channel
        guildMember.guild.channels.cache.get('985722599541731359').send(`Greetings <@${guildMember.user.id}> to the server`);
    }
}