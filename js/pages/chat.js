/**
 * 💬 ZiChat Page Logic
 * منطق صفحه چت با امنیت و تم هماهنگ
 */

// ==========================================
// 🎨 1. Theme Synchronization
// ==========================================
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// ==========================================
// 🧩 2. Elements
// ==========================================
const chatBody = document.getElementById("chatBody");
const quickQuestionsContainer = document.getElementById("quickQuestions");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

// ==========================================
// 🛡️ 3. Security: Sanitize Input
// ==========================================
function sanitizeInput(text) {
  // حذف تگ‌های HTML
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// 🚀 4. Initialize
// ==========================================
function initChat() {
  console.log("💬 ZiChat page initialized with theme:", savedTheme);

  // لود سوالات سریع
  renderQuickQuestions();

  // Event Listeners
  chatSendBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });

  // نمایش تعداد کاراکتر باقیمانده
  chatInput.addEventListener("input", updateCharCount);

  // فوکوس روی اینپوت
  chatInput.focus();
}

// ==========================================
// 📋 5. Render Quick Questions (افقی)
// ==========================================
function renderQuickQuestions() {
  const questions = getQuickQuestions();

  questions.forEach((q) => {
    const btn = document.createElement("button");
    btn.className = "chat-question-btn";
    btn.textContent = q.question; // استفاده از textContent برای امنیت
    btn.addEventListener("click", () => handleQuickQuestion(q.id));
    quickQuestionsContainer.appendChild(btn);
  });
}

// ==========================================
//  6. Handle Quick Question Click
// ==========================================
function handleQuickQuestion(questionId) {
  const qa = getAnswerById(questionId);
  if (!qa) return;

  // اضافه کردن سوال کاربر به چت
  addUserMessage(qa.question);

  // پاسخ بات با تاخیر
  setTimeout(() => {
    addBotMessage(qa.answer);
  }, 600);
}

// ==========================================
// ⌨️ 7. Handle Send Message
// ==========================================
function handleSendMessage() {
  const rawText = chatInput.value.trim();

  // بررسی خالی بودن
  if (!rawText) return;

  // بررسی طول (حداکثر 50 کاراکتر)
  if (rawText.length > 50) {
    addBotMessage(
      "️ پیام شما خیلی طولانی است. لطفاً حداکثر 50 کاراکتر وارد کنید."
    );
    chatInput.value = "";
    return;
  }

  // Sanitize کردن ورودی (جلوگیری از XSS)
  const text = sanitizeInput(rawText);

  // اضافه کردن پیام کاربر
  addUserMessage(text);
  chatInput.value = "";

  // پیدا کردن جواب هوشمند
  setTimeout(() => {
    const smartAnswer = getSmartAnswer(rawText); // از rawText برای مقایسه استفاده کن

    if (smartAnswer) {
      addBotMessage(smartAnswer);
    } else {
      const defaultAnswer =
        "ممنون از سوالت! 😊\n\nبرای پاسخ دقیق‌تر، لطفاً با پشتیبانی ما در واتس‌اپ یا تلگرام در تماس باش.\n\nهمکاران ما آماده راهنماییت هستن! 💬";
      addBotMessage(defaultAnswer);
    }
  }, 800);
}

// ==========================================
// 🔢 8. Update Character Count
// ==========================================
function updateCharCount() {
  const remaining = 50 - chatInput.value.length;
  if (remaining < 10) {
    chatInput.style.borderColor = remaining > 0 ? "#f59e0b" : "#ef4444";
  } else {
    chatInput.style.borderColor = "";
  }
}

// ==========================================
//  9. Add Messages to DOM
// ==========================================
function addUserMessage(text) {
  const messageDiv = createMessageElement(text, "user");
  chatBody.appendChild(messageDiv);
  scrollToBottom();
}

function addBotMessage(text) {
  const messageDiv = createMessageElement(text, "bot");
  chatBody.appendChild(messageDiv);
  scrollToBottom();
}

function createMessageElement(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}-message`;

  const time = new Date().toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ✅ آواتار بات (عکس + fallback)
  const botAvatar = `
        <img src="assets/images/zichat.webp" alt="زی‌چت"
             onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\\'font-size:20px;\\'></span>'">
    `;

  // ✅ آواتار کاربر (SVG آیکون)
  const userAvatar = `
        <svg class="user-avatar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    `;

  const avatarHtml = sender === "bot" ? botAvatar : userAvatar;

  messageDiv.innerHTML = `
        <div class="chat-message__avatar">
            ${avatarHtml}
        </div>
        <div class="chat-message__content">
            <p style="white-space: pre-line; margin: 0;">${text}</p>
            <span class="chat-message__time">${time}</span>
        </div>
    `;

  return messageDiv;
}
function scrollToBottom() {
  chatBody.scrollTo({
    top: chatBody.scrollHeight,
    behavior: "smooth",
  });
}

// ==========================================
// ▶️ 10. Start App
// ==========================================
document.addEventListener("DOMContentLoaded", initChat);
