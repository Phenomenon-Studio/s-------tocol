module.exports = {
    reactStrictMode: true,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        domains: [process.env.APP_ASSETS_HOSTNAME],
    },
    eslint: {
        dirs: ['src'],
    },
};
