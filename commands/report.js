const Discord = require("discord.js");

module.exports = 
{
    name : 'report' ,
    description : "Used to report people" ,
    execute( message , args , CLIENT )
    {
        const Reported = message.mentions.users.first();
        const Reporter = message.guild.members.cache.get(message.author.id);
        const reason = args[1];
        if( Reported )
        {
            const reportedmember = message.guild.members.cache.get(Reported.id).user;
            const reportermember = message.guild.members.cache.get(Reporter.id).user;
            var Log = CLIENT.channels.cache.find(channel => channel.guild === message.guild && channel.name === "report-log" );
            if( Log )
            {
                if( reason )
                {
                    var Embed1 = new Discord.MessageEmbed()
                    .addFields(
                        { name : 'Reported' , value : 'We will provide you with the message which was sent to the logs,\nso that you make sure that you used the command correctly.\nIf there is a invalid usage, then it will be ignored.' } ,
                        { name : 'Carbon Copy of the Log' , value : 'Reporter : <@!' + reportermember + '>\nReported : <@!' + reportedmember + '>\n Reason : ' + reason + '' }
                    )
                    var Embed2 = new Discord.MessageEmbed()
                    .setTitle( 'Report' )
                    .setDescription( 'Reporter : <@!' + reportermember + '>\nReported : <@!' + reportedmember + '>\n Reason : ' + reason + '' );
                    message.author.send( Embed1 );
                    Log.send( Embed2 )
                    .then( 
                        function (message)
                        {
                        message.react( '✅' )
                        message.react( '❎' )
                        } );
                }
                else
                {
                    var Embed3 = new Discord.MessageEmbed()
                    .addFields(
                        { name : 'Reported' , value : 'We will provide you with the message which was sent to the logs,\nso that you make sure that you used the command correctly.\nIf there is a invalid usage, then it will be ignored.' } ,
                        { name : 'Carbon Copy of the Log' , value : 'Reporter : <@!' + reportermember + '>\nReported : <@!' + reportedmember + '>' }
                    )
                    var Embed4 = new Discord.MessageEmbed()
                    .setTitle( 'Report' )
                    .setDescription( 'Reporter : <@!' + reportermember + '>\nReported : <@!' + reportedmember + '>' );
                    message.author.send( Embed3 );
                    Log.send( Embed4 )
                    .then( 
                        function (message)
                        {
                        message.react( '✅' )
                        message.react( '❎' )
                        } );
                    
                }
            }
            else
            {
                message.guild.channels.create( 'report-log' , { type : "text" });
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "I couldn't find a channel named 'report-log', so I have made one!(Run the command again)" );
                message.channel.send( Embed );
            }
        }
        else
        {
            var EmbedError = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( "You can't report that member" );
            message.channel.send( EmbedError );
        }
    }
}