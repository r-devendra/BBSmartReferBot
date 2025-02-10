/*CMD
  command: onAddBonusToReferrer
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(!options){ return }
if(!options.attractedUser){ return }

completeCoreTask("newRefReward");
smartBot.run({
  command: "onNewRefCompleted",
  options: {
    tgid: user.telegramid,
    referrerId: options.referrerId,
    referralId: options.referralId,
  }
})
