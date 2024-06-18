export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/candiature-form',
    unAuthenticatedEntryPath: '/candiature-form',
    tourPath: '',
    locale: 'en',
    enableMock: false,
}

export default appConfig
