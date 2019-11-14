module.exports = {
    chainWebpack: (config) => {
        // A, remove the plugin
        config.plugins.delete('prefetch');
    },
};
