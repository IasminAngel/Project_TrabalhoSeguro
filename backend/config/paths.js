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
      login: "/login/login.css",
      registro: "/login/cadastro.css",
      senha: "/login/senha.css",
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
    },
  },
  imgs: {
    base: "/assets/imgs",
    logos: {
      main: "Logotipo_TS.png",
      alternative: "Logotipo_TS_2.png",
      background: "background.png",
      
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
