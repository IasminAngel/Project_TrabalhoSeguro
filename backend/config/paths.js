export const paths = {
    css: {
      base: '/assets/css',
      files: {
        principal: 'style.css',
        header: 'header.css',
        footer: 'footer.css',
        home: 'home.css',
        pagament: 'pagament.css'
      }
    },
    js: {
      base: '/assets/js',  // Padronize para assets/js
      files: {
        main: 'script.js',
        effects: 'effects.js'  // Mova o arquivo para public/assets/js/
      }
    }
  };
  
  export const frontendPaths = {
    css: (fileKey) => {
      const file = paths.css.files[fileKey];
      return file ? `<link rel="stylesheet" href="${paths.css.base}/${file}">` : '';
    },
    js: (fileKey) => {
      const file = paths.js.files[fileKey];
      return file ? `<script src="${paths.js.base}/${file}"></script>` : '';
    }
  };