const Discord = require( 'discord.js' );

module.exports = 
{
    name : 'ban' ,
    description : "Used to ban a user from the server(Needs admin perms)" ,
    execute( message , args )
    {
        const member = message.mentions.users.first();
        let perms = message.member.permissions.has( "BAN_MEMBERS" );
        if( perms )
        {
            if( member )
            {
                const Target = message.guild.members.cache.get(member.id);
                if( args[1] != undefined )
                {
                    Target.ban(
                                {
                                    reason : args[1]
                                }
                              );
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@' + message.author + '>\nReason : ' + args[1] );
                    Target.send( Embed );
                }else{
                    Target.ban();
                    var Embed2 = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@!' + message.author + '>' );
                    Target.send( Embed2 );
                }
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( 'Banned <@!' + member.id + '>' );
                message.channel.send( Embed3 );
            }else{
                var Embed4 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "You can't ban that member" );
                message.channel.send( Embed4 );
            }
        }else{
            var Embed5 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( 'You are not allowed to use this command' );
            message.channel.send( Embed5 );
        }
    }
}
