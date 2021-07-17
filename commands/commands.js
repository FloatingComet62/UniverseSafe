const Discord = require( 'discord.js' );

module.exports =
{
    name : 'commands' ,
    description : 'Used to mention all the commands' ,
    execute( message , args )
    {
        var Embed = new Discord.MessageEmbed()
        .setTitle( 'Commands' )
        .setDescription( '[] means optional\n() means compulsory\n***```My everyone commands ->```***\n1. `.ping`\n2. `.commands`\n3. `.poll  (ChannelID)  (MessageID)`***```My moderator commands ->```***\n1. `.mute  (User)  [Duration]`\n2. `.unmute  (User)`\n3. `.clear  (Number)`\n4. `.ban  (User)  [Reason]`\n5. `.kick  (User)`\n6. `.report (User) [Reason]`' );
        message.channel.send( Embed );
    }
}