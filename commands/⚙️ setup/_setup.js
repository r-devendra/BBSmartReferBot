/*CMD
  command: /setup
  help: 
  need_reply: 
  auto_retry_time: 
  folder: ⚙️ setup
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/



var panel = {
  title: "Referral System Configuration",
  description: "Manage your referral system settings below.",
  index: 0,
  icon: "settings",
  button_title: "SAVE",
  //on_saving: {
  //  command: "/setup2",
  //},

  fields: [
    {
      name: "ADMIN_ID",
      title: "Admin ID",
      description: "This is your unique Admin ID. Retrieve it using `Bot.sendMessage(user.id)`.",
      type: "string",
      placeholder: "Enter your Admin ID",
      icon: "person",
    },
    {
      name: "CURRENCY",
      title: "Bot Currency",
      description: "Currency name to show in place of it all over the bot.",
      type: "string",
      placeholder: "Enter Currency Name",
      value: "💎 BB Point",
      icon: "cash",
    },
    {
      name: "PAYMENT_CHANNEL",
      title: "Payment Channel",
      description: "Payment channel username to log all withdraw requests.",
      type: "string",
      placeholder: "@channelusername",
      icon: "chat",

    },
    {
      name: "WELCOME_REWARD",
      title: "Welcome Bonus Reward",
      description: "Amount given to a new user for on joining all channels.",
      type: "float",
      placeholder: "Enter Welcome Reward Amount",
      value: 0, // 
      icon: "gift",
    },
    {
      name: "DAILY_REWARD",
      title: "Daily Bonus Reward",
      description: "Daily Bonus Reward for user.",
      type: "float",
      placeholder: "Enter Daily Reward Amount",
      value: 0,  
      icon: "calendar",
    },
    {
      name: "REWARD_PER_REFER",
      title: "Referral Reward",
      description: "Amount given to a user for each successful referral.",
      type: "float",
      placeholder: "Enter Referral Reward Amount",
      icon: "people",
    },
    {
      name: "WITHDRAW_ENABLED",
      title: "Withdrawals Enabled",
      description: "Enable or disable withdrawals for users.",
      type: "checkbox",
      value: true, // Default: enabled
    },
    {
      name: "MIN_PAYOUT",
      title: "Minimum Payout",
      description: "Minimum amount a user must reach before requesting a payout.",
      type: "float",
      placeholder: "Enter Minimum Payout Amount",
      icon: "arrow-down",
    },
    {
      name: "MIN_PAYOUT_BALANCE",
      title: "Minimum Balance for Withdrawal",
      description: "Balance a user needs to have before they can withdraw funds.",
      type: "float",
      placeholder: "Enter Minimum Withdrawal Balance",
      value: 0, // Default: 0, users can withdraw anytime as long as they meet the payout threshold
      icon: "wallet",
    },
    {
      name: "MAX_PAYOUT",
      title: "Maximum Payout",
      description: "Maximum withdrawal amount per request. Leave empty for no limit.",
      type: "float",
      placeholder: "Enter Maximum Payout Amount (Optional)",
      value: null, // Default value is null (no limit)
      icon: "arrow-up",
    },
    {
      name: "REFERRALS_REQUIRED",
      title: "Minimum Referrals for Payout",
      description: "Require users to reach a certain referral reward amount before requesting a payout.",
      type: "checkbox",
      value: false, // Default: disabled
      icon: "check-circle",
    },
    {
      name: "MIN_REFERRALS_VALUE",
      title: "Minimum Refer Value",
      description: "The minimum refers user need to reach before requesting a payout (if enabled).",
      type: "float",
      placeholder: "Enter Minimum Referral Reward",
      value: null, // Default: null, i.e, no limit
      icon: "person-add",
    }
  ]
}

AdminPanel.setPanel({
  panel_name: "BotSettings",
  data: panel
});

// install MCL
Libs.MembershipChecker.setup()

AdminPanel.setFieldValue({
  panel_name: "MembershipChecker", // panel name
  field_name: "onNeedJoining", // field name
  value: "/onNeedJoining"
})
AdminPanel.setFieldValue({
  panel_name: "MembershipChecker", // panel name
  field_name: "onAllJoining", // field name
  value: "/onAllJoining"
})
AdminPanel.setFieldValue({
  panel_name: "MembershipChecker", // panel name
  field_name: "onStillJoined", // field name
  value: "/onStillJoined"
})
AdminPanel.setFieldValue({
  panel_name: "MembershipChecker", // panel name
  field_name: "onError", // field name
  value: "/onMCLError"
})


Bot.sendMessage("Admin Panel Configured, Make the required changes and save to complete setup.")

