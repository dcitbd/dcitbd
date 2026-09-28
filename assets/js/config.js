/**
 * DREAM CART BD - Centralized Configuration
 * Slogan: "You Make."
 */
const DC_CONFIG = {
  SHOP_NAME: "Dream Cart BD",
  SLOGAN: "You Make.",
  PHONE_1: "01581703822",
  PHONE_2: "01818273838",
  EMAIL_1: "jainal.dcitbd@gmail.com",
  EMAIL_2: "saiful05333@gmail.com",
  ADDRESS: "Chaudhari Plaza, Ground Floor, Room No-03, Paduar Bazar, Bishwa Road, Sadar South, Cumilla, Bangladesh.",
  DEVELOPER_NAME: "Jainal Abedin",
  DEVELOPER_TITLE: "CEO, Dream Career IT BD",
  DEVELOPER_PROFILE: "https://dcitbd.github.io/Jainal-Abedin/",
  COMPANY_NAME: "Dream Career IT BD",
  COMPANY_WEBSITE: "https://dcitbd.github.io/dcitbd/",
  MAIN_SHOP_URL: "https://tinyurl.com/Dream-Cart-BD",
  
  // Delivery Rules
  DELIVERY_CUMILLA: 90,
  DELIVERY_DHAKA: 110,
  DELIVERY_OUTSIDE: 135,
  FREE_DELIVERY_THRESHOLD: 2000,
  
  // Pricing & Commission Rules
  ONLINE_PAYMENT_DISCOUNT: 0.05, // 5% discount
  RESELLER_PAYOUT_FEE: 0.03, // 3% fee
  LOW_STOCK_DEFAULT: 5,
  PRODUCTS_PER_PAGE: 120,
  HOMEPAGE_CATEGORY_LIMIT: 12,

  // Payment Details
  PAYMENTS: {
    bkashPersonal: "01879653143",
    bkashPayment: "01581703822",
    nagadPersonal: "01879653143",
    rocketPersonal: "01581703822",
    bank: {
      name: "Islami Bank Bangladesh Limited",
      accountNumber: "20508070200030208",
      accountName: "Jainal Abedin",
      branch: "Paduar Bazar Bishwa Road Branch, Cumilla"
    }
  },

  // API Base
  API_BASE: "/api",

  // Demo Fallback Data for UI Resilience
  SAMPLE_CATEGORIES: [
    { id: "CAT01", name: "Office Equipment", icon: "bi-printer", slug: "office-equipment", subcategories: ["Printing", "Binding & Lamination", "Stationery Organizers"] },
    { id: "CAT02", name: "Smart Gadgets", icon: "bi-smartwatch", slug: "smart-gadgets", subcategories: ["Smartwatches", "Earbuds & Audio", "Mini LED Speakers"] },
    { id: "CAT03", name: "Electronics & Lighting", icon: "bi-lightning-charge", slug: "electronics-lighting", subcategories: ["Rechargeable Torches", "LED Emergency Lights", "Desk Lamps"] },
    { id: "CAT04", name: "Document Storage", icon: "bi-folder2-open", slug: "document-storage", subcategories: ["Single File Holders", "Magazine Racks", "Desktop Organizers"] },
    { id: "CAT05", name: "Health & Organic", icon: "bi-heart-pulse", slug: "health-organic", subcategories: ["Maca Powder", "Herbal Supplements", "Wellness Tonics"] }
  ],

  SAMPLE_PRODUCTS: [
    {
      id: "PRD1001",
      sku: "DC-OE-001",
      name: "Deluxe Single-File Document Holder & Magazine Organizer Rack",
      slug: "deluxe-single-file-document-holder",
      category_id: "CAT04",
      category_name: "Document Storage",
      brand: "Dream Cart Executive",
      customer_price: 450,
      original_price: 600,
      seller_price: 390,
      reseller_price: 380,
      wholesale_price: 340,
      wholesale_min_qty: 10,
      stock: 45,
      unit: "Piece",
      color: "Matte Black, Deep Navy, Steel Gray",
      size: "A4 / Legal",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
      ],
      featured: true,
      best_selling: true,
      new_product: false,
      rating: 4.8,
      reviews_count: 34,
      description: "Heavy-duty steel mesh single-file holder designed for office desks and study tables. Rust-resistant powder coated finish.",
      specification: "Material: Anti-rust iron mesh | Dimensions: 31cm x 26cm x 7cm | Capacity: 500+ sheets A4"
    },
    {
      id: "PRD1002",
      sku: "DC-SG-002",
      name: "Ultra HD Retina Display Bluetooth Calling Smartwatch GT",
      slug: "ultra-hd-retina-display-smartwatch-gt",
      category_id: "CAT02",
      category_name: "Smart Gadgets",
      brand: "QCY / Haylou Pro",
      customer_price: 2450,
      original_price: 3200,
      seller_price: 2150,
      reseller_price: 2100,
      wholesale_price: 1900,
      wholesale_min_qty: 5,
      stock: 28,
      unit: "Box",
      color: "Obsidian Black, Silver Frost, Ocean Blue",
      size: "1.43 inch AMOLED",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80"
      ],
      featured: true,
      best_selling: true,
      new_product: true,
      rating: 4.9,
      reviews_count: 52,
      description: "Smartwatch with crystal-clear AMOLED display, Bluetooth calling with noise cancellation microphone, 100+ sports modes, and 10-day battery backup.",
      specification: "Battery: 300mAh | Waterproof: IP68 | Compatibility: Android 6.0+ / iOS 11.0+"
    },
    {
      id: "PRD1003",
      sku: "DC-EL-003",
      name: "Long-Range High Power Rechargeable Tactical LED Torch Light",
      slug: "high-power-rechargeable-tactical-led-torch",
      category_id: "CAT03",
      category_name: "Electronics & Lighting",
      brand: "PowerBeam Pro",
      customer_price: 780,
      original_price: 1100,
      seller_price: 660,
      reseller_price: 640,
      wholesale_price: 580,
      wholesale_min_qty: 12,
      stock: 64,
      unit: "Piece",
      color: "Anodized Black",
      size: "Medium Handheld",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600&auto=format&fit=crop&q=80"
      ],
      featured: false,
      best_selling: true,
      new_product: true,
      rating: 4.7,
      reviews_count: 19,
      description: "High lumens tactical flashlight with zoomable focus, Type-C fast charging, power bank output capability, and aluminum alloy body.",
      specification: "LED Type: XHP70 | Beam Distance: 800m | Battery: 26650 Li-ion 5000mAh"
    },
    {
      id: "PRD1004",
      sku: "DC-HO-004",
      name: "Pure Organic Premium Maca Root Powder 200g - Energy & Stamina Booster",
      slug: "pure-organic-premium-maca-root-powder-200g",
      category_id: "CAT05",
      category_name: "Health & Organic",
      brand: "Dream Organic Life",
      customer_price: 950,
      original_price: 1350,
      seller_price: 820,
      reseller_price: 800,
      wholesale_price: 720,
      wholesale_min_qty: 6,
      stock: 35,
      unit: "Jar (200g)",
      color: "Golden Cream",
      size: "200 Grams",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80"
      ],
      featured: true,
      best_selling: true,
      new_product: false,
      rating: 4.8,
      reviews_count: 41,
      description: "100% pure raw Peruvian yellow and black Maca root powder. Boosts natural endurance, athletic performance, and vitality.",
      specification: "Ingredients: 100% Raw Maca Root | Weight: 200g | Shelf Life: 24 Months"
    },
    {
      id: "PRD1005",
      sku: "DC-OE-005",
      name: "High Precision Heavy-Duty Rotary Paper Trimmer & Guillotine Cutter",
      slug: "heavy-duty-rotary-paper-trimmer-guillotine",
      category_id: "CAT01",
      category_name: "Office Equipment",
      brand: "ProCut Master",
      customer_price: 1850,
      original_price: 2400,
      seller_price: 1600,
      reseller_price: 1550,
      wholesale_price: 1400,
      wholesale_min_qty: 4,
      stock: 15,
      unit: "Piece",
      color: "Classic White & Navy",
      size: "A4/B5 Base",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
      ],
      featured: true,
      best_selling: false,
      new_product: true,
      rating: 4.6,
      reviews_count: 14,
      description: "Professional office and studio paper cutter with self-sharpening blade, magnetic guide, and alignment grids.",
      specification: "Cutting Capacity: 15 sheets (80gsm) | Base: Solid metal | Safety guard included"
    },
    {
      id: "PRD1006",
      sku: "DC-SG-006",
      name: "Wireless Mini Multimedia Bass Speaker with RGB Lighting",
      slug: "wireless-mini-multimedia-bass-speaker-rgb",
      category_id: "CAT02",
      category_name: "Smart Gadgets",
      brand: "SoundWave Pulse",
      customer_price: 650,
      original_price: 900,
      seller_price: 540,
      reseller_price: 520,
      wholesale_price: 460,
      wholesale_min_qty: 10,
      stock: 50,
      unit: "Piece",
      color: "Carbon Black, Crimson Red, Arctic White",
      size: "Compact Portable",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
      images: [
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80"
      ],
      featured: false,
      best_selling: true,
      new_product: true,
      rating: 4.7,
      reviews_count: 27,
      description: "Pocket-sized Bluetooth 5.3 portable speaker delivering rich bass, TF card support, FM radio, and dynamic RGB rhythm lights.",
      specification: "Output: 5W Subwoofer | Playtime: 6 hours | Charge: USB Type-C"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DC_CONFIG;
}
