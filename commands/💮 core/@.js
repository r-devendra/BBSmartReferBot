/*CMD
  command: @
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 💮 core
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const SETUP_FOLDERS = [ "⚙️ setup", "🌐 langs", "💮 core" ]
const ALWAYS_AVAIBLE_FOLDERS = [ "⚙️ setup", "🌐 langs", "💮 core", "💬 chats middleware" ]

function getFieldValue(field_name){
  let value = AdminPanel.getFieldValue({
    panel_name: "BotSettings",
    field_name
  });
  return value ?? null;
}
function debug(message) {
    //Bot.inspect(message); // Debugging tool, uncomment to check the debug steps
}

const currency = getFieldValue("CURRENCY") || "BB POINT";
const refReward = getFieldValue("REWARD_PER_REFER") || 2;
const dailyReward = getFieldValue("DAILY_REWARD") || 1;
const welcomeReward = getFieldValue("WELCOME_REWARD") || 0;
const REF_LINK_PREFIX = "BCFArmy";

function getBalance(){
  if(!user) return 0;

  let balance = User.getProp("balance") || 0;
  return parseFloat(balance.toFixed(2));
}

function getTotalUsers(){
  return Bot.getProp("total_users") || 0;
}
function getTotalPayouts(){
  return Bot.getProp("total_payouts") || 0;
}
function incTotalUsers(){
  Bot.setProp("total_users", parseInt(getTotalUsers()) + 1, "integer");
  return getTotalUsers();
}
function addTotalPayouts(amount) {
  if (isNaN(amount) || amount <= 0) {
    return false;
  }
  let currentPayouts = parseFloat(getTotalPayouts());
  let newPayouts = currentPayouts + parseFloat(amount);
  
  Bot.setProp("total_payouts", newPayouts, "float");  
  return getTotalPayouts();
}

function getUserWallet(){
  return User.getProp("wallet");
}
function setUserWallet(wallet){
  // you can implement wallet address verification logic
  return User.setProperty("wallet", wallet);
}

function isAdmin(){
  const admin_id = getFieldValue("ADMIN_ID");
  if(!user){ return false }

  if(user.telegramid == ADMIN_TG_ID){ return true }
  return false;
}
debug("step 1: setup smartBot options")
let smartBotOptions = {
  debug: false, // set true for debug mode
  params: {
    balance: getBalance(),
  },
  skip_cmd_folders: SETUP_FOLDERS
};


if(command?.folder == "💬 chats middleware"){
debug("step 2: chats middleware")
  const allChannels = Libs.MembershipChecker.getChats();
  const allChannelsCount = allChannels.split(",").filter(Boolean).length;

  const needToJoinChannels = Libs.MembershipChecker.getNotJoinedChats();
  const needToJoinCount = needToJoinChannels.split(",").filter(Boolean).length;

  var newParams = {
    // MCL / Joining params
    // list channels
    "Joining:allChannels": allChannels,
    // just count of channels
    "Joining:channelsCount": allChannelsCount,
    // not joined channels
    "Joining:needToJoinChannels": needToJoinChannels,
    // count of not joined channels
    "Joining:needToJoinCount": needToJoinCount,
    // MCL can have error here
    "Joining:error": options?.error
  }
  smartBotOptions.params = { ...smartBotOptions.params, ...newParams };
}
debug(command)
if(command?.folder != "⚙️ setup"){
debug("step 3: excluded setup execution")
  var newParams = {
    currency,
    wallet: getUserWallet(),
    totalPayouts: getTotalPayouts(),
    totalUsers: getTotalUsers(),
    refReward,
    dailyReward,
    welcomeReward
  }  
  smartBotOptions.params = { ...smartBotOptions.params, ...newParams };
}
let smartBot = new SmartBot(smartBotOptions);

function isPrivateChat(){
  return chat?.chat_type == "private"
}

if(isPrivateChat() && !SETUP_FOLDERS.includes(command?.folder)){
  debug("step 4: handle mcl except in setup folders ")
  Libs.MembershipChecker.handle();
}
function checkAccess(){
  const curCmdFolder = command?.folder;
  const alwaysAvaibleForUser = ALWAYS_AVAIBLE_FOLDERS.includes(curCmdFolder);
  if(alwaysAvaibleForUser){ return true }

  if(!isPrivateChat()){
    // group, supergroup or channel - don't check access
    return true;
  }

  if(Libs.MembershipChecker.isMember()){
    return true;
  }

  Bot.runCommand("onNeedAllJoining");
  return false;
}
debug("step 5: checking access")
if(user && command?.folder != "⚙️ setup" && !checkAccess()){
debug("step 6: restricting for no access")
  // stop bot execution
  return
}


let CORE_TASKS = [];
let DAILY_TASK = [];
if(!SETUP_FOLDERS.includes(command?.folder)){
  CORE_TASKS = [
    // on joining to all channels
    {
      id: "newRefReward",
      title: smartBot.langData.titles.coreTasks.newRefReward,
      amount: parseFloat(refReward),
      // can be rewarded several times
      // because user can invite several friends
      manyTimes: true
    }
  ];
  DAILY_TASK = [
    {
      id: "welcomeReward",
      title: smartBot.langData.titles.coreTasks.welcomeReward,
      amount: parseFloat(welcomeReward),
    },
    {
      id: "DailyReward",
      title: smartBot.langData.titles.dailyRewardTask,
      amount : parseFloat(dailyReward),
      manyTimes: true
    }
  ];
}

const smartCoreTasker = new SmartTasker({
  name: "Core",
  tasks: CORE_TASKS,
  balance: getBalance(),
  smartBot: smartBot
});

 
const smartTasker = new SmartTasker({
  name: "Daily Reward",
  tasks: DAILY_TASK,
  balance: getBalance(),
  smartBot: smartBot
});


function setUserBalance(amount){
  User.setProperty("balance", amount, "float");
}

function rewardUser(opts){
  const tasker = opts.tasker;
  const taskDef = tasker.curTask;
  setUserBalance(tasker.balance)

  smartBot.run({
    command: opts.justRewardedCmd,
    options: {
      amount: taskDef.amount,
      title: taskDef.title
    }
  })
}

function completeTaskerTask(opts){
  const completedExecution = opts.tasker.completeExecution(opts.taskID);
  const taskDef = opts.tasker.curTask;

  if(completedExecution){
    rewardUser(opts)
    return true;
  }

  // we don't show already rewarded message if it is not needed
  if(!opts.showAlreadyRewarded){ return }

  // already rewarded
  smartBot.run({
    command: opts.alreadyRewardedCmd,
    options: { title: taskDef.title }
  });
}

// complete Core Tasks like /start, joining and etc
function completeCoreTask(taskID){
  completeTaskerTask({
    tasker: smartCoreTasker,
    taskID: taskID,
    justRewardedCmd: "justRewardedForCoreTask",
    showAlreadyRewarded: false,
    alreadyRewardedCmd: "alreadyRewardedForCoreTask",
  });
}

function completeDailyTask(taskID = "DailyReward"){ 
  completeTaskerTask({
    tasker: smartTasker,
    taskID: taskID,
    justRewardedCmd: "justRewardedDaily",
    showAlreadyRewarded: false,
    alreadyRewardedCmd: "alreadyRewardedDaily"
  });
}
function completeWelcomeTask(taskID = "welcomeReward"){
  if(parseFloat(welcomeReward) > 0){
  completeTaskerTask({
    tasker: smartTasker,
    taskID: taskID,
    justRewardedCmd: "welcomeToBot",
    showAlreadyRewarded: false,
    alreadyRewardedCmd: ""
  });
  }
}

debug("step 7: final executed")


if(chat && isPrivateChat() && chat.just_created){
  incTotalUsers();
}
