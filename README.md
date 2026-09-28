# DREAM CART BD - GITHUB REPOSITORY & DEPLOYMENT GUIDE

**Store Name:** Dream Cart BD  
**Slogan:** "You Make."  
**Developer:** Jainal Abedin (CEO, Dream Career IT BD)  
**Developer Profile:** [https://dcitbd.github.io/Jainal-Abedin/](https://dcitbd.github.io/Jainal-Abedin/)  
**Company:** [https://dcitbd.github.io/dcitbd/](https://dcitbd.github.io/dcitbd/)  
**Address:** Chaudhari Plaza, Ground Floor, Room No-03, Paduar Bazar, Bishwa Road, Sadar South, Cumilla, Bangladesh.  
**Hotlines:** 01581703822 | 01818273838  

---

## 🚀 1-CLICK GITHUB PAGES DEPLOYMENT

This repository is pre-configured for instant **GitHub Pages** hosting with zero build steps required.

### Method A: Deploy via GitHub Web (No Terminal Needed)
1. Go to [GitHub.com](https://github.com/) and create a new public repository (e.g. `dream-cart-bd`).
2. Unzip this package and drag & drop all files (or upload via **Add file > Upload files**) and commit to the `main` branch.
3. In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
4. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`)
   - **Folder:** `/ (root)`
5. Click **Save**.
6. Within 1-2 minutes, your website will be live at:
   `https://<your-username>.github.io/dream-cart-bd/`

### Method B: Deploy via Git Terminal
```bash
# 1. Initialize git inside the project directory
git init

# 2. Add all files and commit
git add .
git commit -m "Initial commit - Dream Cart BD complete system"

# 3. Rename branch to main
git branch -M main

# 4. Link your GitHub remote repository
git remote add origin https://github.com/<YOUR-USERNAME>/dream-cart-bd.git

# 5. Push code to GitHub
git push -u origin main
```
Then enable GitHub Pages from **Settings > Pages > Branch: main > / (root)**.

---

## ⚡ CONNECTING GITHUB REPO TO CLOUDFLARE PAGES (AUTOMATIC CI/CD)
Once your code is pushed to GitHub, you can link it directly to Cloudflare Pages:
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository (`dream-cart-bd`).
4. Set build settings:
   - **Framework preset:** None (Static HTML)
   - **Build command:** (Leave empty)
   - **Build output directory:** `/` (or `public`)
5. Click **Save and Deploy**. Cloudflare will now automatically rebuild and deploy your site whenever you push changes to GitHub!

---

## 📦 SYSTEM MODULES INCLUDED
- **16 Public Pages:** `index.html` (Dynamic Category Sliders, 12 products each, Desktop 10% margins), `products.html` (120 products/page, tree filter, pagination), `product-details.html`, `cart.html`, `checkout.html` (Cumilla 90 ৳, Dhaka 110 ৳, Outside 135 ৳; Free delivery $\ge$ 2000 ৳; 5% online discount), `order-success.html`, `tracking.html`, `markets.html`, etc.
- **24 Role Authentication & Portals:** Customer, Seller, Reseller (with 3% payout fee math), and Wholesaler (with MOQ validation).
- **42 Admin Management Pages:** Complete ERP suite covering Products, Orders, Vouchers, Incomplete Orders, Customers, Couriers, Finance, Reviews, Banners, and Settings.
- **Backend & Database:** `backend/` contains Google Apps Script files with automated 41-tab database provisioning.
- **Assets:** Fully responsive dark/light mode (`assets/css/`) and client API layer (`assets/js/`).
