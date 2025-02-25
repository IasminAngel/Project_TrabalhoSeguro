// Aguarda o carregamento completo do DOM antes de executar qualquer código JavaScript
$(document).ready(function () {

  // Ao clicar no botão mobile, ativa/desativa o menu mobile e altera o ícone
  $("#mobile_btn").on("click", function () {
    // Alterna a classe "active" no menu mobile para mostrar/esconder
    $("#mobile_menu").toggleClass("active");
    // Alterna o ícone para "fa-x" quando o menu é ativo
    $("#mobile_btn").find("i").toggleClass("fa-x");
  });

  // Seleciona todos os elementos <section> e os itens de navegação
  const sections = $("section");
  const navItems = $(".nav-item");

  // Detecta o evento de rolagem na janela
  $(window).on("scroll", function () {
    const header = $("header"); // Seleciona o cabeçalho
    const scrollPosition = $(window).scrollTop() - header.outerHeight(); // Calcula a posição da rolagem ajustada pelo tamanho do cabeçalho

    let activeSectionIndex = 0; // Índice da seção ativa, começa com a primeira

    // Aplica ou remove sombra no cabeçalho dependendo da posição de rolagem
    if (scrollPosition <= 0) {
      header.css("box-shadow", "none"); // Remove a sombra
    } else {
      header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1"); // Adiciona uma sombra suave
    }

    // Percorre cada seção para verificar se está dentro da área de visualização
    sections.each(function (i) {
      const section = $(this); // Seleciona a seção atual
      const sectionTop = section.offset().top - 100; // Posição da seção no topo menos 100px
      const sectionBottom = sectionTop + section.outerHeight(); // Posição do final da seção

      // Verifica se a posição de rolagem está dentro da seção atual
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i; // Atualiza o índice da seção ativa
        return false; // Interrompe o loop ao encontrar a seção ativa
      }
    });

    // Remove a classe "active" de todos os itens de navegação
    navItems.removeClass("active");
    // Adiciona a classe "active" no item de navegação correspondente à seção ativa
    $(navItems[activeSectionIndex]).addClass("active");
  });

  // Usa a biblioteca ScrollReveal para animar elementos ao aparecer na tela

  // Revela o elemento com id #cta vindo da esquerda com duração de 2 segundos
  ScrollReveal().reveal("#cta", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  // Revela o elemento com id #dish vindo da esquerda com duração de 2 segundos
  ScrollReveal().reveal("#dish", {
    origin: "left",
    duration: 2000,
    distance: "20%",
  });

  // Revela o elemento com id #testimonial_chef vindo da esquerda com duração de 1 segundo
  ScrollReveal().reveal("#testimonial_chef", {
    origin: "left",
    duration: 1000,
    distance: "20%",
  });

  // Revela o elemento com a classe .feedback vindo da direita com duração de 1 segundo
  ScrollReveal().reveal(".feedback", {
    origin: "right",
    duration: 1000,
    distance: "20%",
  });
});
