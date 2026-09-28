/**
 * DREAM CART BD - Authentication Module
 */

function loginUserHandler(body) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.USERS);
  var data = sheet.getDataRange().getValues();
  var passHash = hashPassword(body.password);

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var emailOrPhone = row[2] == body.username || row[3] == body.username;
    if (emailOrPhone && row[4] == passHash) {
      var user = {
        id: row[0],
        name: row[1],
        mobile: row[2],
        email: row[3],
        role: row[5],
        token: "tok_" + Utilities.getUuid()
      };
      return { success: true, message: "Login successful", data: { user: user } };
    }
  }

  return { success: false, message: "Invalid credentials", error: "AUTH_FAILED" };
}

function registerUserHandler(body) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.USERS);
  var userId = "USR_" + Math.floor(100000 + Math.random() * 900000);
  var passHash = hashPassword(body.password);
  var now = new Date().toISOString();

  sheet.appendRow([
    userId,
    body.name,
    body.mobile,
    body.email || "",
    passHash,
    body.role || "customer",
    "Active",
    now
  ]);

  return { success: true, message: "Registration completed successfully", data: { user_id: userId } };
}
