/*CMD
  command: /withdraw
  help: 
  need_reply: 
  auto_retry_time: 
  folder: withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let wallet = getUserWallet();
wallet = wallet || smartBot.curCommand.noWalletText;

smartBot.add({
  wallet: wallet
})
