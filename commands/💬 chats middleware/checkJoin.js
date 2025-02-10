/*CMD
  command: checkJoin
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💬 chats middleware
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(!isPrivateChat()){
  return
}
Libs.MembershipChecker.check()
