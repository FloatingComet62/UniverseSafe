const Discord = require('discord.js');

module.exports={
    name : 'update',
    async execute( interaction , options , DB ){
        let perms = interaction.member.permissions.has("MANAGE_GUILD");
            const Role = options.getRole('role');
            const Channel = options.getChannel('channel');
            var Embed = null;
            const ServerRef = DB.ref(interaction.guild.id);
            if( perms )
            {
                if( Role )
                {
                    if( Role.id != undefined ){
                        var MutedID = '';
                        var ReportChID = '';
                        var Loop = 1;
                        await ServerRef.once('value',   function(snapshot) {
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
                        if(ReportChID != ''){
                            ServerRef.update({
                                MutedID : parseInt(Role.id.slice(2,Role.id.length)),
                                ReportCHID : ReportChID
                            });
                        }else{
                            ServerRef.update({
                                MutedID : parseInt(Role.id.slice(2,Role.id.length)),
                                ReportCHID : ''
                            });
                        }
                        Embed = new Discord.MessageEmbed()
                        .setTitle('Done')
                        .setDescription('Updated <@&' + Role.id + '>');
                    }else{
                        Embed = new Discord.MessageEmbed()
                        .setTitle('Oops')
                        .setDescription('Make sure the role exists');
                    }
                }
                if( Channel )
                {
                    if( Channel.type === 'GUILD_TEXT' ){
                        var MutedID = '';
                        var ReportChID = '';
                        var Loop = 1;
                        await ServerRef.once('value',   function(snapshot) {
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
                        if(MutedID != ''){
                            ServerRef.update({
                                MutedID : MutedID,
                                ReportCHID : parseInt(Channel.id.slice(2,Channel.id.length))
                            });
                        }else{
                            ServerRef.update({
                                MutedID : '',
                                ReportCHID : parseInt(Channel.id.slice(2,Channel.id.length))
                            });
                        }
                        if(Embed === null){
                            Embed = new Discord.MessageEmbed()
                            .setTitle('Done')
                            .setDescription('Updated <#' + Channel.id + '>');
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
                }else{
                    Embed = new Discord.MessageEmbed()
                    .setTitle('Oops')
                    .setDescription('Make sure the channel exists');
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