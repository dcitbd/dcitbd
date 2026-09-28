/**
 * DREAM CART BD - Payments & Reseller Commission Module
 */

function submitPaymentHandler(body) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.PAYMENTS);
  var paymentId = "PAY_" + Math.floor(100000 + Math.random() * 900000);

  sheet.appendRow([
    paymentId,
    body.order_id,
    body.amount,
    body.method,
    body.transaction_id,
    body.account_number || "",
    "Submitted",
    "",
    new Date().toISOString()
  ]);

  return { success: true, message: "Payment submitted successfully", data: { payment_id: paymentId } };
}

function requestPayoutHandler(body) {
  var amount = parseFloat(body.amount);
  var fee = Math.round(amount * DC_CONFIG.RESELLER_PAYOUT_FEE);
  var net = amount - fee;
  var payoutId = "PO_" + Math.floor(100000 + Math.random() * 900000);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.PAYOUT_REQUESTS);

  sheet.appendRow([
    payoutId,
    body.reseller_id,
    amount,
    fee,
    net,
    body.method,
    body.account_number,
    "Pending",
    new Date().toISOString(),
    ""
  ]);

  return { success: true, message: "Payout request submitted", data: { payout_id: payoutId, net_payout: net, fee: fee } };
}
