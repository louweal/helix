export default {
  ssr: false,
  modern: "client",
  target: "static",
  router: {
    base: "/",
  },
  head: {
    title: "Helix",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Stories, reimagined",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  buildModules: ["@nuxtjs/style-resources"],

  css: ["@/assets/css/main.scss"],

  styleResources: {
    scss: [
      __dirname + "/node_modules/bootstrap/scss/_functions.scss",
      __dirname + "/assets/css/_theme.scss",
      __dirname + "/node_modules/bootstrap/scss/_variables.scss",
      __dirname + "/node_modules/bootstrap/scss/_mixins.scss",
    ],
  },

  messages: {
    error_404: "Page not found",
  },

  plugins: [
    "~/plugins/translate.js",
    "~/plugins/aos.js",
    "~/plugins/typed.js",
    "~/plugins/hashconnect.js",
  ],

  components: true,
  // buildModules: [],
  // build: {},

  generate: {
    fallback: true, // for error pages on Netlify
  },
};
