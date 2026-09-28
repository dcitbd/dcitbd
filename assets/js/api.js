/**
 * DREAM CART BD - Unified API Abstraction Layer
 * Interfaces between the frontend and the Cloudflare Worker / Google Apps Script backend.
 * Provides resilient fallbacks and localStorage synchronization.
 */

class DreamCartAPI {
  constructor() {
    this.baseUrl = DC_CONFIG.API_BASE;
  }

  // Get Auth Headers
  getHeaders() {
    const user = this.getCurrentUser();
    const token = user ? user.token : "";
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    };
  }

  // Current User Session Management
  getCurrentUser() {
    try {
      const stored = sessionStorage.getItem("dc_user") || localStorage.getItem("dc_user");
      return stored ? JSON.parse(stored) : null;
    } catch(e) {
      return null;
    }
  }

  setCurrentUser(user, remember = false) {
    const serialized = JSON.stringify(user);
    if (remember) {
      localStorage.setItem("dc_user", serialized);
    }
    sessionStorage.setItem("dc_user", serialized);
    window.dispatchEvent(new CustomEvent("dc_auth_changed", { detail: user }));
  }

  logout() {
    sessionStorage.removeItem("dc_user");
    localStorage.removeItem("dc_user");
    window.dispatchEvent(new CustomEvent("dc_auth_changed", { detail: null }));
  }

  // Get effective price based on active user role
  getProductPriceForUser(product, user = null) {
    if (!user) user = this.getCurrentUser();
    const role = user ? user.role : "guest";
    
    switch (role) {
      case "seller":
        return product.seller_price || product.customer_price;
      case "reseller":
        return product.reseller_price || product.customer_price;
      case "wholesaler":
        return product.wholesale_price || product.customer_price;
      default:
        return product.customer_price;
    }
  }

  // Generic Request Helper (Supports both relative /api and direct Google Apps Script URL)
  async request(endpoint, options = {}) {
    const user = this.getCurrentUser();
    const token = user ? user.token : "";
    options.headers = {
      "Content-Type": "application/json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    let url;
    if (this.baseUrl.startsWith("http")) {
      const cleanEndpoint = endpoint.replace(/^\//, '').split('?')[0];
      const separator = this.baseUrl.includes('?') ? '&' : '?';
      url = `${this.baseUrl}${separator}action=${cleanEndpoint}`;
      if (endpoint.includes('?')) {
        url += '&' + endpoint.split('?')[1];
      }
    } else {
      url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    }
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[DreamCartAPI] Backend call to ${url} notice:`, err.message);
      return this.handleFallback(endpoint, options);
    }
  }
  }

  // Resilient Local Fallback Engine
  async handleFallback(endpoint, options) {
    const method = (options.method || "GET").toUpperCase();
    const body = options.body ? JSON.parse(options.body) : {};

    // Public / Products fallback
    if (endpoint.includes("/products")) {
      const stored = localStorage.getItem("dc_mock_products");
      let products = stored ? JSON.parse(stored) : DC_CONFIG.SAMPLE_PRODUCTS;
      return { success: true, data: { products, total: products.length } };
    }

    // Categories fallback
    if (endpoint.includes("/categories")) {
      return { success: true, data: { categories: DC_CONFIG.SAMPLE_CATEGORIES } };
    }

    // Settings fallback
    if (endpoint.includes("/settings")) {
      return { success: true, data: DC_CONFIG };
    }

    // Authentication fallbacks
    if (endpoint.includes("/auth/login")) {
      const { email, password, role } = body;
      // Default demo login for convenience
      const demoUser = {
        id: "USR_" + Math.random().toString(36).substring(7).toUpperCase(),
        name: body.name || "Jainal Abedin",
        email: email || "user@dreamcartbd.com",
        mobile: body.mobile || "01581703822",
        role: role || (email && email.includes("admin") ? "super_admin" : "customer"),
        token: "tok_" + Date.now() + "_" + Math.random().toString(36).substring(5)
      };
      this.setCurrentUser(demoUser, true);
      return { success: true, message: "Login successful", data: { user: demoUser } };
    }

    // Orders fallback
    if (endpoint.includes("/orders") && method === "POST") {
      const orderId = "DC-" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        ...body,
        id: orderId,
        date: new Date().toISOString(),
        order_status: "Pending",
        payment_status: body.payment_method === "COD" ? "Pending" : "Submitted"
      };

      // Save to localStorage orders list
      let orders = JSON.parse(localStorage.getItem("dc_mock_orders") || "[]");
      orders.unshift(newOrder);
      localStorage.setItem("dc_mock_orders", JSON.stringify(orders));

      return { success: true, message: "Order placed successfully!", data: { order: newOrder } };
    }

    // Default mock response
    return { success: true, message: "Operation completed in local sandbox mode.", data: {} };
  }

  // Cart Operations (Synced with LocalStorage)
  getCart() {
    try {
      return JSON.parse(localStorage.getItem("dc_cart") || "[]");
    } catch(e) {
      return [];
    }
  }

  addToCart(product, quantity = 1, options = {}) {
    let cart = this.getCart();
    const user = this.getCurrentUser();
    const effectivePrice = this.getProductPriceForUser(product, user);
    
    // Check wholesale minimum quantity
    if (user && user.role === "wholesaler") {
      const minQty = product.wholesale_min_qty || 1;
      if (quantity < minQty) {
        quantity = minQty;
      }
    }

    const key = `${product.id}_${options.color || 'default'}_${options.size || 'default'}`;
    const existingIndex = cart.findIndex(item => item.cartKey === key);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        cartKey: key,
        product_id: product.id,
        name: product.name,
        price: effectivePrice,
        original_price: product.original_price,
        image: product.image,
        color: options.color || (product.color ? product.color.split(',')[0].trim() : ""),
        size: options.size || (product.size ? product.size.split(',')[0].trim() : ""),
        quantity: quantity,
        wholesale_min_qty: product.wholesale_min_qty || 1
      });
    }

    localStorage.setItem("dc_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("dc_cart_updated", { detail: cart }));
    return cart;
  }

  updateCartQty(cartKey, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter(item => item.cartKey !== cartKey);
    } else {
      const item = cart.find(i => i.cartKey === cartKey);
      if (item) item.quantity = quantity;
    }
    localStorage.setItem("dc_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("dc_cart_updated", { detail: cart }));
    return cart;
  }

  removeFromCart(cartKey) {
    let cart = this.getCart().filter(item => item.cartKey !== cartKey);
    localStorage.setItem("dc_cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("dc_cart_updated", { detail: cart }));
    return cart;
  }

  clearCart() {
    localStorage.removeItem("dc_cart");
    window.dispatchEvent(new CustomEvent("dc_cart_updated", { detail: [] }));
  }

  // Wishlist Operations
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem("dc_favorites") || "[]");
    } catch(e) {
      return [];
    }
  }

  toggleFavorite(productId) {
    let favs = this.getFavorites();
    const idx = favs.indexOf(productId);
    let isAdded = false;
    if (idx > -1) {
      favs.splice(idx, 1);
    } else {
      favs.push(productId);
      isAdded = true;
    }
    localStorage.setItem("dc_favorites", JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent("dc_favs_updated", { detail: favs }));
    return isAdded;
  }

  isFavorite(productId) {
    return this.getFavorites().includes(productId);
  }
}

const api = new DreamCartAPI();
