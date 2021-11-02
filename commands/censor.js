const Discord = require('discord.js');
const ms = require('ms');
const {google} = require('googleapis');
const config = require('../config.json');
module.exports =
{
    name : 'censor' ,
    description : 'These are the words which get censored' ,
    execute( message , DB )
    {
      if(!message.content) return;
      const API_KEY = config.GoogleAPIKey;
      const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';
        
      google.discoverAPI(DISCOVERY_URL)
        .then(client => {
          const analyzeRequest = {
            comment: {
              text: message.content,
            },
            requestedAttributes: {
              TOXICITY: {},
              THREAT: {},
              INSULT: {},
              PROFANITY: {}
            },
          };
      
          client.comments.analyze(
            {
              key: API_KEY,
              resource: analyzeRequest,
            },
            (err, response) => {
              if (err) throw err;
              var Info = JSON.stringify(response.data, null, 2);
              Info = JSON.parse(Info);
              var ToxicPercent = Math.round(Info.attributeScores.TOXICITY.spanScores[0].score.value*100);
	      var ProfanityPercent = Math.round(Info.attributeScores.PROFANITY.spanScores[0].score.value*100);
                  Mute(ToxicPercent, 90, 100, '10m', Info , 'Toxic');
                  Mute(ToxicPercent, 85, 90, '5m', Info, 'Toxic');
                  Mute(ProfanityPercent, 90, 100, '10m', Info, 'Explict');
                  Mute(ProfanityPercent, 85, 90, '5m', Info, 'Explict');

            });
        })
        .catch(err => {
          throw err;
        });
      async function Mute(PercentVariable, PercentMin, PercentMax, time, Info, type){
        if(PercentVariable >= PercentMin && PercentVariable < PercentMax){
          if(message.deletable){
              message.delete().catch(err => {});
              const ServerRef = DB.ref(message.guild.id)
              var MutedID = '';
              var ReportChID = '';
	      var Loop = 1
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
            if( MutedID === '' )
            {
                var mutedRole = message.guild.roles.cache.find( role => role.name.toLowerCase() === "muted" );
            }else{
                var mutedRole = message.guild.roles.cache.find( role => role.guild === message.guild && role.id.slice(2,role.id.length) === MutedID );
            }
            if(mutedRole){
              message.guild.members.cache.get(message.author.id).roles.add(mutedRole);
              setTimeout(
                function(){
                  message.guild.members.cache.get(message.author.id).roles.remove(mutedRole);
                } , ms(time)
              );
		var Embed = new Discord.MessageEmbed()
              .setTitle('Muted')
              .setDescription('Muted <@!' + message.author.id + '> for being '+ type.toLowerCase() +'\n' + type + ': `' + PercentVariable + '%`\nMute Duration: `' + time + '`');
              message.channel.send({
                embeds: [
                    Embed
                ]
              });
		var EmbedTarget = new Discord.MessageEmbed()
              .setTitle('Muted')
              .setDescription('You have been muted on **' + message.guild.name + '**\nToxicity: `' + Math.round(Info.attributeScores.TOXICITY.spanScores[0].score.value * 100) + '%`\nProfanity: `' + Math.round(Info.attributeScores.PROFANITY.spanScores[0].score.value * 100) + '%`\nThreatening: `' + Math.round(Info.attributeScores.THREAT.spanScores[0].score.value * 100) + '%`\nInsulting: `' + Math.round(Info.attributeScores.INSULT.spanScores[0].score.value * 100) + '%`');
              message.author.send({
                embeds : [
                  EmbedTarget
                ]
              });
            }
          }
      }
      }
    }
}
