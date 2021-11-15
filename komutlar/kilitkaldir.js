const Discord = require('discord.js');//Roa Code
 
exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Yetkin Yok!");//Roa Code

let channel =  message.channel;//Roa Code


let everyone = message.guild.roles.cache.find(a => a.name === '@everyone');//Roa Code
channel.updateOverwrite(everyone, { 'SEND_MESSAGES': null }, 'Kilidi Açan '+message.author.tag);
channel.send(new Discord.MessageEmbed()//Roa Code
.setColor('RANDOM')
.setTitle(":small_blue_diamond: Kanal Kilidi Açıldı"));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'kilitkaldir'
};

console.log