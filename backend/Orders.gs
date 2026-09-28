/**
 * DREAM CART BD - Orders Module
 * Authoritative Server-side Price & Stock Calculation
 */

function createOrderHandler(body) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ordersSheet = ss.getSheetByName(DC_CONFIG.TABS.ORDERS);
  var orderItemsSheet = ss.getSheetByName(DC_CONFIG.TABS.ORDER_ITEMS);
  var productsSheet = ss.getSheetByName(DC_CONFIG.TABS.PRODUCTS);

  if (!body.items || !body.items.length) {
    return { success: false, message: "Cart is empty", error: "EMPTY_CART" };
  }

  var subtotal = 0;
  var validatedItems = [];

  // Validate every item against authoritative database
  for (var i = 0; i < body.items.length; i++) {
    var reqItem = body.items[i];
    var product = getProductHandler(reqItem.product_id).data;
    if (!product || !product.product) {
      return { success: false, message: "Product invalid: " + reqItem.product_id, error: "INVALID_PRODUCT" };
    }
    var prod = product.product;
    var price = prod.customer_price;
    if (body.buyer_type === "reseller") price = prod.reseller_price;
    else if (body.buyer_type === "seller") price = prod.seller_price;
    else if (body.buyer_type === "wholesaler") price = prod.wholesale_price;

    var lineSub = price * reqItem.quantity;
    subtotal += lineSub;

    validatedItems.push({
      product_id: prod.product_id,
      name: prod.product_name,
      sku: prod.sku,
      unit_price: price,
      quantity: reqItem.quantity,
      color: reqItem.color || "",
      size: reqItem.size || "",
      subtotal: lineSub
    });
  }

  // Delivery charge calculation
  var deliveryCharge = DC_CONFIG.DELIVERY_OUTSIDE;
  if (body.delivery_area === "Cumilla") deliveryCharge = DC_CONFIG.DELIVERY_CUMILLA;
  else if (body.delivery_area === "Dhaka") deliveryCharge = DC_CONFIG.DELIVERY_DHAKA;

  if (subtotal >= DC_CONFIG.FREE_DELIVERY_THRESHOLD) {
    deliveryCharge = 0;
  }

  // Online Payment Discount (5% on subtotal)
  var discount = 0;
  if (["bKash", "Nagad", "Rocket", "Bank"].indexOf(body.payment_method) !== -1) {
    discount = Math.round(subtotal * DC_CONFIG.ONLINE_PAYMENT_DISCOUNT);
  }

  var totalPayable = subtotal - discount + deliveryCharge;
  var orderId = "DC-" + Math.floor(100000 + Math.random() * 900000);
  var now = new Date().toISOString();

  // Save Order Record
  ordersSheet.appendRow([
    orderId,
    now,
    body.buyer_type || "customer",
    body.buyer_id || "",
    body.customer_name,
    body.phone,
    body.email || "",
    body.address,
    body.delivery_area,
    subtotal,
    discount,
    deliveryCharge,
    totalPayable,
    body.payment_method,
    body.transaction_id || "",
    body.payment_method === "COD" ? "Pending" : "Submitted",
    "Pending",
    "Standard Express",
    "",
    body.notes || "",
    now
  ]);

  // Save Order Items
  for (var k = 0; k < validatedItems.length; k++) {
    var itm = validatedItems[k];
    orderItemsSheet.appendRow([
      "ITM_" + Math.random().toString(36).substring(7),
      orderId,
      itm.product_id,
      itm.name,
      itm.sku,
      itm.unit_price,
      itm.quantity,
      itm.color,
      itm.size,
      itm.subtotal
    ]);
  }

  // Try sending email notifications
  try {
    var emailBody = "New Order Received!\nOrder ID: " + orderId + "\nTotal: BDT " + totalPayable + "\nCustomer: " + body.customer_name + " (" + body.phone + ")";
    MailApp.sendEmail(DC_CONFIG.EMAIL_1, "New Order: " + orderId, emailBody);
  } catch(e) {}

  return {
    success: true,
    message: "Order placed successfully",
    data: {
      order_id: orderId,
      subtotal: subtotal,
      discount: discount,
      delivery_charge: deliveryCharge,
      total_payable: totalPayable
    }
  };
}

function trackOrderHandler(searchKey) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.ORDERS);
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[0] == searchKey || row[5] == searchKey) {
      return {
        success: true,
        data: {
          order_id: row[0],
          date: row[1],
          customer_name: row[4],
          phone: row[5],
          address: row[7],
          total: row[12],
          payment_method: row[13],
          payment_status: row[15],
          order_status: row[16],
          courier: row[17],
          tracking_number: row[18]
        }
      };
    }
  }
  return { success: false, message: "Order not found", error: "NOT_FOUND" };
}
