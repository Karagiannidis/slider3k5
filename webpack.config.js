const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'slider3k5.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
       {
        test: /\.(sa|sc|c)ss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
              }, 
            {
                loader: "css-loader",
            },
            {
                loader: "postcss-loader"
            },
            {
                loader: 'sass-loader',
                options: {
                implementation: require('sass'),
                },
            },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(gif|ico|png|jpe?g|svg)$/i,
        use: [
          'file-loader?name=/images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 85
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.75, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 85
              }
            }
          },
        ],
      }
     ],     
   },
   plugins: [
    new MiniCssExtractPlugin({
      filename: "slider3k5.css"
    })
  
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          keep_fnames: true,
        }
      }),
    ],
  },
  
};