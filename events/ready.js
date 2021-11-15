const Discord = require('discord.js');//Spy Code
const moment = require('moment');//Spy Code
const chalk = require('chalk');//Spy Code
const { prefix } = require('../ayarlar.json')//Spy Code
const CSGO = require("csgo-api")//Spy Code
const srv = new CSGO.Server('185.193.165.21', '27015')//Spy Code
module.exports = client => {
	const map = srv.getMap();//Spy Code
    
          setInterval(()=>{
            srv.getPlayerCount().then(oyuncu => { srv.getMap().then(map => { client.user.setActivity(`👥 ${oyuncu}/22 Kişi | 🗺️ ${map} `) }) })
            },2000)//Spy Code
  
  setInterval(function() {

}, 2 * 30000);//Spy Code
  
  client.user.setStatus("dnd"); //dnd, idle, online, offline
  
}

console.log