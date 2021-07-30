const Discord = require("discord.js")


module.exports=
{
    name : 'help' ,
    description : "A helpful command for newbies" ,
    execute( message , args )
    {
        if( args[0] === undefined )
        {
            var Embed = new Discord.MessageEmbed()
            .setTitle( "Universesafe | Help" )
            .setDescription( "```Hello, I am Universesafe!\n I am a moderation bot which will moderate your server!```\n\n**Features**\n\n```I censor direct swear words, simplify moderation actions, like clear messages, ban, kick, mute & unmute```\n\n**Commands**\n\n```To get more info about the commands, use .help  commands  <command>```\n[] means optional\n() means compulsory\n***```Everyone commands ->```***\n1. `.ping`\n2. `.commands`\n3. `.poll (ChannelID) (MessageID)`***```Moderator commands ->```***\n1. `.mute (User) [Duration]`\n2. `.unmute (User)`\n3. `.clear (Number)`\n4. `.ban (User) [Reason]`\n5. `.kick (User)`\n6. `.report (User) [Reason]`\n\n**```Nexus```**\n[Vote](https://discordbotlist.com/bots/universesafe/upvote)\n[Invite Me](https://discord.com/oauth2/authorize?client_id=834415441358094416&permissions=8&scope=bot%20applications.commands)\n[Report a Bug](https://github.com/FloatingComet62/UniverseSafe/issues)" )
            .setThumbnail( 'https://cdn.discordapp.com/avatars/834415441358094416/0867183dc955b618e7754237dd30855c.png?size=128' )
            message.channel.send( Embed );
        }
        if( args[0] === 'commands' )
        {
            if( args[1] === undefined )
            {
                var EmbedError = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'Invaild usage' )
                .addFields(
                    { name : 'Example' , value : '`.help commands ping`' }
                )
                message.channel.send( EmbedError );
            }
            if( args[1] === 'ping' )
            {
                var Embed1 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Ping' )
                .setDescription( 'This command is used to know the respond time of UniverseSafe' )
                .addFields(
                    { name : 'Usage Example' , value : '`.ping`' } ,
                    { name : 'Permission' , value : 'Everyone' }
                );
                message.channel.send( Embed1 );
            }
            if( args[1] === 'commands' )
            {
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Command' )
                .setDescription( 'This command is used to show all the commands' )
                .addFields(
                    { name : 'Usage Example' , value : '`.commands`' } ,
                    { name : 'Permission' , value : 'Everyone' }
                );
                message.channel.send( Embed2 );
            }
            if( args[1] === 'poll' )
            {
                var Embed3 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Poll' )
                .setDescription( 'This command is used to React upvote and downvote' )
                .addFields(
                    { name : 'Usage Example' , value : '`.poll 753507198235050006 865911296426639370`' } ,
                    { name : 'Syntex' , value : '`.poll (ChannelID) (MessageID)`' } ,
                    { name : 'Permission' , value : 'Everyone' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed3 );
            }
            if( args[1] === 'mute' )
            {
                var Embed4 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Mute' )
                .setDescription( 'This command is used to Mute Someone' )
                .addFields(
                    { name : 'Usage Example' , value : '`.mute `<@!834415441358094416>` 5m`' } ,
                    { name : 'Syntex' , value : '`.mute (User) [Duration]`' } ,
                    { name : 'Permission' , value : 'Kick and Ban' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed4 );
            }
            if( args[1] === 'unmute' )
            {
                var Embed5 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Unmute' )
                .setDescription( 'This command is used to Unmute Someone' )
                .addFields(
                    { name : 'Usage Example' , value : '`.unmute `<@!834415441358094416>' } ,
                    { name : 'Syntex' , value : '`.unmute (User)`' } ,
                    { name : 'Permission' , value : 'Kick and Ban' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed5 );
            }
            if( args[1] === 'clear' )
            {
                var Embed6 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Clear' )
                .setDescription( 'This command is used to Clear messages' )
                .addFields(
                    { name : 'Usage Example' , value : '`.clear 10`' } ,
                    { name : 'Syntex' , value : '`.clear (Number)`' } ,
                    { name : 'Permission' , value : 'Manage Messages' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed6 );
            }
            if( args[1] === 'ban' )
            {
                var Embed7 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Ban' )
                .setDescription( 'This command is used to Ban people' )
                .addFields(
                    { name : 'Usage Example' , value : '`.ban `<@!834415441358094416>` This is the reason`' } ,
                    { name : 'Syntex' , value : '`.ban (User) [Reason]`' } ,
                    { name : 'Permission' , value : 'Ban' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed7 );
            }
            if( args[1] === 'kick' )
            {
                var Embed8 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Kick' )
                .setDescription( 'This command is used to Ban people' )
                .addFields(
                    { name : 'Usage Example' , value : '`.kick `<@!834415441358094416>' } ,
                    { name : 'Syntex' , value : '`.kick (User)`' } ,
                    { name : 'Permission' , value : 'Kick' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed8 );
            }
            if( args[1] === 'report' )
            {
                var Embed9 = new Discord.MessageEmbed()
                .setTitle( 'Commands | Report' )
                .setDescription( 'This command is used to Report people' )
                .addFields(
                    { name : 'Usage Example' , value : '`.report `<@!834415441358094416>` This is the reason`' } ,
                    { name : 'Syntex' , value : '`.report (User) [Reason]`' } ,
                    { name : 'Permission' , value : 'Everyone' }
                )
                .setFooter( '() is compulsary\n[] is optional' );
                message.channel.send( Embed9 );
            }
        }
    }
}
