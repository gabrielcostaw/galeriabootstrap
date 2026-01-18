const modoDev = process.env.NODE_ENV !== 'production';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './src/index.js',
  devServer: {
  static: path.resolve(__dirname, 'build'),
  port: 9000,
  hot: true,
  client: {
    overlay: false // Isso desativa COMPLETAMENTE a tela preta para erros e avisos
  }
},
  optimization: {
    minimizer: [
      '...', // Mantém o minimizador de JS padrão (Terser)
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
    clean: true, // Garante que a pasta build seja limpa a cada execução
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'estilo.css' }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          context: 'src',
          from: '**/*.html', 
          to: '[path][name][ext]',
          noErrorOnMissing: true 
        },
        { 
          context: 'src',
          from: 'imgs/**/*', 
          to: 'imgs/[name][ext]',
          noErrorOnMissing: true 
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          // Mantém as imagens organizadas na pasta imgs do build
          filename: 'imgs/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ],
  },
};