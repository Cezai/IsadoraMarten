const links = document.querySelectorAll(".footer-nav a");
let currentPath = window.location.pathname;

// corrigir home
if (currentPath === "/") {
  currentPath = "/index.html";
}

links.forEach(link => {
  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

document.getElementById("ano-atual").textContent = new Date().getFullYear();