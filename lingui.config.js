import { defineConfig } from '@lingui/cli'

export default defineConfig({
    locales: ['en', 'vi'],
    pseudoLocale: 'pseudo',
    sourceLocale: 'en',
    fallbackLocales: {
        default: 'en'
    },
    catalogs: [
        {
            path: 'src/locales/{locale}',
            include: ['src/']
        }
    ]
})
