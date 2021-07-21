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
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Banned' )
                .setDescription( 'Banned <@!' + member.id + '>' );
                const Target = message.guild.members.cache.get(member.id);
                if( args[1] != undefined )
                {
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@' + message.author + '>\nReason : ' + args[1] );
                    function err()
                    {
                        Embed = new Discord.MessageEmbed()
                        .setTitle( 'Gosh' )
                        .setDescription( '<@!' + message.author + '> attempted to ban you for "' + args[1] +'", but failed.' );
                        Embed3 = new Discord.MessageEmbed()
                        .setTitle( 'Oops' )
                        .setDescription( "I can't ban that member" );
                    }
                    Target.ban(
                                {
                                    reason : args[1]
                                }
                              ).catch( err() );
                    Target.send( Embed );
                }else{
                    var Embed2 = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@!' + message.author + '>' );
                    function erro()
                    {
                        Embed2 = new Discord.MessageEmbed()
                        .setTitle( 'Gosh' )
                        .setDescription( '<@!' + message.author + '> attempted to ban you, but failed' );
                        Embed3 = new Discord.MessageEmbed()
                        .setTitle( 'Oops' )
                        .setDescription( "I can't ban that member" );
                    }
                    Target.ban().catch( erro() );
                    Target.send( Embed2 );
                }
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