# DREAM CART BD - COMPLETE E-COMMERCE & MULTI-PORTAL ENTERPRISE PLATFORM
**Slogan:** "You Make."  
**Developer:** Jainal Abedin (CEO, Dream Career IT BD)  
**Developer Profile:** [https://dcitbd.github.io/Jainal-Abedin/](https://dcitbd.github.io/Jainal-Abedin/)  
**Company Website:** [https://dcitbd.github.io/dcitbd/](https://dcitbd.github.io/dcitbd/)  
**Store Location:** Chaudhari Plaza, Ground Floor, Room No-03, Paduar Bazar, Bishwa Road, Sadar South, Cumilla, Bangladesh.  
**Hotlines:** 01581703822 | 01818273838  

---

## 1. SYSTEM ARCHITECTURE
The system operates with a high-performance, secure, multi-tier decoupled architecture:
```
[Browser Client] 
       ↓ HTTPS
[Cloudflare Workers Static Assets + API Reverse Proxy]
       ↓ Authenticated HTTPS (Secret Header)
[Google Apps Script Web App (API & Concurrency Engine)]
       ↓ LockService / CacheService
[One New Google Spreadsheet (41 Dedicated Database Tabs)] 
       + 
[Google Drive Storage (Products, Brands, Categories, Settings Folders)]
```

### Key Security & Architectural Principles:
1. **Zero Client Secret Exposure:** The frontend never connects to Google Spreadsheets or Drive credentials directly.
2. **Authoritative Server Pricing:** Order totals, product prices, discounts, and commissions are recalculated on the Apps Script backend. Client prices are never blindly trusted.
3. **Concurrency Control:** `LockService.getScriptLock()` prevents race conditions during checkout and inventory deductions.
4. **Idempotent Transactions:** Prevents duplicate order placement.

---

## 2. REPOSITORY & FOLDER STRUCTURE
```
.
├── index.html                   # Main Storefront with Category Sliders
├── products.html                # 120 Products/Page with Tree Filter & Pagination
├── product-details.html         # Rich Gallery, Variations & WhatsApp Order
├── cart.html                    # Real-time Shopping Cart & Summary
├── checkout.html                # Deterministic Delivery Classifier & 5% Discount
├── order-success.html           # A5 Printable Invoice Voucher
├── tracking.html                # Dual-Search (ID/Phone) Visual Timeline
├── favorites.html               # Persistent Wishlist
├── markets.html                 # 11 Official Market Channels (Daraz, Bikroy, etc.)
├── offers.html                  # Flash Sales with Live Countdown
├── terms.html & privacy.html    # Legal & Compliance Policies
├── contact.html & 404.html      # Customer Support & Error Handling
│
├── customer-*.html              # Customer Login, Register, OTP, Reset, Dashboard
├── seller-*.html                # Seller Onboarding, Shop Approval, Dashboard
├── reseller-*.html              # Reseller Catalog, Commission, Payout (3% Fee)
├── wholesaler-*.html            # Wholesale Catalog, MOQ Enforcement, Dashboard
├── admin-*.html (42 Pages)      # Complete Enterprise ERP Management Suite
│
├── assets/
│   ├── css/
│   │   ├── app.css              # Dark/Light Mode Variables, Glassmorphism, Theme
│   │   └── admin.css            # SaaS Dashboard Layout, Data Tables, Modals
│   └── js/
│       ├── config.js            # Central Business Rules, Fees, Delivery Zones
│       ├── api.js               # Unified API Client with Resilient Fallback Engine
│       ├── app.js               # Core UI Controllers, Cart Badges, Search
│       └── admin.js             # Admin Session Guard, CSV Export, Data Tables
│
├── backend/
│   ├── Code.gs                  # doGet / doPost Router & JSON Response Wrapper
│   ├── Config.gs                # 41 Tab Schemas & setupDatabase() Provisioner
│   ├── Auth.gs                  # SHA-256 Passwords, Tokens & OTP Engine
│   ├── Products.gs              # Product CRUD, Stock Checker, Bulk Upload
│   ├── Orders.gs                # Atomic Order Creation & Email Notifications
│   ├── Payments.gs              # Payment Verification & 3% Reseller Fee Math
│   └── Reports.gs               # Sales, Costs, Gross Margin & Buying Summaries
│
├── worker/
│   └── index.js                 # Cloudflare Worker API Proxy & Asset Handler
├── wrangler.toml                # Cloudflare Worker Configuration
└── README.md                    # Master Documentation & Setup Guide
```

---

## 3. BUSINESS PRICING & LOGIC RULES
- **Delivery Charges:**
  - Cumilla: `৳ 90`
  - Dhaka: `৳ 110`
  - Outside: `৳ 135`
- **Free Delivery:** Subtotal $\ge$ `৳ 2,000` receives 100% free delivery (crossed-out fee).
- **Online Payment Discount:** 5% instant discount on subtotal for bKash, Nagad, Rocket, or Bank Transfer.
- **Reseller Commission Formula:**
  $$	ext{Commission} = (	ext{Customer Selling Price} - 	ext{Reseller Price}) 	imes 	ext{Quantity}$$
- **Reseller Payout Fee:** 3% deducted on withdrawal requests.
- **Wholesale Rule:** Orders require meeting the specific Wholesale Minimum Order Quantity (`Wholesale_Min_Order_Qty`).
- **Low Stock Threshold:** Default is 5 units.

---

## 4. ONE NEW GOOGLE SPREADSHEET (41 TABS)
The backend provisions and manages the following 41 tabs automatically via `setupDatabase()`:
1. `01_Settings`
2. `02_Users`
3. `03_Customers`
4. `04_Sellers`
5. `05_Resellers`
6. `06_Wholesalers`
7. `07_AdminWorkers`
8. `08_Roles`
9. `09_Permissions`
10. `10_Products`
11. `11_ProductImages`
12. `12_Categories`
13. `13_Brands`
14. `14_Attributes`
15. `15_Banners`
16. `16_LandingPages`
17. `17_Orders`
18. `18_OrderItems`
19. `19_IncompleteOrders`
20. `20_ReturnOrders`
21. `21_Payments`
22. `22_Carts`
23. `23_Favorites`
24. `24_Reviews`
25. `25_CommissionLedger`
26. `26_PayoutRequests`
27. `27_Buying`
28. `28_Invest`
29. `29_Costs`
30. `30_Couriers`
31. `31_Shipments`
32. `32_Visitors`
33. `33_Notifications`
34. `34_PasswordResets`
35. `35_OTP`
36. `36_Sessions`
37. `37_AuditLogs`
38. `38_Offers`
39. `39_Markets`
40. `40_SiteNotices`
41. `41_Reports`

---

## 5. GOOGLE APPS SCRIPT DEPLOYMENT
1. Create a brand-new Google Spreadsheet in your Google account.
2. Navigate to **Extensions > Apps Script**.
3. Create script files corresponding to `backend/*.gs` and paste the provided code.
4. In `Config.gs`, run the `setupDatabase()` function once to automatically create all 41 sheets with styled header rows, default business settings, and the initial Super Admin account (`jainal.dcitbd@gmail.com`).
5. Click **Deploy > New Deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the resulting Web App URL (e.g., `https://script.google.com/macros/s/.../exec`).

---

## 6. CLOUDFLARE WORKER & GITHUB DEPLOYMENT
1. Push this repository to your GitHub account.
2. In `wrangler.toml`, set:
   ```toml
   [vars]
   GOOGLE_APPS_SCRIPT_URL = "<YOUR_APPS_SCRIPT_WEB_APP_URL>"
   GOOGLE_API_SECRET = "<YOUR_SECURE_TOKEN>"
   ```
3. Deploy to Cloudflare Workers via Wrangler CLI or Cloudflare Dashboard:
   ```bash
   npx wrangler deploy
   ```
4. Workers Static Assets will serve the entire frontend at lightning speed while `/api/*` requests will be securely routed to Google Apps Script.

---

## 7. DEFAULT CREDENTIALS (FIRST LOGIN)
- **Admin Portal:** `admin-login.html`
- **Username:** `jainal.dcitbd@gmail.com`
- **Password:** `Admin@DreamCart2026`
- **Security Challenge:** $9 + 6 = 15$
*(Enforce password change after initial deployment from the admin settings page)*

---
Developed by **Jainal Abedin**, CEO of **Dream Career IT BD** for **Dream Cart BD**.
