/*CMD
  command: /menu
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const justCompleted = completeWelcomeTask();
const attractedBy = RefLib.getAttractedBy();

let refUser = RefLib.getAttractedBy()

function addBonusToRefOwner(){
  smartBot.run({
    command: "addBonusToReferrer",
    user_id: refUser.id,
    options: {
      attractedUser: user,
      referrerId: refUser.telegramid,
      referralId: user.telegramid,
      userLink: "tg://user?id="+refUser.telegramid
    }
  })

  smartBot.run({
    command: "onInvitedBy",
    options: {
      referrerId: user.telegramid
    }
  });
}

if (justCompleted) {
  addBonusToRefOwner();
  smartBot.run({command: 'setLanguage'})
}
