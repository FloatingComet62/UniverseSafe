const Discord = require( 'discord.js' );

module.exports =
{
    name : 'unmute' ,
    description : "Used to unmute a user in the server(Needs admin perms)" ,
    async execute( message , args , DB )
    {
        const member = message.mentions.users.first();
        let perms = message.member.permissions.has( "KICK_MEMBERS" && "BAN_MEMBERS" );
        var Loop = 1;
        if( perms )
        {
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
            if( member )
            {
                if( MutedID === '' )
                {
                    var mutedRole = message.guild.roles.cache.find( role => role.name.toLowerCase() === "muted" );
                }else{
                    var mutedRole = message.guild.roles.cache.find( role => role.guild === message.guild && role.id.slice(2,role.id.length) === MutedID );
                }
                if( mutedRole === undefined )
                {
                    var EmbedError = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "I couldn't find a role named 'Muted'\nor a role mentioned on my system\nPlease Contact a Mod for help" );
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
