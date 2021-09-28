const Discord = require('discord.js');

module.exports={
    name : 'clear',
    async execute( interaction , options ){
        var amount = options.getNumber('amount');
        let perms = interaction.member.permissions.has( "MANAGE_MESSAGES" );
        if( perms )
        {
            if( amount > 100 )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please enter a number less than 100" );
                interaction.reply( {
                    embeds : [
                        Embed
                    ],
                    ephemeral : true,
                } );
                return;
            }
            if( amount < 1 )
            {
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( "Please enter a +ve number" );
                interaction.reply( {
                    embeds : [
                        Embed
                    ],
                    ephemeral : true,
                } );
                return;
            }
            await interaction.channel.messages.fetch( { limit : amount } ).then( messages => {
                interaction.channel.bulkDelete(messages);
                var Embed = new Discord.MessageEmbed()
                .setTitle( 'Done' )
                .setDescription( amount + ' messages deleted' );
                interaction.reply( {
                    embeds : [
                        Embed
                    ],
                    ephemeral : true,
                } );
            } );
        }
        else
        {
            var Embed = new Discord.MessageEmbed()
            .setDescription( "You are not allowed to use this command" );
            interaction.reply( {
                embeds : [
                    Embed
                ],
                ephemeral : true,
            } );
        }
    }
}