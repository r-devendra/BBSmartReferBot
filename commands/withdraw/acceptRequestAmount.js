/*CMD
  command: acceptRequestAmount
  help: 
  need_reply: true
  auto_retry_time: 
  folder: withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(smartBot.isAlias(message)){
  return
}
let refCount = RefLib.getRefCount();
let minPay = parseInt(getFieldValue("MIN_PAYOUT"));
let maxPay = parseInt(getFieldValue("MAX_PAYOUT"));
let chatId = getFieldValue("PAYMENT_CHANNEL") || getFieldValue("ADMIN_ID");
;

if (!getFieldValue("WITHDRAW_ENABLED")) {
  smartBot.run({ command: "withdrawDisabled" });
  return;
}

let dialog = new SmartAmountDialog({
  smartBot: smartBot,
  max: maxPay || getBalance(),
  min: minPay,
  curValue: getBalance(),
  onlyInteger: false,
  skipZero: false,

  dialogErrors: smartBot.curCommand.dialogErrors
})

const accepted = dialog.accept(message);

if(!accepted){
  Bot.sendMessage(dialog.errMsg);

  Bot.run({ command: "acceptRequestAmount" });

  return
}

smartBot.add({ amount: dialog.amount })

setUserBalance( smartTasker.balance - dialog.amount );
addTotalPayouts(dialog.amount);

smartBot.run({
  command: "channel:postSuccess",
  options: {
    chat_id: chatId,
    amount: dialog.amount,
    tgid: user.telegramid,
    username: user.username || user.first_name || user.last_name,
    refCount: refCount,
    wallet: getUserWallet(),
    botName: bot.name
  }
});

smartBot.run({
  command: "withdrawInitiated",
  options: { 
    chat_id: chatId,
    amount: dialog.amount,
    wallet: getUserWallet(),
  }
});
