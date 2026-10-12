/**
 * 💬 ZiChat Questions Database
 * اینجا می‌تونی سوالات و جواب‌ها را ویرایش کنی
 */

const chatQuestions = [
  {
    id: "products",
    question: " محصولات شما چیه؟",
    answer:
      "ما در زیسان انواع لباس‌های سفارشی طراحی می‌کنیم:\n• پیراهن مجلسی و روزمره\n• کت و شلوار\n• بلوز و شومیز\n• دامن‌های خاص\n• لباس عروس\n\nهمه با کیفیت بالا و طراحی منحصربه‌فرد ✨",
  },
  {
    id: "size",
    question: "📏 راهنمای سایز دارید؟",
    answer:
      "بله! برای هر محصول جدول سایزبندی دقیق داریم. \n\nکافیه نام محصول رو به پشتیبانی ما پیام بدی تا جدول کامل رو برات بفرستیم 📏\n\nیا می‌تونی اندازه‌هات رو بفرستی تا ما سایز مناسب رو پیشنهاد بدیم.",
  },
  {
    id: "order",
    question: " چطور سفارش بدم؟",
    answer:
      "خیلی راحته! 😊\n\n1. از طریق واتس‌اپ، تلگرام یا اینستاگرام با ما در تماس باش\n2. عکس یا ایده‌ات رو بفرست\n3. ما راهنماییت می‌کنیم و قیمت رو می‌گیم\n4. بعد از تایید، سفارشت رو ثبت می‌کنیم 🎨",
  },
  {
    id: "shipping",
    question: " هزینه ارسال چقدره؟",
    answer:
      "هزینه ارسال بسته به شهر و وزن محصول متغیره.\n\n✅ برای سفارش‌های بالای 2 میلیون تومان، ارسال رایگان داریم!\n\nبرای اطلاع از هزینه دقیق، آدرس‌ت رو بفرست تا محاسبه کنیم.",
  },
  {
    id: "custom",
    question: "✂️ سفارش شخصی دارید؟",
    answer:
      "بله! تخصص ما طراحی لباس سفارشی است 🎨\n\nمی‌تونی:\n• عکس لباس مورد نظرت رو بفرستی\n• ایده یا طرح دستی بدی\n• حتی فقط بگی برای چه مراسمی می‌خوای\n\nما برات طراحی می‌کنیم و می‌سازیم! هر لباس یک اثر هنری منحصربه‌فرد خواهد بود ✨",
  },
  {
    id: "price",
    question: "💰 قیمت‌ها چطوره؟",
    answer:
      "قیمت محصولات بسته به:\n• نوع طراحی\n• متریال و پارچه\n• پیچیدگی دوخت\n\nمتغیره. برای استعلام قیمت، لطفاً عکس یا توضیحات محصول مورد نظرت رو به پشتیبانی بفرست تا دقیق راهنماییت کنیم 💬",
  },
  {
    id: "time",
    question: "⏰ زمان تحویل چقدره؟",
    answer:
      "زمان تحویل سفارشات:\n• سفارشات آماده: 2-3 روز کاری\n• سفارشات سفارشی: 7-14 روز کاری\n\nبرای سفارش‌های فوری با ما هماهنگ کن، سعی می‌کنیم زودتر تحویل بدیم ⚡",
  },
];

// این تابع سوالات را برای استفاده در صفحه چت آماده می‌کند
function getQuickQuestions() {
  return chatQuestions.map((q) => ({
    id: q.id,
    question: q.question,
  }));
}

// این تابع جواب سوال را بر اساس ID پیدا می‌کند
function getAnswerById(id) {
  return chatQuestions.find((q) => q.id === id);
}

// این تابع جواب هوشمند بر اساس کلمات کلیدی می‌دهد
function getSmartAnswer(userMessage) {
  const message = userMessage.toLowerCase();

  // بررسی کلمات کلیدی
  if (
    message.includes("قیمت") ||
    message.includes("هزینه") ||
    message.includes("گرون")
  ) {
    return getAnswerById("price")?.answer || null;
  }
  if (
    message.includes("زمان") ||
    message.includes("تحویل") ||
    message.includes("کی")
  ) {
    return getAnswerById("time")?.answer || null;
  }
  if (message.includes("سفارش") || message.includes("خرید")) {
    return getAnswerById("order")?.answer || null;
  }
  if (message.includes("سایز") || message.includes("اندازه")) {
    return getAnswerById("size")?.answer || null;
  }
  if (message.includes("ارسال") || message.includes("پست")) {
    return getAnswerById("shipping")?.answer || null;
  }
  if (message.includes("سفارشی") || message.includes("طرح")) {
    return getAnswerById("custom")?.answer || null;
  }
  if (message.includes("محصول") || message.includes("چی")) {
    return getAnswerById("products")?.answer || null;
  }

  return null;
}
