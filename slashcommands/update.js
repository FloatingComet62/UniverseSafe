const Discord = require('discord.js');

module.exports={
    name : 'update',
    execute( interaction , options , DB ){
        let perms = interaction.member.permissions.has("MANAGE_GUILD");
            const Role = options.getRole('role');
            const Channel = options.getChannel('channel');
            var Embed = new Discord.MessageEmbed()
            .setTitle('Failed');
            if( perms )
            {
                const ServerRef = DB.ref(interaction.guild.id);
                if( Role )
                {
                    if( Role.id != undefined ){
                        ServerRef.update({
                            MutedID : parseInt(Role.id.slice(2,Role.id.length))
                        });
                        Embed = new Discord.MessageEmbed()
                        .setTitle('Done')
                        .setDescription('Updated <@&' + Role.id + '>');
                    }else{
                        Embed = new Discord.MessageEmbed()
                        .setTitle('Oops')
                        .setDescription('Make sure the channel exists');
                        return;
                    }
                }
                if( Channel )
                {
                    if( Channel.type === 'GUILD_TEXT' )
                    {
                        ServerRef.update({
                            ReportCHID : parseInt(Channel.id.slice(2,Channel.id.length))
                        });
                        if(Embed === null){
                            Embed = new Discord.MessageEmbed()
                            .setTitle('Done')
                            .setDescription('Updated <#' + Role.id + '>');
                        }else{
                            Embed = new Discord.MessageEmbed()
                            .setTitle('Done')
                            .setDescription('Updated \n<@&' + Role.id + '>\n <#' + Channel.id + '>');
                        }
                    }else{
                        Embed = new Discord.MessageEmbed()
                        .setTitle('Oops')
                        .setDescription('Make sure the the channel is a text channel');
                    }
                }
                if(Role === null && Channel === null){
                    Embed = new Discord.MessageEmbed()
                    .setTitle('Oops')
                    .setDescription('What do I need to update?\nPossible options:\n`.update mutedRole <Role Mention>` or \n`.update reportedChannel <Channel Mention>`');
                }
            }else{
                Embed = new Discord.MessageEmbed()
                .setTitle('Oops')
                .setDescription("You don't have the permission to use this command");
            }
            interaction.reply({
                embeds : [
                    Embed
                ],
                ephemeral : true,
            });
    }
}