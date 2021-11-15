const Discord = require('discord.js');//Roa Code
const client = new Discord.Client();//Roa Code
const CSGO = require("csgo-api")//Roa Code
const srv = new CSGO.Server('185.193.165.21', '27015')//Roa Code
	let query = require("source-server-query")//Roa Code

exports.run = async function(client, message, args) {
	const players = await srv.getPlayerCount();//Roa Code
	const serverName = await srv.getServerName();//Roa Code
	const map = await srv.getMap();//Roa Code
	const platform = await srv.getPlatform();//Roa Code
	const maxplayers = await srv.getMaxPlayers();//Roa Code
	const game = await srv.getGame();//Roa Code
	const vac = await srv.getVacEnabled();//Roa Code
  
  const embed = new Discord.MessageEmbed()//Roa Code
  .setAuthor(serverName, client.user.avatarURL())//Roa Code
  .setThumbnail(client.user.avatarURL())//Roa Code
  .setColor('PURPLE')//Roa Code
  .addField('🗺️ Harita',map, true)//Roa Code
  .addField('👥 Oyuncu Sayısı',players+"/"+maxplayers, true)//Roa Code
  .addField('📍 IP - Tıkla Bağlan',"185.193.165.77 - steam://connect/185.193.165.77:27015")//Roa Code
  	var data = await query.players("185.193.165.77", 27015, 1000),//Roa Code
		    text = ``,
		    decode = require("utf8");//Roa Code
  for (let i of data) {
		text += !i.name ? `BOT\n` : decode.decode(i.name)+ "\n";//Roa Code
	}
  embed.addField('✅ Oyuncular', "```\n"+text+"```")//Roa Code
  message.channel.send(embed)
  .catch(e =>console.log(e))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['durum'],
  permLevel: 0
};

exports.help = {
  name: 'durum',
  description: 'CS:GO Sunucusunun durumunu gösterir.',
  usage: 'durum'
};

console.log