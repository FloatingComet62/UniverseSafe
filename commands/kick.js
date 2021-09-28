const Discord = require("discord.js");

module.exports = 
{
    name : 'kick' ,
    description : "Used to kick a user from the server(Needs admin perms)" ,
    async execute( message , args )
    {
        const member = message.mentions.users.first();
        let perms = message.member.permissions.has( "KICK_MEMBERS" );
        if( perms )
        {
            if( member )
            {
                const Target = message.guild.members.cache.get(member.id);
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( "Kicked <@!" + member.id + ">" );
                function err()
                {
                    Embed = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "I can't kick that member" );
                }
                await Target.kick().catch( error => err( error ) );
                message.channel.send( {
                    embeds : [
                        Embed
                    ]
                } );
            }else{
                var EmbedError = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "You can't kick that member" );
                message.channel.send( {
                    embeds : [
                        EmbedError
                    ]
                } );
            }
        }else{
            var EmbedError2 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( "You are not allowed to use this command" );
            message.channel.send( {
                embeds : [
                    EmbedError2
                ]
            } );
        }
    }
}