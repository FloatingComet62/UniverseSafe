const Discord = require("discord.js");

module.exports = 
{
    name : 'ping' ,
    description : "Used to check the ping of the bot" ,
    execute( message , args )
    {
        var ping = message.createdTimestamp - Date.now() + " ms`";
        var ping = ping.replace(/-/g, "");
        var Embed = new Discord.MessageEmbed()
        .setDescription( "Pong! `" + ping );
        message.channel.send( {
            embeds : [
                Embed
            ]
        } );
    }
}