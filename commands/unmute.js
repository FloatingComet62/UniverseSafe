const Discord = require( 'discord.js' );

module.exports =
{
    name : 'unmute' ,
    description : "Used to unmute a user in the server(Needs admin perms)" ,
    execute( message , args )
    {
        const member = message.mentions.users.first();
        let perms = message.member.permissions.has( "KICK_MEMBERS" && "BAN_MEMBERS" );
        if( perms )
        {
            if( member )
            {
                let mutedRole = message.guild.roles.cache.find( role => role.name.toLowerCase() === "muted" );
                if( mutedRole === undefined )
                {
                    var EmbedError = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "I couldn't find a role named 'Muted'\nPlease Contact a Mod for help" );
                    message.channel.send( EmbedError );
                    return;
                }
                const Target = message.guild.members.cache.get(member.id);
                Target.roles.remove( mutedRole.id );
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( 'Unmuted <@!' + member.id + '>' );
                message.channel.send( Embed );
            }else{
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "You can't unmute that member" );
                message.channel.send( Embed2 );
            }
        }else{
            var Embed3 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( 'You are not allowed to use this command' );
            message.channel.send( Embed3 );
        }
    }
}
