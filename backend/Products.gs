/**
 * DREAM CART BD - Products Module
 */

function getProductsHandler(params) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.PRODUCTS);
  if (!sheet) return { success: false, message: "Products sheet missing", error: "SHEET_NOT_FOUND" };

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { success: true, data: { products: [], total: 0 } };

  var headers = data[0];
  var products = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var p = {};
    for (var j = 0; j < headers.length; j++) {
      p[headers[j].toLowerCase()] = row[j];
    }
    // Only return active products
    if (p.status === "Active" || !p.status) {
      products.push(p);
    }
  }

  // Filter by category if requested
  if (params && params.category_id) {
    products = products.filter(function(item) {
      return item.category_id === params.category_id;
    });
  }

  return { success: true, data: { products: products, total: products.length } };
}

function getProductHandler(id) {
  var listRes = getProductsHandler({});
  if (!listRes.success) return listRes;
  
  var found = listRes.data.products.find(function(p) {
    return p.product_id === id || p.sku === id || p.slug === id;
  });

  if (found) {
    return { success: true, data: { product: found } };
  }
  return { success: false, message: "Product not found", error: "NOT_FOUND" };
}

function getCategoriesHandler() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(DC_CONFIG.TABS.CATEGORIES);
  if (!sheet) return { success: false, message: "Categories sheet missing", error: "SHEET_NOT_FOUND" };

  var data = sheet.getDataRange().getValues();
  var categories = [];
  for (var i = 1; i < data.length; i++) {
    categories.push({
      id: data[i][0],
      name: data[i][1],
      parent_id: data[i][2],
      slug: data[i][3],
      icon: data[i][4],
      status: data[i][5]
    });
  }
  return { success: true, data: { categories: categories } };
}

function getSettingsHandler() {
  return { success: true, data: DC_CONFIG };
}
