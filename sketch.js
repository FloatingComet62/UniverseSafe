//---------------------------------------------------------//
//Universesafe
const Discord = require('discord.js');
const firebase = require('firebase');
const Client = new Discord.Client();
const prefix = '.';
const config = require('./config.json');
const fs = require('fs');
var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
                                        .setDescription( "```Hello, I am Universesafe!\n I am a moderation bot which will moderate your server!```\n\n**Features**\n\n```I censor direct swear words, simplify moderation actions, like clear messages, ban, kick, mute & unmute```\n\n**```Nexus```**\n[Vote Me](https://discordbotlist.com/bots/universesafe/upvote)\n[Vote Me 2.0](https://top.gg/bot/834415441358094416/vote)\n[Invite Me](https://discord.com/oauth2/authorize?client_id=834415441358094416&permissions=8&scope=bot%20applications.commands)\n[Report a Bug](https://github.com/FloatingComet62/UniverseSafe/issues)" )
                                        .setThumbnail( 'https://cdn.discordapp.com/avatars/834415441358094416/0867183dc955b618e7754237dd30855c.png?size=128' )
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

                                    const args = message.content.slice(prefix.length).split(/ +/);
                                    const command = args.shift().toLowerCase();
  
                                    if( command === 'ping' )
                                    {
                                        Client.commands.get( 'ping' ).execute( message , args );
                                    }
                                    if( command === 'commands' )
                                    {
                                        Client.commands.get( 'commands' ).execute( message , args );
                                    }
                                    if( command === 'help' )
                                    {
                                        Client.commands.get( 'help' ).execute( message , args );
                                    }
                                    if( message.channel.type != 'dm')
                                    {
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
                                            Client.commands.get( 'mute' ).execute( message , args , database );
                                        }
                                        if( command === 'unmute' )
                                        {
                                            Client.commands.get( 'unmute' ).execute( message , args , database );
                                        }
                                        if( command === 'report' )
                                        {
                                            Client.commands.get( 'report' ).execute( message , args , Client , database );
                                        }
                                        if( command === 'poll' )
                                        {
                                            Client.commands.get( 'poll' ).execute( message , args , Client );
                                        }
                                        if( command === 'update' )
                                        {
                                            Client.commands.get( 'update' ).execute( message , args , database );
                                        }
                                    }
                                }
        );
//----------------------------------------------------------------------------//
//login
Client.login(config.token);
