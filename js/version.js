// version.js
const APP_VERSION = "1.1.1";

function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${href}?v=${APP_VERSION}`;
  document.head.appendChild(link);
}

function loadJS(src) {
  const script = document.createElement("script");
  script.src = `${src}?v=${APP_VERSION}`;
  document.body.appendChild(script);
}

// استفاده:
loadCSS("css/main.css");
loadCSS("css/products.css");
loadJS("js/main.js");
