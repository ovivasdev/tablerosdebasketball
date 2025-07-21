
async function includeHTML(selector, file) {
  const el = document.querySelector(selector);
  if (el) {
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  includeHTML("header", "/components/header.html");
  includeHTML("footer", "/components/footer.html");
  includeHTML("div#preloader-container", "/components/preloader.html");
});
