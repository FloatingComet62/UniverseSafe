const Discord = require('discord.js');

module.exports={
    name : 'unmute',
    async execute( interaction , options , DB ){
        const member = options.getUser('target');
            let perms = interaction.member.permissions.has( "KICK_MEMBERS" && "BAN_MEMBERS" );
            var Loop = 1;
            if( perms )
            {
                const ServerRef = DB.ref(interaction.guild.id);
                var MutedID = '';
                var ReportChID = '';
                await ServerRef.once('value', function(snapshot) {
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
                    if( MutedID === '' )
                    {
                        var mutedRole = interaction.guild.roles.cache.find( role => role.name.toLowerCase() === "muted" );
                    }else{
                        var mutedRole = interaction.guild.roles.cache.find( role => role.guild === interaction.guild && role.id.slice(2,role.id.length) === MutedID );
                    }
                    if( mutedRole === undefined )
                    {
                        var EmbedError = new Discord.MessageEmbed()
                        .setTitle( 'Oops' )
                        .setDescription( "I couldn't find a role named 'Muted'\nor a role mentioned on my system\nPlease Contact a Mod for help" );
                        interaction.reply( {
                            embeds : [
                                EmbedError
                            ],
                            ephemeral : true,
                        } );
                        return;
                    }
                    const Target = interaction.guild.members.cache.get(member.id);
                    Target.roles.remove( mutedRole.id );
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Done' )
                    .setDescription( 'Unmuted <@!' + member.id + '>' );
                    interaction.reply( {
                        embeds : [
                            Embed
                        ],
                        ephemeral : true,
                    } );
            }else{
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'You are not allowed to use this command' );
                interaction.reply( {
                    embeds : [
                        Embed3
                    ],
                    ephemeral : true,
                } );
            }
    }
}