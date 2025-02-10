/*CMD
  command: /clear
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/


Bot.sendMessage(
  "⚠️ Danger: this command clear all data from the bot. Use it for development only!" +
  "\n\n*Delete it or uncomment `return` in /clear *"
);

// you can test RefSystem again with this command
RefLib.clearRef();

// clear all completed tasks
// after this we can test again
// smartTasker.clearUserProgress();

// reset Core Tasker
smartCoreTasker.clearUserProgress();
smartTasker.clearUserProgress();

setUserBalance(0);

Bot.sendMessage(
  "🐛 *All data cleared:*" +
  "\n- RefSystem" +
  "\n- Core Tasker" +
  "\n- Tasker" +
  "\n- User Balance - 0"
);

Bot.sendMessage("You can run /start now or use any RefLink for testing RefSystem")
