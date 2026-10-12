/**
 *  Theme Synchronization Utility
 * همگام‌سازی تم بین تمام صفحات
 */

// خواندن تم از localStorage
function getSavedTheme() {
  return localStorage.getItem("theme") || "dark";
}

// اعمال تم به صفحه
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  console.log(`🎨 Theme applied: ${theme}`);
}

// تغییر تم و ذخیره در localStorage
function toggleTheme() {
  const currentTheme = getSavedTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
  return newTheme;
}

// اجرای خودکار به محض لود
(function () {
  const theme = getSavedTheme();
  applyTheme(theme);
})();

// Export برای استفاده در ماژول‌ها
export { getSavedTheme, applyTheme, toggleTheme };
