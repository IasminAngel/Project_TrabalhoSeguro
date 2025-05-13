$(document).ready(function () {
  $("#mobile_btn").on("click", function () {
    $("#mobile_menu").toggleClass("active");
    $("#mobile_btn").find("i").toggleClass("fa-x");
  });

  const sections = $("section");
  const navItems = $(".nav-item");

  $(window).on("scroll", function () {
    const header = $("header");
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    let activeSectionIndex = 0;

    if (scrollPosition <= 0) {
      header.css("box-shadow", "none");
    } else {
      header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1");
    }

    sections.each(function (i) {
      const section = $(this);
      const sectionTop = section.offset().top - 80;
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i;
        return false;
      }
    });

    navItems.removeClass("active");
    $(navItems[activeSectionIndex]).addClass("active");
  });

  ScrollReveal().clean(".reveal"); // Resetar o ScrollReveal

  ScrollReveal().reveal("#cta", {
    origin: "left",
    duration: 1000,
    distance: "20%",
    delay: 200,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#dish", {
    origin: "left",
    duration: 1000,
    distance: "20%",
    delay: 300,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#testimonial_chef", {
    origin: "right",
    duration: 1000,
    distance: "20%",
    delay: 400,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal("#planos-container", {
    origin: "left",
    duration: 1000,
    distance: "20%",
    delay: 500,
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".feedback", {
    origin: "right",
    duration: 1000,
    distance: "20%",
    delay: 600,
    easing: "ease-in-out",
  });
});