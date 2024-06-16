// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxt/image', '@nuxtjs/tailwindcss', "shadcn-nuxt", "nuxt-icon", '@pinia/nuxt', ['@vee-validate/nuxt',
        {
            autoImports: true,
        }
    ],
    ],
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
    runtimeConfig: {
        public: {
            APP_WRITE_ID: JSON.stringify(process.env.APP_WRITE_ID),
            DB_ID: JSON.stringify(process.env.DB_ID),
            COLLECTION_CUSTOMERS: JSON.stringify(process.env.COLLECTION_CUSTOMERS),
            COLLECTION_COMMENTS: JSON.stringify(process.env.COLLECTION_COMMENTS),
            COLLECTION_DEALS: JSON.stringify(process.env.COLLECTION_DEALS),
            STORAGE_ID: JSON.stringify(process.env.STORAGE_ID),
        }
    }
})