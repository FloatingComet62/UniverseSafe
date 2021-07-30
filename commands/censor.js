const Discord = require('discord.js');
const ms = require('ms');
module.exports =
{
    name : 'censor' ,
    description : 'These are the words which get censored' ,
    execute( message )
    {
        function check_swear( word )
        {
            if( message.channel.id != '796295256840732723' || message.channel.id != '796396631091052584' )
            {
                let Lowmsg = message.content.toLowerCase();
                if( Lowmsg.includes( word )  && !message.author.bot && !message.member.permissions.has( "MANAGE_MESSAGES" ) )
                {
                    if( message.content === word )
                    {
                    message.delete();
                    const member = message.author.id;
                    let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted" );
                    const Target = message.guild.members.cache.get(member);
                    Target.roles.add( mutedRole.id );
                    var Embed = new Discord.MessageEmbed()
                    .setTitle( 'Warning' )
                    .setDescription( 'Muted <@!' + member + '> for `10` minutes for swearing' );
                    message.channel.send( Embed );
                    setTimeout( 
                                function()
                                {
                                    Target.roles.remove( mutedRole.id );
                                } , ms( '30m' )
                            );
                    }
                    let situation = " " + word + " ";
                    if( Lowmsg.includes( situation )  && !message.author.bot && !message.member.permissions.has( "MANAGE_MESSAGES" ) )
                    {
                        message.delete();
                        const member = message.author.id;
                        let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted" );
                        const Target = message.guild.members.cache.get(member);
                        Target.roles.add( mutedRole.id );
                        var Embed = new Discord.MessageEmbed()
                        .setTitle( 'Warning' )
                        .setDescription( 'Muted <@!' + member + '> for `10` minutes for swearing' );
                        message.channel.send( Embed );
                        setTimeout( 
                                    function()
                                    {
                                        Target.roles.remove( mutedRole.id );
                                    } , ms( '10m' )
                                );
                    }
                }
            }
        }
        check_swear( 'fuck' );
        check_swear( 'testes' );
        check_swear( 'dildo' );
        check_swear( 'porn' );
        check_swear( 'bitch' );
        check_swear( 'penis' );
        check_swear( 'vagina' );
        check_swear( 'shit' );
        check_swear( 'ass' );
        check_swear( 'asshole' );
        check_swear( 'bitch' );
        check_swear( 'cock' );


        let Lowmsg = message.content.toLowerCase();
        if( Lowmsg.includes( 'https://' ) && !message.author.bot && !message.member.permissions.has( "MANAGE_MESSAGES" ) && message.guild.id != '789711510850502706' )
        {
            if( message.channel.id === '801317385206366258' || message.channel.id === '796305956492410890' ) return;
            if( Lowmsg.includes( 'https://discord.com/channels/' ) ) return;
            if( Lowmsg.includes( 'https://tenor.com' ) ) return;
            if( Lowmsg.includes( 'https://cdn.discordapp.com' ) ) return;
            message.delete();
            const member = message.author.id;
            let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted" );
            const Target = message.guild.members.cache.get(member);
            Target.roles.add( mutedRole.id );
            message.channel.send( `Muted <@!` + member + `> for 5 mintues for sending a link` );
            setTimeout( 
                        function()
                        {
                            Target.roles.remove( mutedRole.id );
                        } , ms( '5m' )
                    );
        }
    }
}
