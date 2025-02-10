/*CMD
  command: setLng
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let newLang = params; // it is "en", "fr", "hi", "bn"

smartBot.setUserLang(newLang);
smartBot.add({ newLang: newLang });
smartBot.run({command:"/menu"})
