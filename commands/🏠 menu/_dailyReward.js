/*CMD
  command: /dailyReward
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🏠 menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

function canRun() {
  var last_run_at = User.getProperty("last_run_at");
  
  if (!last_run_at) {
    return true;
  }

  var minutes = (Date.now() - last_run_at) / 1000 / 60; 
  var minutes_in_day = 24 * 60;

  if (minutes < minutes_in_day) {
    var remaining_minutes = Math.floor(minutes_in_day - minutes);
    var remaining_hours = Math.floor(remaining_minutes / 60);
    remaining_minutes -= remaining_hours * 60;
    var remaining_seconds = Math.floor((minutes_in_day - minutes - remaining_hours * 60 - remaining_minutes) * 60);
        
    smartBot.run({
      command: "alreadyRewardedDaily",
      options: {
        hours: remaining_hours,
        minutes: remaining_minutes,
        seconds: remaining_seconds
      }
    });
    return false;
  }

  return true;
}

if (canRun()) {
  User.setProperty("last_run_at", Date.now(), "integer");
  completeDailyTask();
}

