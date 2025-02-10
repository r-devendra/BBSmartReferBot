/*CMD
  command: /request
  help: 
  need_reply: 
  auto_retry_time: 
  folder: withdraw
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let refCount = RefLib.getRefCount();
let minRef = parseInt(getFieldValue("MIN_REFERRALS_VALUE"));
let minPay = parseInt(getFieldValue("MIN_PAYOUT"));
let maxPay = parseInt(getFieldValue("MAX_PAYOUT"));
let minBalRequired = parseInt(getFieldValue("MIN_PAYOUT_BALANCE")) || 0;

let withdrawEnabled = getFieldValue("WITHDRAW_ENABLED");
let referralsRequired = getFieldValue("REFERRALS_REQUIRED");
let currentBalance = getBalance();
let wallet = getUserWallet();

let options = {};

// Check if withdrawals are enabled
if (!withdrawEnabled) {
  smartBot.run({ command: 'withdrawDisabled' });
  return;
}
// Check if referrals are required and if the user has enough referrals
if (referralsRequired && refCount < minRef) {
  options = { min_ref_needed: minRef, my_ref_count: refCount, left_refs: minRef - refCount };
  smartBot.run({ command: "withdrawDeniedRefsRequired", options });
  return;
}
// Check if user balance is sufficient for withdrawal
if (minBalRequired && currentBalance < minBalRequired) {
  options = { required_balance: minBalRequired };
  smartBot.run({ command: "withdrawDeniedInsufficientBalance", options });
  return;
}
// Check if user balance is enough for the minimum payout
if (currentBalance < minPay) {
  options = { minPayout: minPay };
  smartBot.run({ command: "withdrawDenied", options });
  return;
}

if (!wallet) {
  smartBot.run({ command: "noWallet" });
  return;
}

smartBot.run({ command: "acceptRequestAmount" });

