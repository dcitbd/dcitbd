/**
 * DREAM CART BD - Backend Configuration & Database Setup
 * 41 Spreadsheet Tabs Schema Definition
 */

var DC_CONFIG = {
  SHOP_NAME: "Dream Cart BD",
  SLOGAN: "You Make.",
  PHONE_1: "01581703822",
  PHONE_2: "01818273838",
  EMAIL_1: "jainal.dcitbd@gmail.com",
  EMAIL_2: "saiful05333@gmail.com",
  DELIVERY_CUMILLA: 90,
  DELIVERY_DHAKA: 110,
  DELIVERY_OUTSIDE: 135,
  FREE_DELIVERY_THRESHOLD: 2000,
  ONLINE_PAYMENT_DISCOUNT: 0.05,
  RESELLER_PAYOUT_FEE: 0.03,

  // Google Drive Folder IDs
  DRIVE_FOLDERS: {
    PRODUCTS: "1q8rfxni24t6q17wX-82ozjpbVXXR_ntG",
    BRANDS: "1kBORS5_d-7O1F8dd6YFWW9P2wTk6KXJu",
    CATEGORIES: "1ZwTZs_ZeLuZYtvU4G6JkK2DMWHRgHyyA",
    SETTINGS: "1gF0RhJFX-JD4e8vZw2yx2SJ6zD5mf2Vd"
  },

  // 41 Defined Tabs
  TABS: {
    SETTINGS: "01_Settings",
    USERS: "02_Users",
    CUSTOMERS: "03_Customers",
    SELLERS: "04_Sellers",
    RESELLERS: "05_Resellers",
    WHOLESALERS: "06_Wholesalers",
    ADMIN_WORKERS: "07_AdminWorkers",
    ROLES: "08_Roles",
    PERMISSIONS: "09_Permissions",
    PRODUCTS: "10_Products",
    PRODUCT_IMAGES: "11_ProductImages",
    CATEGORIES: "12_Categories",
    BRANDS: "13_Brands",
    ATTRIBUTES: "14_Attributes",
    BANNERS: "15_Banners",
    LANDING_PAGES: "16_LandingPages",
    ORDERS: "17_Orders",
    ORDER_ITEMS: "18_OrderItems",
    INCOMPLETE_ORDERS: "19_IncompleteOrders",
    RETURN_ORDERS: "20_ReturnOrders",
    PAYMENTS: "21_Payments",
    CARTS: "22_Carts",
    FAVORITES: "23_Favorites",
    REVIEWS: "24_Reviews",
    COMMISSION_LEDGER: "25_CommissionLedger",
    PAYOUT_REQUESTS: "26_PayoutRequests",
    BUYING: "27_Buying",
    INVEST: "28_Invest",
    COSTS: "29_Costs",
    COURIERS: "30_Couriers",
    SHIPMENTS: "31_Shipments",
    VISITORS: "32_Visitors",
    NOTIFICATIONS: "33_Notifications",
    PASSWORD_RESETS: "34_PasswordResets",
    OTP: "35_OTP",
    SESSIONS: "36_Sessions",
    AUDIT_LOGS: "37_AuditLogs",
    OFFERS: "38_Offers",
    MARKETS: "39_Markets",
    SITE_NOTICES: "40_SiteNotices",
    REPORTS: "41_Reports"
  }
};

/**
 * Setup Function: Run once from Apps Script editor to initialize the spreadsheet.
 */
function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var schemas = {};
  schemas[DC_CONFIG.TABS.SETTINGS] = ["Key", "Value", "Description", "Updated_At"];
  schemas[DC_CONFIG.TABS.USERS] = ["User_ID", "Name", "Mobile", "Email", "Password_Hash", "Role", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.CUSTOMERS] = ["Customer_ID", "User_ID", "Name", "Mobile", "Email", "Address", "Total_Orders", "Successful_Orders", "Cancelled_Orders", "Returned_Orders", "Total_Spend", "Fraud_Status", "Created_At"];
  schemas[DC_CONFIG.TABS.SELLERS] = ["Seller_ID", "User_ID", "Shop_Name", "Owner_Name", "Mobile", "Email", "NID", "Full_Address", "Balance", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.RESELLERS] = ["Reseller_ID", "User_ID", "Name", "Mobile", "Email", "Full_Address", "Payout_Method", "Payout_Account", "Total_Sales", "Total_Commission", "Withdrawable_Balance", "Created_At"];
  schemas[DC_CONFIG.TABS.WHOLESALERS] = ["Wholesaler_ID", "User_ID", "Shop_Name", "Owner_Name", "Mobile", "Email", "NID", "Full_Address", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.ADMIN_WORKERS] = ["Worker_ID", "User_ID", "Name", "Mobile", "Email", "Role", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.ROLES] = ["Role_ID", "Role_Name", "Description", "Permissions_JSON"];
  schemas[DC_CONFIG.TABS.PERMISSIONS] = ["Permission_ID", "Module", "Action", "Description"];
  schemas[DC_CONFIG.TABS.PRODUCTS] = ["Product_ID", "SKU", "Product_Name", "Slug", "Category_ID", "Sub_Category_ID", "Child_Category_ID", "Brand_ID", "Buying_Price", "Customer_Price", "Seller_Price", "Reseller_Price", "Wholesale_Price", "Original_Price", "Wholesale_Min_Order_Qty", "Stock", "Low_Stock_Level", "Unit", "Color", "Size", "Attributes_JSON", "Description", "Specification", "Others", "Featured", "Best_Selling", "New_Product", "Status", "Created_At", "Updated_At", "Created_By", "Updated_By"];
  schemas[DC_CONFIG.TABS.PRODUCT_IMAGES] = ["Image_ID", "Product_ID", "Image_URL", "Drive_File_ID", "Drive_Folder_ID", "Sort_Order", "Is_Cover", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.CATEGORIES] = ["Category_ID", "Name", "Parent_ID", "Slug", "Icon", "Status", "Sort_Order"];
  schemas[DC_CONFIG.TABS.BRANDS] = ["Brand_ID", "Brand_Name", "Brand_Image", "Brand_Description", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.ATTRIBUTES] = ["Attribute_ID", "Name", "Values_CSV", "Status"];
  schemas[DC_CONFIG.TABS.BANNERS] = ["Banner_ID", "Image", "Mobile_Image", "Title", "Subtitle", "Button_Text", "Button_URL", "Category_ID", "Status", "Sort_Order"];
  schemas[DC_CONFIG.TABS.LANDING_PAGES] = ["Landing_ID", "Title", "Slug", "Blocks_JSON", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.ORDERS] = ["Order_ID", "Date", "Buyer_Type", "Buyer_ID", "Customer_Name", "Phone", "Email", "Address", "Delivery_Area", "Subtotal", "Discount", "Delivery_Charge", "Total_Payable", "Payment_Method", "Transaction_ID", "Payment_Status", "Order_Status", "Courier_Name", "Tracking_Number", "Notes", "Created_At"];
  schemas[DC_CONFIG.TABS.ORDER_ITEMS] = ["Item_ID", "Order_ID", "Product_ID", "Product_Name", "SKU", "Unit_Price", "Quantity", "Color", "Size", "Subtotal"];
  schemas[DC_CONFIG.TABS.INCOMPLETE_ORDERS] = ["Incomplete_ID", "Phone", "Name", "Email", "Address", "Delivery_Area", "Cart_JSON", "Last_Activity"];
  schemas[DC_CONFIG.TABS.RETURN_ORDERS] = ["Return_ID", "Order_ID", "Customer_Name", "Phone", "Product_ID", "Quantity", "Reason", "Refund_Amount", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.PAYMENTS] = ["Payment_ID", "Order_ID", "Amount", "Method", "Transaction_ID", "Account_Number", "Status", "Verified_By", "Verified_At"];
  schemas[DC_CONFIG.TABS.CARTS] = ["Cart_ID", "User_ID", "Product_ID", "Quantity", "Color", "Size", "Updated_At"];
  schemas[DC_CONFIG.TABS.FAVORITES] = ["Favorite_ID", "User_ID", "Product_ID", "Created_At"];
  schemas[DC_CONFIG.TABS.REVIEWS] = ["Review_ID", "Product_ID", "User_ID", "Customer_Name", "Rating", "Title", "Comment", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.COMMISSION_LEDGER] = ["Ledger_ID", "Order_ID", "Reseller_ID", "Product_ID", "Quantity", "Reseller_Price", "Customer_Selling_Price", "Gross_Commission", "Payment_Fee", "Net_Commission", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.PAYOUT_REQUESTS] = ["Payout_ID", "Reseller_ID", "Requested_Amount", "Fee_Amount", "Net_Payout", "Payment_Method", "Account_Number", "Status", "Requested_At", "Processed_At"];
  schemas[DC_CONFIG.TABS.BUYING] = ["Buying_ID", "Date", "Who_Buy", "Product_ID", "Product_Name", "Buying_Price", "Quantity", "Total_Cost", "Supplier", "Note"];
  schemas[DC_CONFIG.TABS.INVEST] = ["Invest_ID", "Date", "Investor_Name", "Type", "Amount", "Note", "Status"];
  schemas[DC_CONFIG.TABS.COSTS] = ["Cost_ID", "Date", "Who_Paid", "Purpose", "Amount", "Note", "Status"];
  schemas[DC_CONFIG.TABS.COURIERS] = ["Courier_ID", "Name", "Phone", "Website", "Tracking_URL_Pattern", "Status"];
  schemas[DC_CONFIG.TABS.SHIPMENTS] = ["Shipment_ID", "Order_ID", "Courier_ID", "Tracking_Number", "Status", "Shipped_At", "Delivered_At"];
  schemas[DC_CONFIG.TABS.VISITORS] = ["Log_ID", "Date", "Page", "IP", "User_Agent", "Referrer"];
  schemas[DC_CONFIG.TABS.NOTIFICATIONS] = ["Notification_ID", "Type", "Title", "Message", "Link", "Is_Read", "Created_At"];
  schemas[DC_CONFIG.TABS.PASSWORD_RESETS] = ["Reset_ID", "User_ID", "Token", "Expiry", "Used"];
  schemas[DC_CONFIG.TABS.OTP] = ["OTP_ID", "Mobile_Or_Email", "OTP_Hash", "Purpose", "Expiry", "Attempts", "Verified"];
  schemas[DC_CONFIG.TABS.SESSIONS] = ["Session_ID", "User_ID", "Token", "Role", "Created_At", "Expires_At"];
  schemas[DC_CONFIG.TABS.AUDIT_LOGS] = ["Log_ID", "User_ID", "User_Name", "Role", "Action", "Module", "Record_ID", "Timestamp"];
  schemas[DC_CONFIG.TABS.OFFERS] = ["Offer_ID", "Title", "Discount_Percent", "Start_Date", "End_Date", "Banner_URL", "Status"];
  schemas[DC_CONFIG.TABS.MARKETS] = ["Market_ID", "Platform_Name", "URL", "Logo_URL", "Status", "Sort_Order"];
  schemas[DC_CONFIG.TABS.SITE_NOTICES] = ["Notice_ID", "Text", "Type", "Status", "Created_At"];
  schemas[DC_CONFIG.TABS.REPORTS] = ["Report_ID", "Date", "Total_Sales", "Total_Orders", "Total_Cost", "Gross_Margin", "Generated_At"];

  for (var tabName in schemas) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(schemas[tabName]);
      sheet.getRange(1, 1, 1, schemas[tabName].length).setFontWeight("bold").setBackground("#0ea5e9").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
  }

  // Provision Default Settings
  var settingsSheet = ss.getSheetByName(DC_CONFIG.TABS.SETTINGS);
  if (settingsSheet.getLastRow() === 1) {
    settingsSheet.appendRow(["SHOP_NAME", DC_CONFIG.SHOP_NAME, "Main Store Name", new Date().toISOString()]);
    settingsSheet.appendRow(["SLOGAN", DC_CONFIG.SLOGAN, "Store Tagline", new Date().toISOString()]);
    settingsSheet.appendRow(["PHONE_1", DC_CONFIG.PHONE_1, "Primary Hotline", new Date().toISOString()]);
    settingsSheet.appendRow(["PHONE_2", DC_CONFIG.PHONE_2, "Secondary Hotline", new Date().toISOString()]);
    settingsSheet.appendRow(["FREE_DELIVERY_THRESHOLD", "2000", "Free delivery subtotal limit", new Date().toISOString()]);
    settingsSheet.appendRow(["CUMILLA_DELIVERY", "90", "Cumilla Delivery Fee", new Date().toISOString()]);
    settingsSheet.appendRow(["DHAKA_DELIVERY", "110", "Dhaka Delivery Fee", new Date().toISOString()]);
    settingsSheet.appendRow(["OUTSIDE_DELIVERY", "135", "Outside Delivery Fee", new Date().toISOString()]);
  }

  // Provision Default Super Admin User
  var usersSheet = ss.getSheetByName(DC_CONFIG.TABS.USERS);
  if (usersSheet.getLastRow() === 1) {
    var passHash = hashPassword("Admin@DreamCart2026");
    usersSheet.appendRow(["ADM001", "Jainal Abedin (Super Admin)", "01581703822", "jainal.dcitbd@gmail.com", passHash, "super_admin", "Active", new Date().toISOString()]);
  }

  return "Database initialized with all 41 tabs successfully!";
}
