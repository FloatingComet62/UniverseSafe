const Discord = require("discord.js");

module.exports = 
{
    name : 'report' ,
    description : "Used to report people" ,
    async execute( message , args , CLIENT , DB )
    {
        const Reported = message.mentions.users.first();
        const Reporter = message.guild.members.cache.get(message.author.id);
        const reason = args.slice(1,args.length).toString().replace(/,/g, " ");
        var Loop = 1;
        if( Reported )
        {
            const reportedmember = message.guild.members.cache.get(Reported.id).user;
            const reportermember = message.guild.members.cache.get(Reporter.id).user;
            const ServerRef = DB.ref(message.guild.id)
            var MutedID = '';
            var ReportChID = '';
            await ServerRef.once('value',   function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    Val = childSnapshot.val();
                    if( Loop === 1 ) {
                        MutedID = Val.toString();
                        Loop = 2;
                    }else if( Loop === 2 ) {
                        ReportChID = Val.toString();
                        Loop = 1;
                    }
                });
            });
            if(ReportChID === '')
            {
                var Log = CLIENT.channels.cache.find(channel => channel.guild === message.guild && channel.name === "report-log" );
            }else{
                var Log = CLIENT.channels.cache.find(channel => channel.guild === message.guild && channel.id.slice(2,channel.id.length) === ReportChID );
            }
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
                    message.author.send( {
                        embeds : [
                            Embed1
                        ]
                    } );
                    Log.send( {
                        embeds : [
                            Embed2
                        ]
                    } )
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
                    message.author.send( {
                        embeds : [
                            Embed3
                        ]
                    } );
                    Log.send( {
                        embeds : [
                            Embed4
                        ]
                    } )
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
                .setDescription( "I couldn't find a channel named 'report-log'\nor a mentioned channel in my system,\n so I have made one!(Run the command again)" );
                message.channel.send( {
                    embeds : [
                        Embed
                    ]
                } );
            }
        }
        else
        {
            var EmbedError = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( "You can't report that member" );
            message.channel.send( {
                embeds : [
                    EmbedError
                ]
            } );
        }
    }
}
