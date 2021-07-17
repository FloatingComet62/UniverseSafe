//---------------------------------------------------------//
const Discord = require('discord.js');
const Client = new Discord.Client();
const prefix = '.';
const fs = require('fs');

Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}
Client.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
                                        var Embed = new Discord.MessageEmbed()
                                        .setTitle( "Universesafe | Thanks for inviting" )
                                        .setDescription( "```Hello, I am Universesafe!\n I am a moderation bot which will moderate your server!```\n\n**Features**\n\n```I censor direct swear words, simplify moderation actions, like clear messages, ban, kick, mute & unmute```" )
                                        .setThumbnail( 'https://cdn.discordapp.com/avatars/834415441358094416/0867183dc955b618e7754237dd30855c.png?size=128' );
                                        channel.send( Embed );
}
);
Client.once( 'ready' , async()=>{
                            console.log('UniverseSafe Updated');
                            Client.user.setActivity('.help', { type: 'LISTENING' });
                            await Client.api.applications(Client.user.id)
                            });
Client.on( 'message' , message =>
                                {

                                    require('./commands/censor').execute( message );

                                    if(!message.content.startsWith(prefix) || message.author.bot) return;

                                    const args = message.content.slice(prefix.length).split(/ + /);
                                    const command = args.shift().toLowerCase();


                                    if( command === 'ping' )
                                    {
                                        Client.commands.get( 'ping' ).execute( message , args );
                                    }
                                    if( command === 'kick' )
                                    {
                                        Client.commands.get( 'kick' ).execute( message , args );
                                    }
                                    if( command === 'ban' )
                                    {
                                        Client.commands.get( 'ban' ).execute( message , args );
                                    }
                                    if( command === 'clear' )
                                    {
                                        Client.commands.get( 'clear' ).execute( message , args );
                                    }
                                    if( command === 'mute' )
                                    {
                                        Client.commands.get( 'mute' ).execute( message , args );
                                    }
                                    if( command === 'unmute' )
                                    {
                                        Client.commands.get( 'unmute' ).execute( message , args );
                                    }
                                    if( command === 'commands' )
                                    {
                                        Client.commands.get( 'commands' ).execute( message , args );
                                    }
                                    if( command === 'report' )
                                    {
                                        Client.commands.get( 'report' ).execute( message , args , Client );
                                    }
                                    if( command === 'poll' )
                                    {
                                        Client.commands.get( 'poll' ).execute( message , args , Client );
                                    }
                                    if( command === 'help' )
                                    {
                                        Client.commands.get( 'help' ).execute( message , args );
                                    }
                                }
        );
//----------------------------------------------------------------------------//
//login
Client.login(require('./config.json').token);