// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@pinia/nuxt",
    "@formkit/nuxt",
    "@nuxtjs/supabase"
  ],
  googleFonts: {
    families: {
      'Roboto': true,
      'Pacifico': true
    }
  },
  supabase: {
    redirect: false
  },
  postcss: {
    plugins: {
      cssnano: false 
    }
  }
})