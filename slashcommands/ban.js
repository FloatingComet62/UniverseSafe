const Discord = require('discord.js');

module.exports={
    name : 'ban',
    execute( interaction , options ){
        const member = options.getUser('target');
            let perms = interaction.member.permissions.has( "BAN_MEMBERS" );
            const REASON = options.getString('reason');
            if( perms )
            {
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Banned' )
                .setDescription( 'Banned <@!' + member.id + '>' );
                const Target = interaction.guild.members.cache.get(member.id);
                if( REASON != null )
                {
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@' + interaction.user.id + '>\nReason : ' + REASON );
                    function err()
                    {
                        Embed = new Discord.MessageEmbed()
                        .setTitle( 'Gosh' )
                        .setDescription( '<@!' + interaction.user.id + '> attempted to ban you for "' + REASON +'", but failed.' );
                        Embed3 = new Discord.MessageEmbed()
                        .setTitle( 'Oops' )
                        .setDescription( "I can't ban that member" );
                    }
                    Target.ban(
                                {
                                    reason : REASON
                                }
                              ).catch( err() );
                    if(!Target.user.bot){
                        Target.send( {
                            embeds : [
                                Embed
                            ]
                        } );
                    }
                }else{
                    var Embed2 = new Discord.MessageEmbed()
                    .setTitle( 'Banned' )
                    .setDescription( 'Banner : <@!' + interaction.user.id + '>' );
                    Target.ban();
                    if(!Target.user.bot){
                        Target.send( {
                            embeds : [
                                Embed2
                            ]
                        } );
                    }
                }
                interaction.reply( {
                    embeds : [
                        Embed3
                    ],
                    ephemeral : true,
                } );
            }else{
                var Embed5 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'You are not allowed to use this command' );
                interaction.reply( {
                    embeds : [
                        Embed5
                    ],
                    ephemeral : true,
                } );
            }
    }
}