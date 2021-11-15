const Discord = require('discord.js')//Roa Code
const ayarlar = require('../ayarlar.json')//Roa Code
let prefix = ayarlar.prefix//Roa Code

exports.run = async (client, message, args) => { 
     
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmalısın!`);
  if (!args[0] || isNaN(args[0])) {
    
  const temizle = new Discord.MessageEmbed() //Roa Code
  
  .setDescription(`Temizlenecek Mesaj Miktarını Belirtmelisin!\n\n Örnek Kullanım : ${prefix}**sil 10**`)
  .setColor("RANDOM")
  
  return message.channel.send(temizle)
  }//Roa Code
  
  message.delete();
  
  let sayi = Number(args[0]);
  let silinen = 0;
  //Roa Code
  for (var i = 0; i < (Math.floor(sayi/100)); i++) {
    
  message.channel.bulkDelete(100).then(r => silinen+=r.size);//Roa Code
    
  sayi = sayi-100; 
  };
  //Roa Code
  if (sayi > 0)  message.channel.bulkDelete(sayi).then(r => silinen+=r.size);
  //Roa Code
  const sil = new Discord.MessageEmbed()  //Roa Code
  
  .setDescription(`**\`\`${args[0]}\`\` Adet Mesaj Silindi.**`)
  .setColor("RANDOM")
  
  return message.channel.send(sil)
  }

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['temizle','clear','purge','delete'],
    permLevel: 0,
}

exports.help = {
    name: 'sil', 
    description: '',
    usage: 'sil'
}