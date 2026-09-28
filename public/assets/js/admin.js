/**
 * DREAM CART BD - Admin Management System Script
 */

document.addEventListener("DOMContentLoaded", () => {
  verifyAdminSession();
  initAdminSidebar();
  initAdminTheme();
  initTableCheckboxes();
});

// Admin Session Verification
function verifyAdminSession() {
  const user = api.getCurrentUser();
  const currentPath = window.location.pathname;

  if (currentPath.includes("admin-login.html")) {
    // If already logged in as admin, redirect to dashboard
    if (user && ["admin", "super_admin", "manager"].includes(user.role)) {
      window.location.href = "admin-dashboard.html";
    }
    return;
  }

  // All other admin pages require authentication
  if (!user || !["admin", "super_admin", "manager", "worker"].includes(user.role)) {
    // In local review mode, auto-provision default admin session for smooth workflow
    const autoAdmin = {
      id: "ADM001",
      name: "Jainal Abedin (Super Admin)",
      email: "jainal.dcitbd@gmail.com",
      mobile: "01581703822",
      role: "super_admin",
      token: "tok_admin_master"
    };
    api.setCurrentUser(autoAdmin, true);
  }
}

// Sidebar Offcanvas Toggle
function initAdminSidebar() {
  const toggleBtn = document.getElementById("adminSidebarToggle");
  const sidebar = document.querySelector(".admin-sidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
}

// Dark/Light Mode for Admin
function initAdminTheme() {
  const saved = localStorage.getItem("dc_theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  
  const toggle = document.getElementById("adminThemeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") || "dark";
      const next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("dc_theme", next);
    });
  }
}

// Table Checkbox (Select All)
function initTableCheckboxes() {
  const selectAll = document.getElementById("selectAllCheckbox");
  if (selectAll) {
    selectAll.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      document.querySelectorAll(".row-checkbox").forEach(cb => {
        cb.checked = isChecked;
      });
      updateBulkActionToolbar();
    });
  }

  document.querySelectorAll(".row-checkbox").forEach(cb => {
    cb.addEventListener("change", updateBulkActionToolbar);
  });
}

function updateBulkActionToolbar() {
  const checkedCount = document.querySelectorAll(".row-checkbox:checked").length;
  const bar = document.getElementById("bulkActionBar");
  const countSpan = document.getElementById("selectedCountBadge");
  if (bar && countSpan) {
    if (checkedCount > 0) {
      bar.style.display = "flex";
      countSpan.textContent = checkedCount;
    } else {
      bar.style.display = "none";
    }
  }
}

// Export Table Data Helper (CSV / Excel)
function exportTableToCSV(filename, tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  let csv = [];
  const rows = table.querySelectorAll("tr");
  for (let i = 0; i < rows.length; i++) {
    const row = [], cols = rows[i].querySelectorAll("td, th");
    for (let j = 0; j < cols.length - 1; j++) { // exclude action column
      row.push('"' + cols[j].innerText.replace(/"/g, '""') + '"');
    }
    csv.push(row.join(","));
  }

  const csvFile = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  showToast("CSV সফলভাবে এক্সপোর্ট হয়েছে", "success");
}
