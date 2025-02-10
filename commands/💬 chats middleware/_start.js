/*CMD
  command: /start
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💬 chats middleware
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

function onAttracted(byUser){
  smartBot.run({
    command: "onNewRefAttracted",
    options: {
      referrerId: byUser.telegramid,
      referralId: user.telegramid,
      referralUsername: "@" + user.username || user.first_name || user.last_name
    }
  });
}


RefLib.track({
  onAttracted: onAttracted,
  linkPrefix: REF_LINK_PREFIX,
});

smartBot.add({username: user ? "@"+user.username : null})

