document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", function () {
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.style.display = "none";
      }
    });
  });