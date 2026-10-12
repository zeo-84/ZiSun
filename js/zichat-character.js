/**
 * 🤖 ZiChat Character Module
 * کاراکتر انیمیشنی با متن تایپ‌شونده
 */

export function initZiChatCharacter() {
  const typingElement = document.getElementById("zichatTypingText");
  const zichatCharacter = document.getElementById("zichatCharacter");
  const zichatOpenBtn = document.getElementById("zichatOpenBtn");

  if (!typingElement) {
    console.log("⚠️ ZiChat character not found");
    return;
  }

  // متن تایپ‌شونده
  const typingText = "سلام! من زی‌چت هستم ✨ هر سوالی داری از من بپرس!";
  let typingIndex = 0;
  let isTyping = true;

  // انیمیشن تایپ
  function typeText() {
    if (!isTyping) return;

    if (typingIndex < typingText.length) {
      typingElement.textContent += typingText.charAt(typingIndex);
      typingIndex++;

      // سرعت تایپ متغیر برای طبیعی‌تر شدن
      const delay = typingText.charAt(typingIndex - 1) === " " ? 80 : 50;
      setTimeout(typeText, delay);
    } else {
      // بعد از اتمام تایپ، 3 ثانیه صبر کن بعد پاک کن و دوباره تایپ کن
      setTimeout(() => {
        if (isTyping) {
          typingElement.textContent = "";
          typingIndex = 0;
          typeText();
        }
      }, 3000);
    }
  }

  // شروع تایپ بعد از 1 ثانیه
  setTimeout(typeText, 1000);

  // کلیک روی کاراکتر یا دکمه
  function handleOpenChat() {
    // فعلاً فقط لاگ می‌زنیم، بعداً صفحه چت را اضافه می‌کنیم
    console.log("💬 Opening ZiChat modal...");

    // انیمیشن کلیک
    zichatCharacter.style.animation = "none";
    setTimeout(() => {
      zichatCharacter.style.animation = "";
    }, 100);
  }

  if (zichatCharacter) {
    zichatCharacter.addEventListener("click", handleOpenChat);
  }

  if (zichatOpenBtn) {
    zichatOpenBtn.addEventListener("click", handleOpenChat);
  }

  // توقف تایپ وقتی کاربر hover می‌کنه
  if (zichatCharacter) {
    zichatCharacter.addEventListener("mouseenter", () => {
      isTyping = false;
    });

    zichatCharacter.addEventListener("mouseleave", () => {
      isTyping = true;
      if (typingIndex >= typingText.length) {
        typingElement.textContent = "";
        typingIndex = 0;
        typeText();
      }
    });
  }
  // باز کردن صفحه چت
  function openChatPage() {
    window.location.href = "chat.html";
  }

  if (zichatOpenBtn) {
    zichatOpenBtn.addEventListener("click", openChatPage);
  }

  if (zichatCharacter) {
    zichatCharacter.addEventListener("click", openChatPage);
  }

  console.log("🤖 ZiChat character initialized");
}
