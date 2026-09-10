const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
module.exports = (phase) => ({
  reactStrictMode: true,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }

    return config
  },
})
