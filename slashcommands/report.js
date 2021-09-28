const Discord = require('discord.js');

module.exports={
    name : 'report',
    async execute( interaction , options , DB , CLIENT ){
        const Reported = options.getUser('target');
        const Reporter = interaction.user;
        const reason = options.getString('reason');
        var Loop = 1;
        const ServerRef = DB.ref(interaction.guild.id)
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
            var Log = CLIENT.channels.cache.find(channel => channel.guild === interaction.guild && channel.name === "report-log" );
        }else{
            var Log = CLIENT.channels.cache.find(channel => channel.guild === interaction.guild && channel.id.slice(2,channel.id.length) === ReportChID );
        }
        if( Log )
        {
            if( reason )
            {
                var Embed1 = new Discord.MessageEmbed()
                .addFields(
                    { name : 'Reported' , value : 'We will provide you with the message which was sent to the logs,\nso that you make sure that you used the command correctly.\nIf there is a invalid usage, then it will be ignored.' } ,
                    { name : 'Carbon Copy of the Log' , value : 'Reporter : <@!' + Reporter + '>\nReported : <@!' + Reported + '>\n Reason : ' + reason + '' }
                )
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Report' )
                .setDescription( 'Reporter : <@!' + Reporter + '>\nReported : <@!' + Reported + '>\n Reason : ' + reason + '' );
                interaction.reply( {
                    embeds : [
                        Embed1
                    ],
                    ephemeral : true,
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
            }else{
                var Embed3 = new Discord.MessageEmbed()
                .addFields(
                    { name : 'Reported' , value : 'We will provide you with the message which was sent to the logs,\nso that you make sure that you used the command correctly.\nIf there is a invalid usage, then it will be ignored.' } ,
                    { name : 'Carbon Copy of the Log' , value : 'Reporter : <@!' + Reporter + '>\nReported : <@!' + Reported + '>' }
                )
                var Embed4 = new Discord.MessageEmbed()
                .setTitle( 'Report' )
                .setDescription( 'Reporter : <@!' + Reporter + '>\nReported : <@!' + Reported + '>' );
                interaction.reply( {
                    embeds : [
                        Embed3
                    ],
                    ephemeral : true,
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
        }else{
            interaction.guild.channels.create( 'report-log' , { type : "text" });
            var Embed = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( "I couldn't find a channel named 'report-log'\nor a mentioned channel in my system,\n so I have made one!(Run the command again)" );
            interaction.reply( {
                embeds : [
                    Embed
                ],
                ephemeral : true,
            } );
        }
    }
}