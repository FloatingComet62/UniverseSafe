const Discord = require( 'discord.js' );

module.exports = 
{
    name : 'clear' ,
    description : "Used to clear messages from the channel(Needs admin perms)" ,
    async execute( message , args )
    {
        let perms = message.member.permissions.has( "MANAGE_MESSAGES" );
        if( perms )
        {
            if( !args[0] )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please mention the amount of messages which you want me to clear" );
                message.reply( {
                    embeds : [
                        Embed
                    ]
                } );
                return;
            }
            if( isNaN( args[0] ) )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please enter a number" );
                message.reply( {
                    embeds : [
                        Embed
                    ]
                } );
                return;
            }
            if( args[0] > 100 )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please enter a number less than 100" );
                message.reply( {
                    embeds : [
                        Embed
                    ]
                } );
                return;
            }
            if( args[0] < 1 )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please enter a +ve number" );
                message.reply( {
                    embeds : [
                        Embed
                    ]
                } );
                return;
            }

            await message.channel.messages.fetch( { limit : args[0] } ).then( messages => {
                message.channel.bulkDelete(messages);
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( args[0] + ' messages deleted' );
                message.channel.send( {
                    embeds : [
                        Embed
                    ]
                } );
            } );
        }
        else
        {
            var Embed = new Discord.MessageEmbed()
            .setDescription( "You are not allowed to use this command" );
            message.channel.send( {
                embeds : [
                    Embed
                ]
            } );
        }
    }
}