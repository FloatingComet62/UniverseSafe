//---------------------------------------------------------//
//Universesafe
const Discord = require('discord.js');
const ms = require('ms');
const Client = new Discord.Client();
const prefix = '.';
const fs = require('fs');

Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./universesafecommands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./universesafecommands/${file}`);
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
                                        .setDescription( "```Hello, I am Universesafe!\n I am a moderation bot which will moderate your server!```\n\n**Features**\n\n```I censor direct swear words, simplify moderation actions, like clear messages, ban, kick, mute & unmute```\n\n**```Nexus```**\nRemember, there are 2 spaces b/w each parameter\n[Vote Me](https://discordbotlist.com/bots/universesafe/upvote)\n[Invite Me](https://discord.com/oauth2/authorize?client_id=834415441358094416&permissions=8&scope=bot%20applications.commands)\n[Report a Bug](https://github.com/FloatingComet62/UniverseSafe/issues)" )
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

                                    require('./universesafecommands/censor').execute( message );

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
                                    if( command === 'reset' )
                                    {
                                        Client.commands.get( 'reset' ).execute( message , args );
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
                                    if( command === 'live' )
                                    {
                                        Client.commands.get( 'live' ).execute( message , args );
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
Client.on( 'voiceStateUpdate' , ( oldState , newState ) => {
    if( oldState.member.user.bot ) return;
    if( newState.channelID === '862351904176472084' )
    {
        oldState.member.send( "Type `Yes` to make a private VC.\nType `No` to cancel" );
        Client.on( 'message' , message => {
            if( message.channel.type === 'dm' )
            {
                if( message.author.bot ) return;
                if( message.content.toLowerCase( "yes" ) )
                {
                    if( newState.channelID === '862351904176472084' )
                    {
                        console.log( "Hoi" );
                        message.guild.channels.add( "PrivateVC" , {
                            type: "voice"
                            })
                    }
                }
            }
        } );
    }
} );
//------------------------------------------------------------------------------------------------//
//Combot

const Client2 = new Discord.Client();
const prefix2 = '';
Client2.commands = new Discord.Collection();
const commandFiles2 = fs.readdirSync('./combotcommands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles2)
{
    const command = require(`./combotcommands/${file}`);
    Client2.commands.set(command.name, command);
}
Client2.once( 'ready' , ()=>{
                            console.log('Combot Updated');
                            Client2.user.setActivity("EasWas.'s Beats", { type: 'LISTENING' });
                            });

//Basic Command Handler
Client2.on( 'message' , message =>
                                {                                
                                    //basic
                                    if(!message.content.startsWith(prefix2) || message.author.bot) return;

                                    const args = message.content.slice( prefix2.length ).split(/ + /);
                                    const command = args.shift().toLowerCase();

                                    //Add your commands here
                                    if( command === 'ping' )
                                    {
                                      Client2.commands.get( 'ping' ).execute( message , args );
                                    }
                                    if( command === 'reset' && message.author.id === '701059544574591006' )
                                    {
                                        message.delete();
                                        Math.random(round( 1 ,2 ));
                                    }
                                    if( command === 'hi @here' )
                                    {
                                        Client2.commands.get( 'hi' ).execute( message , args );
                                    }
                                    if( command === 'hi! @here' )
                                    {
                                        Client2.commands.get( 'hi2' ).execute( message , args );
                                    }
		                            if( command === 'party' )
		                            {
		                                message.channel.send('https://tenor.com/syxN.gif');
		                            }
		                            if( command === 'party!' )
		                            {
		                                message.channel.send('https://tenor.com/syxN.gif');
                                    }
                                    if( command === 'maro mujhe maro' )
                                    {
                                        message.channel.send('https://tenor.com/view/obhai-maro-mujhe-maro-obhai-maro-obhai-maro-mujhe-maro-maro-gif-16958199');
                                    }
                                    if( command === 'my eyes' )
                                    {
                                        message.channel.send('https://tenor.com/EtJK.gif');
                                    }
                                    if( command === 'f' )
                                    {
                                        message.channel.send('F');
                                    }
                                    if( command === 'all izz well' )
                                    {
                                        message.channel.send('https://tenor.com/view/all-is-well-all-izz-well-3idiots-three-idiots-3idiotas-gif-16016223');
                                    }
                                    if( command === 'kick' )
                                    {
                                        Client2.commands.get( 'kick' ).execute( message , args );
                                    }
                                    if( command === 'ban' )
                                    {
                                        Client2.commands.get( 'ban' ).execute( message , args );
                                    }
                                    if( command === 'clear' )
                                    {
                                        Client2.commands.get( 'clear' ).execute( message , args );
                                    }
                                    /*if( command === '#poll' )
                                    {
                                        message.Client2.channels.fetch( '801474055630487562' ).then(channel => 
                                            {
                                                channel.messages.fetch( '837562995441270894' ).then(message => 
                                                {
                                                    message.react( '🌕' );
                                                    message.react( '🌖' );
                                                    message.react( '🌗' );
                                                    message.react( '🌘' );
                                                    message.react( '🌑' );
                                                })
                                            })
                                    }*/
                                    if( command === 'pls comet' )
                                    {
                                        message.channel.send('https://media.discordapp.net/attachments/789711510850502709/802558558495309904/CometGIF.gif');
                                    }
                                    if( command === 'pls flame' )
                                    {
                                        message.channel.send('https://media.discordapp.net/attachments/762652948106051605/804559764184498196/4dcad98ff2d9aba671b56957ab5d70a2.gif?width=216&height=311');
                                    }
                                    if( command === 'pwari ho rahi hai' )
                                    {
                                        message.channel.send('https://tenor.com/view/pawry-pawry-ho-rahi-hai-danannen-gif-20401939');
                                    }
                                    if( command === '/stab' )
                                    {
                                        Client2.commands.get( 'stab' ).execute( message , args );
                                    }
                                    if( message.guild.id === '755803276452167742' )
                                    {
                                        if( message.attachments.size > 0 )
                                        {
                                            message.react('<:UpVote:785439967371460638>');
                                            message.react('<:DownVote:785439950970552332>');
                                        }
                                        if( message.content.includes( 'https://' ) )
                                        {
                                            if( message.content.includes( 'https://tenor.com' ) ) return;
                                            if( message.content.includes( 'https://cdn.discordapp.com' ) ) return;
                                            message.react('<:UpVote:785439967371460638>');
                                            message.react('<:DownVote:785439950970552332>');
                                        }
                                    }
                                } );

//----------------------------------------------------------------------------//
//login
Client.login(require('./config.json').universesafe_token);
Client2.login(require('./config.json').combot_token);