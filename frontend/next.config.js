const { i18n } = require('./next-i18next.config');
const buildWithDocker = process.env.DOCKER === 'true';
const isExport = process.env.NODE_ENV === 'production';
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,

  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  // output: buildWithDocker ? 'standalone' : undefined,
  // output: i18n ? undefined : 'export', 
};

if (isExport) {
  // 在使用 next export 时禁用 i18n
  nextConfig.i18n = {
    locales: ['zh'], // 设置默认语言或者其他需要的语言
    defaultLocale: 'zh',
  };
}


module.exports = nextConfig;
