const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const ertum = require("../../../../../../Global/Settings/Setup.json");
const { green, red, erkek, kadin, star , ok } = require("../../../../../../Global/Settings/Emojis.json");
const regstats = require("../../../../../../Global/Schemas/registerStats");
const kanal = require("../../../../../../Global/Settings/AyarName");

module.exports = {
    name: "kayitstat",
    description: "Kayıt verilerinizi gösterir.",
    category: "REGISTER",
    cooldown: 0,
    command: {
      enabled: true,
      aliases: ["kayıtstat"],
      usage: ".kayıtstat", 
    },
 
    onLoad: function (client) { },

    onCommand: async function (client, message, args, ertuembed) {

      let kanallar = kanal.KomutKullanımKanalİsim;
      if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.author;

    if(!ertum.ConfirmerRoles.some(ertuu => message.member.roles.cache.has(ertuu)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(red)
    return }

    const data = await regstats.findOne({ guildID: message.guild.id, userID: member.id });
    message.react(green)
    message.channel.send({ embeds: [ertuembed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
   ${star} Toplam \`${data ? data.top : 0}\` kayıdın mevcut. 
   ${erkek} Toplam \`${data ? data.erkek : 0}\` **erkek** kayıdın mevcut. 
   ${kadin} Toplam \`${data ? data.kız : 0}\` **kız** kayıdın mevcut.
  `)] });



     },

  };