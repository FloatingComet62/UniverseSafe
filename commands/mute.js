const ms = require('ms');
const Discord = require( 'discord.js' );
module.exports =
{
    name : 'mute' ,
    description : "Used to mute a user in the server(Needs admin perms)" ,
    execute( message , args )
    {
        const member = message.mentions.users.first();
        let perms = message.member.permissions.has( "KICK_MEMBERS" && "BAN_MEMBERS" );
        if( perms )
        {
            if( member )
            {
                let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted" );
                const Target = message.guild.members.cache.get(member.id);
                if(!args[1])
                {
                    Target.roles.add( mutedRole.id );
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Done' )
                    .setDescription( 'Muted <@!' + member.id + '>' );
                    message.channel.send( Embed );
                    return
                }
                Target.roles.add( mutedRole.id );
                let Seconds = ms(args[1])/1000;
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( 'Muted <@' + member.id + '> for ' + Seconds + 'seconds' );
                message.channel.send( Embed2 );
                setTimeout( 
                            function()
                            {
                                Target.roles.remove( mutedRole.id );
                            } , ms(args[1] )
                        );
            }else{
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "You can't mute that member" );
                message.channel.send( Embed3 );
            }
        }else{
            var Embed4 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( 'You are not allowed to use this command' )
            message.channel.send( Embed4 );
        }
    }
}