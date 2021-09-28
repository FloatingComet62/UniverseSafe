const Discord = require("discord.js");

module.exports = 
{
    name : 'poll' ,
    description : "Used to add reactions to messages for polls" ,
    async execute( message , args , CLIENT )
    {
        var perms = message.member.permissions.has( "ADD_REACTIONS" );
        if( perms )
        {
            if( args[0] != undefined )
            {
                if( args[1] != undefined )
                {
                    var Upvote = message.guild.emojis.cache.find( GuildEmoji => GuildEmoji.name.toLowerCase() === 'upvote' );
                    var Downvote = message.guild.emojis.cache.find( GuildEmoji => GuildEmoji.name.toLowerCase() === 'downvote' );
                    var EmbedFindError1 = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "Couldn't find the channel" );
                    var EmbedFindError2 = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( "Couldn't find the message" );
                    if( Upvote != undefined && Downvote != undefined )
                    {
                        var chID = args[0];
                        var msgID = args[1];
                        CLIENT.channels.fetch( chID ).then( async ch => 
                        {
                            await ch.messages.fetch( msgID ).then(msg => 
                            {
                                if( message.author === msg.author )
                                {
                                    msg.react( Upvote )
                                    .then( () => msg.react( Downvote ) );
                                    var Embed1 = new Discord.MessageEmbed()
                                    .setTitle( 'Done' )
                                    .setDescription( 'Reacted to the requested message' );
                                    message.channel.send( {
                                        embeds : [
                                            Embed1
                                        ]
                                    } );
                                }
                                else
                                {
                                    var Embed = new Discord.MessageEmbed()
                                    .setTitle( 'Oops' )
                                    .setDescription( 'The mentioned message should be by you.' );
                                    message.channel.send( {
                                        embeds : [
                                            Embed
                                        ]
                                    } );
                                }
                            }
                            )
                            .catch( () =>
                            message.channel.send( {
                                embeds : [
                                    EmbedFindError2
                                ]
                            } ))
                        })
                        .catch( () =>
                        message.channel.send( {
                            embeds : [
                                EmbedFindError1
                            ]
                        } ))
                    }
                    else
                    {
                        var Embed = new Discord.MessageEmbed()
                        .setTitle( 'Oops' )
                        .setDescription( "I couldn't find a emote named 'Upvote' or 'Downvote'.\nPlease Contact a staff for help" );
                        message.channel.send( {
                            embeds : [
                                Embed
                            ]
                        } );
                    }
                }
                else
                {
                    var Embed1 = new Discord.MessageEmbed()
                    .setTitle( 'Oops' )
                    .setDescription( 'Second argument is missing(Message ID)' );
                    message.channel.send( {
                        embeds : [
                            Embed1
                        ]
                    } );
                }
            }
            else
            {
                var Embed2 = new Discord.MessageEmbed()
                .setTitle( 'Oops' )
                .setDescription( 'First argument is missing(Channel ID)' );
                message.channel.send( {
                    embeds : [
                        Embed2
                    ]
                } );
            }
        }
        else
        {
            var Embed3 = new Discord.MessageEmbed()
            .setTitle( 'Oops' )
            .setDescription( "You don't have the permission to use this command" );
            message.channel.send( {
                embeds : [
                    Embed3
                ]
            } );
        }
    }
}