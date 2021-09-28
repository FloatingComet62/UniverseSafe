const Discord = require("discord.js");

module.exports=
{
    name : 'update',
    description : 'Update the info in the database',
    async execute( message , args , DB )
    {
        let perms = message.member.permissions.has( "MANAGE_GUILD" );
        if( perms )
        {
            const ServerRef = DB.ref(message.guild.id);
            if( args[0] === 'mutedRole' )
            {
                const UpdateRole = message.mentions.roles.first();
                if( UpdateRole )
                {
                    ServerRef.update({
                        MutedID : parseInt(UpdateRole.id.slice(2,UpdateRole.id.length))
                    });
                    var Embed1 = new Discord.MessageEmbed()
                    .setTitle('Done')
                    .setDescription('Updated <@&' + UpdateRole.id + '>');
                    message.channel.send({
                        embeds : [
                            Embed1
                        ]
                    });
                }else{
                    var Embed3 = new Discord.MessageEmbed()
                    .setTitle('Oops')
                    .setDescription('Can you please mention the role?');
                    message.channel.send({
                        embeds : [
                            Embed3
                        ]
                    });
                }
            }else if( args[0] === 'reportedChannel' )
            {
                const UpdateChannel = message.mentions.channels.first();
                if( UpdateChannel )
                {
                    ServerRef.update({
                        ReportCHID : parseInt(UpdateChannel.id.slice(2,UpdateChannel.id.length))
                    });
                    var Embed2 = new Discord.MessageEmbed()
                    .setTitle('Done')
                    .setDescription('Updated <#' + UpdateChannel.id + '>');
                    message.channel.send({
                        embeds : [
                            Embed2
                        ]
                    });
                }else{
                    var Embed4 = new Discord.MessageEmbed()
                    .setTitle('Oops')
                    .setDescription('Can you please mention the channel?');
                    message.channel.send({
                        embeds : [
                            Embed4
                        ]
                    });
                }
                
            }else{
                var EmbedError = new Discord.MessageEmbed()
                .setTitle('Oops')
                .setDescription('What do I need to update?\nPossible options:\n`.update mutedRole <Role Mention>` or \n`.update reportedChannel <Channel Mention>`');
                message.channel.send({
                    embeds : [
                        EmbedError
                    ]
                });
            }
        }else{
            var EmbedNoPerms = new Discord.MessageEmbed()
            .setTitle('Oops')
            .setDescription("You don't have the permission to use this command");
            message.channel.send({
                embeds : [
                    EmbedNoPerms
                ]
            });
        }
        
    }
}