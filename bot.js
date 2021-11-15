const Discord = require("discord.js");//Roa Code
const client = new Discord.Client();//Roa Code
const ayarlar = require("./ayarlar.json");//Roa Code
const chalk = require("chalk");//Roa Code
const fs = require("fs");//Roa Code
const moment = require("moment");//Roa Code
const Jimp = require("jimp");//Roa Code
const db = require("quick.db");//Roa Code
var prefix = ayarlar.prefix;//Roa Code

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

client.on("guildMemberAdd", async (member) => {

    const sunucu = client.guilds.cache.get("750718256716972033")//sunucu ıd
    const hoşgeldin_kanalı = client.channels.cache.get("750733115957313697")//mesajın gideceği kanal
    if (member.user.bot) return; // bota mesaj atmama kısmı
    await member.setNickname(`SonTürk Kayıtsız`)// oto isim kısmı
    const roaembed = new Discord.MessageEmbed()
        .setTitle(`<a:giris:899297926793281557> | SonTürk'a Hoşgeldin`)
        .setDescription(`
        
**<a:evet:774650454579609620> | ${member} Seninle Birlikte ${sunucu.memberCount} Kişiyiz!**

**<a:evet:774650454579609620> | Kayıt olmak için İsim | Nick [Yas] Yazmalısın.**
`)
    .setColor("PURPLE")
.setFooter("SonTürk Jailbreak","")
.setImage('')//görsel kısmı gif vesayle koyabilirsiniz sıkıntı çıkmıyor

    hoşgeldin_kanalı.send(roaembed)
});


client.on('guildMemberAdd', member => {
  member.roles.add("800994011669725204")
});


////////////////////////////////////////////

client.on("message", async(message) => {
if(message.content === "!dc") {
message.channel.send('https://discord.gg/AYBzmEQRt7')
}
})
//
client.on("message", async(message) => {
if(message.content === "!ip") {
message.channel.send('IP adresimiz; 185.193.165.21 \nTıkla Bağlan; steam://connect/185.193.165.21:27015');
}
})
//
client.on("message", async(message) => {
if(message.content === "!steam") {
message.channel.send('__Steam Topluluğumuz__\nhttps://steamcommunity.com/groups/istiklalJBB')
}
})
//
client.on("message", async(message) => {
  if(message.content === "!youtube") {
  message.channel.send('__Steam Topluluğumuz__\nhttps://www.youtube.com/channel/UC-hHfjJjeTKYrj5BWL9vdOw')
  }
  })
////////////////////////////////////////////



require("moment-timezone") 
moment.locale('tr')
client.on('ready', () => {
   setInterval(() => {
  var days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];
  const d = new Date()
  if(db.get('gün_'+d.getMonth()+"/"+d.getDate())) return;
  if(days[d.getDay()] === "Cumartesi")  {
    var saat = moment().tz('Europe/Istanbul').format('LT')
    var gerekensaat = "17:50"
    if(saat === gerekensaat) {
      db.set('gün_'+d.getMonth()+"/"+d.getDate(), true)
      client.channels.cache.get('800994045806772245').send('**:loudspeaker: | Toplantı Başlıyooooor !\n<a:mavi:780088027833303091> | Tüm Yetkililerin Katılması Zorunludur.\n<a:onayy:832219198741676032> | Sunucu İçerisindeki Şikayet ve Önerilerinizi Gelip Belirtebilirsiniz.\n@everyone**')
    }
  }
   }, 1000)
})


////////////////////////////////////////////


client.on("message", async message => {
  if(!message.guild) return
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let xps = await db.fetch(`verilecekxp_${gid}`);
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );

client.channels.cache.get("899303974170136596").send(`<@${message.author.id}> Seviye atladı **${lvl || "0"}**`)

      
    }

  }
  
});


////////////////////////////////////////////


////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on("ready", () => {
  client.channels.cache.get("899304131922104330").join();
});

client.login(ayarlar.token)
console.log