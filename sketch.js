//---------------------------------------------------------//
//Universesafe
const Discord = require('discord.js');
const firebase = require('firebase');
const Client = new Discord.Client(
    {
        intents : [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
        ]
    }
);
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

//Message Command Folder Manager
Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}
//Slash Command Folder Manager
Client.slashcommands = new Discord.Collection();
const commandSlashFiles = fs.readdirSync('./slashcommands/').filter(file => file.endsWith('.js'));
for(const slashfile of commandSlashFiles)
{
    const slashcommand = require(`./slashcommands/${slashfile}`);
    Client.slashcommands.set(slashcommand.name, slashcommand);
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
                                        .setDescription( "```Hello, I am Universesafe!\n I am a moderation bot which will moderate your server!```\n\n**Features**\n\n```I censor toxic messages, simplify moderation actions, like clear messages, ban, kick, mute & unmute```\n\n**```Nexus```**\n[Vote Me](https://discordbotlist.com/bots/universesafe/upvote)\n[Vote Me 2.0](https://top.gg/bot/834415441358094416/vote)\n[Invite Me](https://discord.com/oauth2/authorize?client_id=834415441358094416&permissions=8&scope=bot%20applications.commands)\n[Support Server](https://discord.gg/xq8wMZuVPJ)" )
                                        .setThumbnail( 'https://cdn.discordapp.com/avatars/834415441358094416/0867183dc955b618e7754237dd30855c.png?size=128' )
                                        channel.send( {
                                            embeds : [
                                                Embed
                                            ]
                                        } );
}
);
Client.once( 'ready' , ()=>{
    console.log('UniverseSafe Updated');
    Client.user.setActivity('.help', { type: 'LISTENING' });

    //SLASH COMMANDS
    //Invaild ID will make global slash commands
    const guildID = 'GUILD_ID';
    const guild = Client.guilds.cache.get(guildID);
    let commands;

    if(guild){
        commands = guild.commands;
    }else{
        commands = Client.application?.commands;
    }

    //Slash Command Making
    const TYPE = Discord.Constants.ApplicationCommandOptionTypes;
    commands?.create({
        name : 'help',
        description : 'Shows help menu of UniverseSafe',
        options : [
            {
                name : 'command',
                description : 'A detailed info about a command',
                type : TYPE.STRING,
                required : false,
                choices : [
                    {
                        name : 'Ping',
                        value : 'ping',
                    },
                    {
                        name : 'Commands',
                        value : 'commands',
                    },
                    {
                        name : 'Polls',
                        value : 'polls',
                    },
                    {
                        name : 'Mute',
                        value : 'mute',
                    },
                    {
                        name : 'Unmute',
                        value : 'unmute',
                    },
                    {
                        name : 'Clear',
                        value : 'clear',
                    },
                    {
                        name : 'Ban',
                        value : 'ban',
                    },
                    {
                        name : 'Kick',
                        value : 'kick',
                    },
                    {
                        name : 'Report',
                        value : 'report',
                    },
                    {
                        name : 'Update',
                        value : 'update',
                    },
                ],
            }
        ],
    });
    commands?.create({
        name : 'clear',
        description : 'Used to clear messages in the channel',
        options : [
            {
                name : 'amount',
                description : 'Amount of Messages to Delete',
                type : TYPE.NUMBER,
                required : true,
            }
        ]
    });
    commands?.create({
        name : 'mute',
        description : 'Used to mute members',
        options : [
            {
                name : 'target',
                description : 'Target of the action',
                type : TYPE.USER,
                required : true,
            },
            {
                name : 'time',
                description : 'Duration of mute in miliseconds',
                type : TYPE.NUMBER,
                required : false,
            }
        ]
    });
    commands?.create({
        name : 'unmute',
        description : 'Used to unmute members',
        options : [
            {
                name : 'target',
                description : 'Target of the action',
                type : TYPE.USER,
                required : true,
            }
        ]
    });
    commands?.create({
        name : 'kick',
        description : 'Used to kick members',
        options : [
            {
                name : 'target',
                description : 'Target of the action',
                type : TYPE.USER,
                required : true,
            }
        ]
    });
    commands?.create({
        name : 'ban',
        description : 'Used to ban members',
        options : [
            {
                name : 'target',
                description : 'Target of the action',
                type : TYPE.USER,
                required : true,
            },
            {
                name : 'reason',
                description : 'Mention a reason',
                type : TYPE.STRING,
                required : false,
            }
        ]
    });
    commands?.create({
        name : 'update',
        description : 'Used to update data in the database',
        options : [
            {
                name : 'role',
                description : 'Which role should be the mute role',
                type : TYPE.ROLE,
                required : false,
            },
            {
                name : 'channel',
                description : 'Which channel should be the report log',
                type : TYPE.CHANNEL,
                required : false,
            }
        ]
    });
    commands?.create({
        name : 'report',
        description : 'Used to report members',
        options : [
            {
                name : 'target',
                description : 'Target of the action',
                type : TYPE.USER,
                required : true,
            },
            {
                name : 'reason',
                description : 'Reason for reporting',
                type : TYPE.STRING,
                required : false,
            }
        ]
    });

}
);

Client.on( 'interactionCreate' , async(interaction) => {
        if(!interaction.isCommand()) return;
        const { commandName , options } = interaction;
        if(commandName==='help'){
            Client.slashcommands.get( 'help' ).execute( interaction , options );
        }
        if(commandName==='clear'){
            Client.slashcommands.get( 'clear' ).execute( interaction , options );
        }
        if(commandName==='mute'){
            Client.slashcommands.get( 'mute' ).execute( interaction , options , database );
        }
        if(commandName==='unmute'){
            Client.slashcommands.get( 'unmute' ).execute( interaction , options , database );
        }
        if(commandName==='kick'){
            Client.slashcommands.get( 'kick' ).execute( interaction , options );
        }
        if(commandName==='ban'){
            Client.slashcommands.get( 'ban' ).execute( interaction , options );
        }
        if(commandName==='update'){
            Client.slashcommands.get( 'update' ).execute( interaction , options , database );
        }
        if(commandName==='report'){
            Client.slashcommands.get( 'report' ).execute( interaction , options , database , Client );
        }
}
);

Client.on( 'messageCreate' , message =>{

    require('./commands/censor').execute( message , database );

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