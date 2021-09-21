const PROXY_CONFIG = [
    {
        context: ['/server'],
        target: 'https://minhagaleria.herokuapp.com',
        secure: true,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/server': '' }
    }
];

module.exports = PROXY_CONFIG;
