/*CMD
  command: /invite
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const referralLink = RefLib.getLink(bot.name, REF_LINK_PREFIX);

smartBot.add({
  referralLink: referralLink,
  refCount: RefLib.getRefCount()
})

smartCoreTasker.defineTask("newRefReward");
