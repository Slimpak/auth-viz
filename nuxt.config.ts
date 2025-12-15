// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'CampOrganizer Auth v2',
      meta: [
        { name: 'description', content: 'Interactive Architecture Documentation' }
      ]
    }
  }
})
