const withCSS = require('@zeit/next-css');
const withSASS = require('@zeit/next-sass');
const withSourceMaps = require('@zeit/next-source-maps');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = withSourceMaps(
  withSASS(
    withCSS({
      // eslint-disable-next-line no-unused-vars
      webpack(config, { buildId, dev, isServer, defaultLoaders }) {
        config.module.rules.push(
          {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: dev ? 256 : 8192,
                  publicPath: '/_next/static/images/',
                  outputPath: 'static/images/',
                  name: '[name]-[hash].[ext]',
                },
              },
            ],
          },
        );

        if (!dev && !isServer) {
          config.plugins.push(new OptimizeJsPlugin(), new ManifestPlugin());
          return config;
        }

        return config;
      },
    }),
  ),
);
