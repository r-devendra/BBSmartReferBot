/*CMD
  command: /setup2
  help: 
  need_reply: 
  auto_retry_time: 
  folder: ⚙️ setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const langs = [
  {
    "name": "English",
    "code": "en",
    "flag": "🇺🇸"
  },
  {
    "name": "Français",
    "code": "fr",
    "flag": "🇫🇷"
  },
  {
    "name": "हिन्दी",
    "code": "hi",
    "flag": "🇮🇳"
  },
  {
    "name": "বাংলা",
    "code": "bn",
    "flag": "🇧🇩"
  }
];

let commandName;

for (let i in langs) {
  commandName = "lng-" + langs[i].code;
  debug("running: " + commandName);
  Bot.run({ command: commandName });
}

Bot.sendMessage("Bot is ready, you can launch it!")
