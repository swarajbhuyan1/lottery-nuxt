export default defineNuxtConfig({
  compatibilityDate: '2025-02-04',
  ssr: false,
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title:
        "Lottery Dashboard",
    },
  },
  css: ["~/assets/scss/index.scss"],
  build: {
    transpile: ["mdb-vue-ui-kit","vuetify"],
  },
  modules: ['@pinia/nuxt'],
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],

});
