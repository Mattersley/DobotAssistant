module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CONSUMER_KEY: process.env.CONSUMER_KEY,
    NEXT_PUBLIC_CONSUMER_SECRET: process.env.CONSUMER_SECRET,
    NEXT_PUBLIC_WOO_ORDER_PATH: process.env.WOO_ORDER_PATH,
    NEXT_PUBLIC_WOO_PRODUCT_PATH: process.env.WOO_PRODUCT_PATH,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_APPLE_ID: process.env.APPLE_ID,
    NEXT_PUBLIC_APP_PASSWORD: process.env.APP_PASSWORD,
    NEXT_APP_CAL_URL: process.env.CAL_URL,
    NEXT_PUBLIC_GOOGLE_GEOCODING_KEY: process.env.GOOGLE_GEOCODING_KEY,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      resolve: {
        fallback: {
          fs: false,
        },
      },
    })
    return config
  },
}
