/**
 * DREAM CART BD - Core Frontend Interactions & UI Controllers
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLoader();
  updateLiveCartBadges();
  initGlobalSearch();
  initDualCallModal();
});

// 1. Theme Management (Default Dark Mode)
function initTheme() {
  const savedTheme = localStorage.getItem("dc_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("dc_theme", next);
      updateThemeIcons(next);
      showToast(`থিম পরিবর্তন করা হয়েছে: ${next === 'dark' ? 'ডার্ক মোড' : 'লাইট মোড'}`, "info");
    });
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll(".theme-toggle-btn i").forEach(icon => {
    if (theme === "dark") {
      icon.className = "bi bi-sun-fill text-warning";
    } else {
      icon.className = "bi bi-moon-stars-fill text-primary";
    }
  });
}

// 2. Global Loader
function initLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 350);
  }
}

// 3. Cart & Wishlist Badge Sync
function updateLiveCartBadges() {
  const cart = api.getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

window.addEventListener("dc_cart_updated", updateLiveCartBadges);

// 4. Global Search Autocomplete
function initGlobalSearch() {
  const searchInputs = document.querySelectorAll(".header-search-input");
  searchInputs.forEach(input => {
    const wrap = input.closest(".header-search-wrap");
    if (!wrap) return;

    let dropdown = wrap.querySelector(".search-suggestions-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.className = "search-suggestions-dropdown";
      wrap.appendChild(dropdown);
    }

    input.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      const products = DC_CONFIG.SAMPLE_PRODUCTS;
      const matches = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div class="p-3 text-center text-muted small">কোনো পণ্য পাওয়া যায়নি</div>`;
      } else {
        dropdown.innerHTML = matches.map(m => `
          <a href="product-details.html?id=${m.id}" class="search-suggestion-item">
            <img src="${m.image}" alt="${m.name}">
            <div class="flex-grow-1 overflow-hidden">
              <div class="text-truncate fw-bold small">${m.name}</div>
              <div class="text-primary small fw-bold">৳${api.getProductPriceForUser(m)}</div>
            </div>
          </a>
        `).join("");
      }
      dropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  });
}

// 5. Dual Phone Call Popup Handler
function initDualCallModal() {
  const callBtns = document.querySelectorAll(".btn-open-call-modal");
  callBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let modalEl = document.getElementById("phoneCallModal");
      if (!modalEl) {
        modalEl = document.createElement("div");
        modalEl.id = "phoneCallModal";
        modalEl.className = "modal fade";
        modalEl.tabIndex = -1;
        modalEl.innerHTML = `
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-card border-secondary">
              <div class="modal-header border-bottom border-secondary">
                <h5 class="modal-title fw-bold"><i class="bi bi-telephone-outbound text-primary me-2"></i>সরাসরি কল করুন</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body phone-modal-body p-4">
                <p class="text-muted small mb-3">আমাদের হটলাইন ও অফিস নম্বরে যে কোনো তথ্যের জন্য কল করতে পারেন:</p>
                <a href="tel:+88${DC_CONFIG.PHONE_1}" class="call-link-card">
                  <i class="bi bi-telephone-fill text-success fs-4"></i>
                  <div>
                    <div class="fw-bold">${DC_CONFIG.PHONE_1}</div>
                    <div class="text-muted small">প্রধান হটলাইন ও বিকাশ মার্চেন্ট</div>
                  </div>
                </a>
                <a href="tel:+88${DC_CONFIG.PHONE_2}" class="call-link-card">
                  <i class="bi bi-telephone-fill text-primary fs-4"></i>
                  <div>
                    <div class="fw-bold">${DC_CONFIG.PHONE_2}</div>
                    <div class="text-muted small">কাস্টমার কেয়ার ও অর্ডার সাপোর্ট</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modalEl);
      }
      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    });
  });
}

// 6. Universal Toast Notification
function showToast(message, type = "info") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const icons = {
    success: "bi-check-circle-fill text-success",
    error: "bi-exclamation-triangle-fill text-danger",
    warning: "bi-exclamation-circle-fill text-warning",
    info: "bi-info-circle-fill text-info"
  };

  const toast = document.createElement("div");
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info} fs-5"></i>
    <span class="small fw-semibold flex-grow-1">${message}</span>
    <button class="btn-close btn-close-white ms-2" style="font-size: 10px;" onclick="this.parentElement.remove()"></button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4000);
}

// 7. Direct WhatsApp Order Helper
function sendWhatsAppOrder(product, qty = 1, options = {}) {
  const user = api.getCurrentUser();
  const price = api.getProductPriceForUser(product, user);
  const total = price * qty;
  
  let msg = `*নতুন অর্ডার - ${DC_CONFIG.SHOP_NAME}*\n`;
  msg += `----------------------------------\n`;
  msg += `*পণ্য:* ${product.name}\n`;
  msg += `*SKU:* ${product.sku}\n`;
  msg += `*মূল্য:* ৳${price}\n`;
  msg += `*পরিমাণ:* ${qty}\n`;
  if (options.color) msg += `*কালার:* ${options.color}\n`;
  if (options.size) msg += `*সাইজ:* ${options.size}\n`;
  msg += `*সর্বমোট:* ৳${total}\n`;
  if (user) msg += `*কাস্টমার নাম:* ${user.name} (${user.mobile})\n`;
  msg += `----------------------------------\n`;
  msg += `দয়া করে অর্ডারটি কনফার্ম করুন।`;

  const phone = DC_CONFIG.PHONE_1;
  const url = `https://wa.me/88${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
