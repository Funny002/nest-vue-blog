/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    cli: './cli/index.ts',
    index: './src/main.ts',
  },
  target: 'node',
  externals: {
    'sharp': 'commonjs sharp',
  },
  // ts文件的处理
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
        exclude: /node_modules/,
      },
    ],
  },
  // 打包后的文件名称以及位置
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@libs': path.resolve(__dirname, 'libs'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@config': path.resolve(__dirname, 'config'),
      '@mysql': path.resolve(__dirname, 'mysql'),
      '@middleware': path.resolve(__dirname, 'middleware'),
      '@interceptor': path.resolve(__dirname, 'interceptor'),
    },
  },
  plugins: [
    // 需要进行忽略的插件
    new webpack.IgnorePlugin({
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/microservices',
          '@nestjs/microservices/microservices-module',
          '@nestjs/websockets/socket-module',
          'cache-manager',
          'class-validator',
          'class-transformer',
          'class-transformer/storage',
        ];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource, {
            paths: [process.cwd()],
          });
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
