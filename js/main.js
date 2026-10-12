import { initTheme } from "./theme.js";
import { initLoading } from "./loading.js";
import { initProducts } from "./products.js";
import { initSearch } from "./search.js";
import { initSlider } from "./slider.js";
import { initZiChatCharacter } from "./zichat-character.js";

// ==========================================
// 🧭 Bottom Navigation Module
// ==========================================
function initBottomNav() {
  const zichatBtn = document.getElementById("bottomNavZichat");

  if (zichatBtn) {
    zichatBtn.addEventListener("click", (e) => {
      e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
      window.location.href = "chat.html"; // انتقال به صفحه چت
    });
  }

  console.log("🧭 Bottom nav initialized");
}

// ==========================================
// 🚀 App Initialization
// ==========================================
async function initApp() {
  console.log("🎨 ZiSun - Initializing...");

  const startTime = performance.now();

  // لیست ماژول‌ها
  const modules = [
    { name: "Loading", init: initLoading, critical: true },
    { name: "Theme", init: initTheme, critical: true },
    { name: "Slider", init: initSlider, critical: false },
    { name: "Products", init: initProducts, critical: true },
    { name: "Search", init: initSearch, critical: false },
    { name: "ZiChatCharacter", init: initZiChatCharacter, critical: false },
    { name: "BottomNav", init: initBottomNav, critical: false }, // ← ماژول جدید اضافه شد
  ];

  // اجرای هر ماژول با مدیریت خطا
  for (const module of modules) {
    try {
      await module.init();
      console.log(`✅ ${module.name} initialized`);
    } catch (error) {
      console.error(`❌ Failed to initialize ${module.name}:`, error);

      if (module.critical) {
        console.error(`⚠️ Critical module "${module.name}" failed!`);
      }
    }
  }

  // نمایش زمان کل راه‌اندازی
  const endTime = performance.now();
  const initTime = (endTime - startTime).toFixed(2);
  console.log(`🚀 All modules initialized in ${initTime}ms`);
}

// شروع برنامه
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// پاکسازی هنگام بستن صفحه
window.addEventListener("beforeunload", () => {
  console.log("🧹 Cleaning up...");
});
