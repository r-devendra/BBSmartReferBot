/*CMD
  command: acceptWallet
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 🏠 menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(smartBot.isAlias(message)){
  // user can pass "Cancel" or run another command
  return
}

setUserWallet(message);
smartBot.run({
  command: "walletAccepted",
  options: { wallet: message }
});
