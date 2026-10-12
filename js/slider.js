/**
 * 🎠 ZiSun Swiper Slider
 */

export function initSlider() {
  const sliderElement = document.querySelector(".ziSun-slider");
  if (!sliderElement) {
    console.log("⚠️ Slider not found");
    return;
  }

  if (typeof Swiper === "undefined") {
    console.error("❌ Swiper library not loaded");
    return;
  }

  const swiper = new Swiper(".ziSun-slider", {
    effect: "slide",
    speed: 700,
    loop: true,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    keyboard: {
      enabled: true,
    },

    touchRatio: 1,
    simulateTouch: true,
  });

  console.log(" Swiper slider initialized");
}
