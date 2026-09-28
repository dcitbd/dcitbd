/**
 * DREAM CART BD - Master Google Apps Script Web App
 */

function doGet(e) {
  return handleRequest(e, "GET");
}

function doPost(e) {
  return handleRequest(e, "POST");
}

function handleRequest(e, method) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000); // 15s concurrency lock
    
    var params = e.parameter || {};
    var action = params.action || "";
    var body = {};

    if (method === "POST" && e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
        if (!action && body.action) {
          action = body.action;
        }
      } catch (err) {
        return createResponse(false, "Invalid JSON payload", null, "INVALID_JSON");
      }
    }

    var result = routeAction(action, params, body, method);
    return createResponse(result.success, result.message, result.data, result.error);

  } catch (err) {
    return createResponse(false, "Internal server error: " + err.message, null, "INTERNAL_ERROR");
  } finally {
    lock.releaseLock();
  }
}

function routeAction(action, params, body, method) {
  switch (action) {
    case "initDatabase":
      return { success: true, message: setupDatabase(), data: null };
    case "getProducts":
      return getProductsHandler(params);
    case "getProduct":
      return getProductHandler(params.id);
    case "getCategories":
      return getCategoriesHandler();
    case "getSettings":
      return getSettingsHandler();
    case "createOrder":
      return createOrderHandler(body);
    case "trackOrder":
      return trackOrderHandler(params.orderId || params.phone);
    case "login":
      return loginUserHandler(body);
    case "register":
      return registerUserHandler(body);
    case "submitPayment":
      return submitPaymentHandler(body);
    case "requestPayout":
      return requestPayoutHandler(body);
    case "getReports":
      return getReportsHandler(params);
    default:
      return { success: false, message: "Action not recognized: " + action, data: null, error: "UNKNOWN_ACTION" };
  }
}

function createResponse(success, message, data, error) {
  var payload = {
    success: success,
    message: message || (success ? "Success" : "Failed"),
    data: data || null,
    error: error || null
  };
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function hashPassword(password) {
  var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password, Utilities.Charset.UTF_8);
  var txtHash = "";
  for (var i = 0; i < rawHash.length; i++) {
    var hashVal = rawHash[i];
    if (hashVal < 0) hashVal += 256;
    var byteString = hashVal.toString(16);
    if (byteString.length == 1) byteString = "0" + byteString;
    txtHash += byteString;
  }
  return txtHash;
}
