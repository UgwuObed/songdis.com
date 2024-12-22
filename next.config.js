module.exports = {
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      }
      return config
    },
    // Add this for ffmpeg.wasm
    headers: () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ],
  }