import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@vite-pwa/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  pwa: {
    // 指定 PWA 的範圍和基本路徑
    scope: '/PWA-Simple-Map/',
    base: '/PWA-Simple-Map/',
    // 控制 PWA 的安裝和註冊行為
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    // Web Manifest 的配置，包括應用程式的名稱、圖標、顏色等
    manifest: {
      name: 'World Map',
      short_name: 'World Map',
      description: 'World Map made with openlayers',
      theme_color: "#1867c0",
      background_color: "#1867c0",
      icons: [
        {
          src: 'street-map.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        }
      ],
    },
    // 目的是將 Web Manifest 的註冊控制交給開發者，而不是由 PWA 插件自動處理
    registerWebManifestInRouteRules: true,
    // 生成 Service Worker 的庫，這裡指定了一些關於 Service Worker 行為的配置，例如快取策略和網路請求的處理
    workbox: {
      // 指定當使用者在離線狀態下訪問不在 cache 中的頁面時的回退策略
      navigateFallback: undefined,
      // Service Worker 啟動時清理舊的快取。這有助於確保用戶始終獲取到最新版本的應用程式內容。
      cleanupOutdatedCaches: true,
      // 定義了需要被緩存的檔案模式。
      globPatterns: ['**/*.{json,ico,svg,ttf,woff,css,scss,js,html,txt,jpg,png,woff2,mjs,otf,ani,vue}'],
      // 定義了運行時快取的規則
      runtimeCaching: [
        // 當有與根路徑匹配的請求時，Service Worker 會優先使用網路請求，如果網路請求失敗，則使用緩存的資源
        {
          urlPattern: "/PWA-Simple-Map/*",
          handler: 'NetworkFirst',
        },
      ],
    },
    // 客戶端配置
    client: {
      // 是否禁用安裝提示
      installPrompt: false,
      // Service Worker 周期性檢查更新的時間 (秒)
      periodicSyncForUpdates: 20,
    },
    // 開發端配置
    devOptions: {
      // 此選項啟用或禁用 PWA 開發選項
      enabled: true,
      // 控制是否抑制 PWA 開發過程中生成的警告消息 
      suppressWarnings: false,
      // 定義當使用者訪問未緩存頁面時導向的 URL
      navigateFallback: 'index.html',
      type: 'module',
    }
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Simple-Map/' : '/',
    buildAssetsDir: '/static/'
  },
})