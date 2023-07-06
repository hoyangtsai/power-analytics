const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const openBrowser = require('react-dev-utils/openBrowser')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')

require('dotenv').config()

const publicUrl = process.env.PUBLIC_URL || '';

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    // Where files should be sent once they are bundled
    // context: path.resolve(__dirname, 'src'),
    mode: argv.mode || 'development',
    output: {
      path: path.join(__dirname, 'public'),
      filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].bundle.js',
      chunkFilename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js',
      assetModuleFilename: '[contenthash:8][ext]',
      publicPath: publicUrl
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 3000,
      watchFiles: ['src/**/*'],
      historyApiFallback: true,
      onListening: function (devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        const addr = devServer.server.address();
        const url = addr.address === '::' ? '0.0.0.0' : addr.address;
        openBrowser(`http://${url}:${addr.port}`);
      },
    },
    module: {
      rules: [
        {
          test: /\.(jsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
              }
            },
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.module\.s(a|c)ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer']
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer']
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
          type: 'asset/resource',
        },
      ]
    },
    optimization: {
      chunkIds: 'named',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            chunks: 'initial'
          },
          antd: {
            name: 'antd',
            priority: 20,
            test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
            chunks: 'all',
          },
          echarts: {
            name: 'echarts',
            test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
            priority: 20,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            minChunks: 3, // minimum common number
            priority: 5,
            reuseExistingChunk: true
          },
          lib: {
            test(module) {
              return (
                module.size() > 160000 &&
                /node_modules[/\\]/.test(module.nameForCondition() || '')
              )
            },
            name(module) {
              const packageNameArr = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = packageNameArr ? packageNameArr[1] : '';
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `lib.${packageName.replace('@', '')}`;
            },
            priority: 15,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            toplevel: true,
            output: { ascii_only: true },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Power Analytics',
        template: './src/index.html',
        favicon: path.resolve(__dirname, 'src/assets/icon/favicon.png')
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash:8].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash:8].css'
      }),
      new ESLintPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
        'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  }
}

