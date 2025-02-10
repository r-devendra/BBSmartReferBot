/*CMD
  command: lng-en
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🌐 langs
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const currentLang = "🇺🇸 English";

const LANG = {
  "commands": {
    "/start": {
      "text": "Welcome, {username}! Ready to start your journey? \nYou can earn {currency} for referring bot to your friends." +
      "\n\n<b>⛔️ You Must Join All Our Channels to proceed</b>\n {Joining:allChannels}\n✅ <b>After Joining, Click on 🟢 Joined</b>",
      "inline_buttons": "#/keyboard/joinInlineKeyboard",
      "parse_mode": "HTML"
    },    
    "!": {
      "text": "😭 Sorry, we had an error. \n\n Please try again later."
    },

    // JOINING section
    "checkJoin": {
      "alert_top": "Checking join to channels: {Joining:needToJoinChannels}..."
    },
    "/onNeedJoining": {
      "text": "<b>⛔️ You Must Join All Our Channels to proceed</b>\n {Joining:allChannels}\n✅ <b>After Joining, Click on 🟢 Joined</b>",
      "inline_buttons": "#/keyboard/joinInlineKeyboard",
      "parse_mode": "HTML"
    },
    "/onAllJoining": {
      "text": "✅ Thanks for joining our channels!",
      "run": { "command": "/menu" }
    },
    "/onStillJoined": {
      "text": "You are still joined to all channels! Thank you!",
      "run": { "command": "/menu" }
    },
    "/onMCLError": {
      "text": "MCL Error occurred! Maybe bot doesn't have access for checking?\n\nError: {Joining:error}",
    },

    // -- new referred user
    "onNewRefAttracted": {
      "chat_id": "{referrerId}",
      "text": "<b>🔋 You Got a New Referral</b>: {referralId}\n<i>💡 Reward Only If Referral Solves the Captcha and Joins Our Channel</i>",
      "parse_mode": "HTML",
      "inline_buttons": "#/keyboard/referralProfile"
    },
    "onInvitedBy": {
      "text": "<b>🌟 You Were Invited by</b>: <a href='tg://user?id={referrerId}'>{referrerId}</a>",
      "parse_mode": "HTML"
    },
    "onNewRefCompleted": {
      "chat_id": "{referrerId}",
      "text": "❤️<b> Your <a href='tg://user?id={referralId}'>Referral</a> Joined Our Channel</b>\n➕ {refReward} <b>{currency} Added</b>",
      "parse_mode": "HTML"
    },
    "welcomeToBot": {
      "text": "❤️<b> Welcome, you've received</b>\n➕ {welcomeReward} <b>{currency} as Welcome Reward</b>",
      "parse_mode": "HTML"
    },

    // -- menu commands
    "/menu": {
      "alias": "Back 🔙",
      "text": "🏡 Welcome To Main Menu",
      "keyboard": "#/keyboard/mainMenu"
    },
    "/balance": {
      "text": "💰 Your current balance is {balance} {currency}.",
      "keyboard": "#/keyboard/mainMenu"
    },
    "/invite": {
      "alias": "👫 Invite",
      "text": "🙌🏻 Your invite link: {referralLink}\n🙌🏻 You Referred: {refCount} user(s)\nEarn {refReward} {currency} for each successful invite.",
      "keyboard": "#/keyboard/mainMenu"
    },
    "/bonus": {
      "alias": "🎁 Bonus",
      "run": { "command": "/dailyReward" }
    },
    "justRewardedDaily": {
      "text": "🎉 Congratulations! You've claimed your daily bonus of {dailyReward} {currency}.",
      "keyboard": "#/keyboard/mainMenu"
    },
    "alreadyRewardedDaily": {
      "text": "⏳ You can claim your daily bonus again in {hours} hours, {minutes} minutes and {seconds} seconds.",
      "keyboard": "#/keyboard/mainMenu"
    },

    // -- bonus end
    // -- wallet start
    "/wallet": {
      "alias": "🗂 Wallet",
      "text": "Your currently set wallet for {currency} is {wallet}.\nIt will be used for future withdrawals.",
      "keyboard": "🗂 Set my wallet,Back 🔙"
    },

    "noWallet": {
      "text": "❌ You don't have a wallet yet. \n\n *Please set it up first.*",
      "keyboard": "🗂 Set my wallet,Back 🔙"
    },

    "/walletRequest": {
      "alias": "🗂 Set my wallet",
      "text": "Please enter your wallet address:",
      "run": { "command": "acceptWallet" },
      "keyboard": "Cancel ❌"
    },

    "walletAccepted": {
      "text": "✅ *Wallet accepted!* \n\nYour wallet: `{wallet}`",
      "run": { "command": "/menu" }
    },

    // -- wallet end
    // -- withdraw start
    "/withdraw": {
      "alias": "📤 Withdraw",
      "text": "📤 Withdraw\n\n💰 Your wallet: `{wallet}` \n\nBalance: {balance} {currency}",
      "noWalletText": "n/a",
      "keyboard": "💸 Withdraw Request,Back 🔙"
    },
    "/request": {
      "alias": "💸 Withdraw Request",
      "text": "📤 Enter the amount of INR you'd like to withdraw (minimum {minPayout} {currency}" + ("{maxPayout}" ? `, & maximum {maxPayout} {currency}` : "") + ").",
      "keyboard": "❌ Cancel"
    },

    "withdrawInitiated": {
      "text": "<b>✅ *Withdraw Requested*</b>\n\n" +
      "<b>Amount:</b> {amount} {currency}\n" +
      "<b>Wallet:</b> {wallet}\n\n" +
      "<i>⏳ Processing time: 1-12 hours. Fake referrals will result in a ban!</i>\n\n",
      "parse_mode": "HTML",
      "run": { "command": "/menu" }
    },

    "channel:postSuccess": {
      "chat_id": "{chat_id}",
      "text": "<b>🔋 New Withdrawal Requested 🏦</b>\n\n" +
      "<b>▪️ Status:</b> <i>pending</i>\n" +
      "<b>▪️ User:</b> {username}\n" +
      "<b>▪️ User ID:</b> {tgid}\n" +
      "<b>▪️ Withdraw Amount:</b> {amount} {currency}\n" +
      "<b>▪️ User Referrals:</b> {refCount}\n\n" +
      "<b>💳 Wallet Address:</b> {wallet}\n\n" +
      "<b>👮🏻‍♂️ Bot:</b> @{botName}\n\n" +
      "<b>⚠️ Important:</b> Fake referrals will result in a ban!\n\n",
      "parse_mode": "HTML",
      "inline_buttons": [[{ "text": "User", "url": "tg://user?id={tgid}" }]]
    },

    "withdrawDisabled": {
      "text": "⛔️ Withdrawals are disabled. Please try again later.",
      "keyboard": "#/keyboard/mainMenu"
    },

    "withdrawDeniedRefsRequired": {
      "text": "⛔️ You need {left_refs} more referrals to withdraw. You currently have {my_ref_count} of {min_ref_needed}.",
      "keyboard": "#/keyboard/mainMenu"
    },

    "withdrawDeniedInsufficientBalance": {
      "text": "⛔️ Insufficient balance. You need at least {required_balance} {currency} to withdraw, but your balance is {balance} {currency}.",
      "keyboard": "#/keyboard/mainMenu"
    },

    "withdrawDeniedLowBalance": {
      "text": "⛔️ Your balance is too low. Minimum required: {minPayout} {currency}, your balance: {balance} {currency}.",
      "keyboard": "#/keyboard/mainMenu"
    },

    "withdrawDeniedExceedsMaxPayout": {
      "text": "⛔️ Requested amount exceeds max payout of {maxPayout} {currency}. Your balance: {balance} {currency}.",
      "keyboard": "#/keyboard/mainMenu"
    },

    "acceptRequestAmount": {
      "dialogErrors": {
        "invalid": "⛔️ *Invalid amount.*\"{_amount}\" - not valid.\n\nPlease enter a valid amount for withdrawal (max: {_curValue}).",
        "zero": "Your balance is zero.\n\nPlease complete a task first to earn more.",
        "notEnough": "⛔️ *Invalid amount.*\n\"{_amount}\" - not enough balance.\n\nPlease enter a valid amount (max: {_curValue}).",
        "small": "⛔️ *Invalid amount.*\n\"{_amount}\" - too small.\n\nPlease enter a valid amount (min: {_min}, max: {_curValue}).",
        "big": "⛔️ *Invalid amount.*\n\"{_amount}\" - too big.\n\nPlease enter a valid amount (max: {_max}).",
        "notInteger": "⛔️ *Invalid amount.*\n\"{_amount}\" - not an integer."
      }
    },

    // -- withdraw end

    "/statistics": {
      "alias": "📊 Statistics",
      "text": "📊 Total Payouts: {totalPayouts} {currency}\n\nTotal Users: {totalUsers}\n\nCreator: @devendra",
      "keyboard": "#/keyboard/mainMenu"
    },

    "cancel": {
      "aliases": "Cancel ❌, ❌ Cancel",
      "text": "Request canceled.",
      "run": { "command": "/menu" }
    },

    "selectLanguage": {
      "alias": "#/button/changeLanguage",
      "text": "Please select language. \n\nCurrent language: \"{curLang}\"",
      "inline_buttons": "#/keyboard/selectlanguage"
    },

    "setLng": {
      "text": "Language changed to \"{newLang}\"",
      "inline_buttons": "#/keyboard/selectlanguage",
      "edit": true,
      "run": { "command": "/menu" }
    }
  },
  "types": {
    "keyboard": {
      "mainMenu": "💰 {balance} {currency},\n👫 Invite,🗂 Wallet,📤 Withdraw,\n🎁 Bonus,📊 Statistics",
      "setWallet": "{wallet}" ? "Change" : "Set" + " Wallet, Back 🔙",
      "joinInlineKeyboard": [[
        { "text": "🟢 Joined {Joining:needToJoinCount} from {Joining:channelsCount} channel(s)", "command": "checkJoin" }
      ]],
      "referralProfile": [[{ "text": "📟 Profile", "url": "tg://user?id={referralId}" }]],
      "selectlanguage": [
        [
          { "text": "🇬🇧 English", "command": "setLng en" },
          { "text": "🇫🇷 Français", "command": "setLng fr" }
        ],
        [
          { "text": "🇮🇳 हिन्दी", "command": "setLng hi" },
          { "text": "🇧🇩 বাংলা", "command": "setLng bn" }
        ]
      ]
    }
  },

  "titles": {
    "mainMenu": "🏠 Main Menu",
    "curLang": "🇺🇸 English",
    "coreTasks": {
      "welcomeReward": "Joining Bonus",
      "newRefReward": "Referral Bonus"
    },
    "dailyRewardTask": "Daily Bonus"
  }
}


smartBot.setupLng("en", LANG);
debug("step x: language setup complete")
