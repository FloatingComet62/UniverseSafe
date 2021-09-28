const Discord = require('discord.js');
const ms = require('ms');

module.exports={
    name : 'mute',
    async execute( interaction , options , DB ){
        const member = options.getUser('target');
            const time = options.getNumber('time');
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
                if(time===null)
                {
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Done' )
                    .setDescription( 'I have tried to mute <@!' + member.id + '>\nIf it fails, then I do\nnot have the permission' );
                    Target.roles.add( mutedRole.id ).catch( () => {} );
                    interaction.reply( {
                        embeds : [
                            Embed
                        ],
                        ephemeral : true,
                    } );
                    return;
                }
                Target.roles.add( mutedRole.id );
                let timed = ms(time);
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( 'Muted <@' + member.id + '> for ' + timed );
                interaction.reply( {
                    embeds : [
                        Embed2
                    ],
                    ephemeral : true,
                } );
                setTimeout( 
                            function()
                            {
                                Target.roles.remove( mutedRole.id );
                            } , time
                        );

            }else{
                var Embed4 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'You are not allowed to use this command' )
                interaction.reply( {
                    embeds : [
                        Embed4
                    ],
                    ephemeral : true,
                } );
            }
    }
}