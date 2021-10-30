const Discord = require('discord.js');

module.exports={
    name : 'kick',
    execute( interaction , options ){
        const member = options.getUser('target')
            let perms = interaction.member.permissions.has( "KICK_MEMBERS" );
            if( perms )
            {
                const Target = interaction.guild.members.cache.get(member.id);
                if(Target.kickable){
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Done' )
                    .setDescription( "Kicked <@!" + member.id + ">" );
                    Target.kick();
                    interaction.reply( {
                        embeds : [
                            Embed
                        ],
                        ephemeral : true,
                    } );
                }else{
                    Embed = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "I can't kick that member" );
                    interaction.reply( {
                        embeds : [
                            Embed
                        ],
                        ephemeral : true,
                    } );
                }
            }else{
                var EmbedError2 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "You are not allowed to use this command" );
                interaction.reply( {
                    embeds : [
                        EmbedError2
                    ],
                    ephemeral : true,
                } );
            }
    }
}