export const paths = {
  css: {
    base: "/assets/css",
    files: {
      avaliacao: "avaliacao.css",
      principal: "style.css",
      header: "header.css",
      footer: "footer.css",
      home: "home.css",
      pagament: "pagament.css",
      biografia: "biografia.css",
      cartao: "cartao.css",
      login: "/login/login.css",
      registro: "/login/cadastro.css",
      senha: "/login/senha.css",
      selecao: "/aplicacao/selecao.css",
      formularios: "/aplicacao/formularios.css",
      acidente_incidente: "/aplicacao/acidente_incidente.css",
      navbar: "/components/navbar/navbar.css",
      empresaUm: "style_cadastro_empresa.css",
      empresaDois: "style_cadastro_empresa_pdois.css",
      option: "/styles_option.css",
      download: "/style_download.css",
      check: "/style_check.css",
      setor: "/style_adicionar_setor.css",
      epi: "/style_epis.css",
      funcionarios: "/style_funcionarios_geral.css",
      setor_func: "/style_funcionarios_setor.css",
      epis_view: "/style_epis_geral.css",
      epi_especifico: "/style_epi_especifico.css",
    },
  },
  js: {
    base: "/assets/js",
    files: {
      main: "script.js",
      effects: "/utils/effects.js",
      login: "/pages/script_login.js",
      avaliacao: "/pages/script_avaliacao.js",
      registro: "/pages/script_cadastro.js",
      senha: "/pages/script_senha.js",
      acidente_incidente: "/pages/script_form.js",
      shows: "/utils/alerts.js",
      navbar: "/utils/navbar.js",
      cartao: "/core/pay.js",
      epi: "/pages/script_epi.js",
      setor: "pages/api.js"
    },
  },
  imgs: {
    base: "/assets/imgs",
    logos: {
      main: "Logotipo_TS.png",
      alternative: "Logotipo_TS_2.png",
      background: "background.png",
      setores: "setores.png",
      verificar: "verificar.png",
      registros: "registros.png",
      funcionarios: "funcionarios.png",
      logo: "logoTrabalhoseguro.png",
      fundo: "FundoProfile.jpg"
    },
  },
  icons: {
    base: "/assets/icons",
    files: {
      back: "box-arrow-in-left.svg",
      star: "star-fill.svg",
      person: "person-lines-fill.svg",
      build: "building.svg",
      entry: "box-arrow-in-left.svg",
      create: "box-arrow-in-right.svg",
      key: "key-fill.svg",
      card: "credit-card.svg",
      left: "arrow-left.svg"
    },
  },
};

export const frontendPaths = {
  css: (fileKey) => {
    const file = paths.css.files[fileKey];
    return file
      ? `<link rel="stylesheet" href="${paths.css.base}/${file}">`
      : "";
  },
  js: (fileKey) => {
    const file = paths.js.files[fileKey];
    return file ? `<script src="${paths.js.base}/${file}"></script>` : "";
  },
  img: (type, key) => {
    const filePath = paths.imgs[type]?.[key];
    return filePath ? `${paths.imgs.base}/${filePath}` : '';
  },
  icon: (name) => {
    const file = paths.icons.files[name];
    return file ? `${paths.icons.base}/${file}` : '';
  }
};
