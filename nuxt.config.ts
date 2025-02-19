export default defineNuxtConfig({
  compatibilityDate: '2025-02-04',
  ssr: false,
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title:
          "Lottery Application",
    },
  },
  css: ["~/assets/scss/index.scss"],
  build: {
    transpile: ["mdb-vue-ui-kit","vuetify"],
  },
  modules: [
    'nuxt-auth-utils',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt','@element-plus/nuxt'
  ],
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBaseUrl: 'http://localhost:3000/api/'
    },
    private: {
      apiURL: process.env.NUXT_API_URL || 'http://localhost:3000/api/',
    }
  },
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  router: {
    middleware: ['auth','guest']
  },
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  serverHandlers: [
    {
      handler: '~/server/middleware/axios.ts',
    },
  ],

});