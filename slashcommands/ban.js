const Discord = require('discord.js');

module.exports={
    name : 'ban',
    description : "Used to ban a user from the server(Needs admin perms)" ,
    execute( message , args )
    {
        const member = options.getUser('target');
        let perms = message.member.permissions.has( "BAN_MEMBERS" );
        const REASON = options.getString('reason');
        if( perms )
        {
            if( member )
            {
                const Target = message.guild.members.cache.get(member.id);
                var Embed;
                if(Target.bannable){
                    if(args[1])
                    {
                        Embed = new Discord.MessageEmbed()
                        .setTitle( 'Banned' )
                        .setDescription( 'Banner : <@' + message.author + '>\nReason : ' + REASON );
                        Target.ban({ reason : REASON });
                    }else{
                        Embed = new Discord.MessageEmbed()
                        .setTitle( 'Banned' )
                        .setDescription( 'Banned <@!' + member.id + '>' );
                        Target.ban();
                    }
                }else{
                    Embed = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( 'I can \' ban that member' );
                }
                message.channel.send( {
                    embeds : [
                        Embed
                    ]
                } );
            }else{
                var Embed4 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'You can\'t ban that member' );
                message.channel.send( {
                    embeds : [
                        Embed4
                    ]
                } );
            }
        }else{
            var Embed5 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( 'You are not allowed to use this command' );
            message.channel.send( {
                embeds : [
                    Embed5
                ]
            } );
        }
    }
}