const path = require('path'); // импорт. путь с node.js библ., который нам позволит указать путь к папке; 
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// здесь будут находится все свойства нашего приложения;
module.exports = {
    mode: "development", // свойство mode указывает, что прилож. находится в разработке и выходные файлы js не надо сжимать;
    entry: ['@babel/polyfill', './src/index.jsx'], // путь к файлу который будет начинать запуск с нашего приложения;
    output: { // указываем куда будет сам webpack собирать файлы;
        path: path.resolve(__dirname, "dist"),
        filename: '[name].[hash].js', // указываем куда webpack будет делать сборку всех js файлов, использ. регулярные выражения;
        publicPath: '/' // чтобы небыло проблем с хешированнием при переходи на страницы; 
    },
    plugins: [ // для сборки файлов;
        new HTMLWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin()
    ],
    module: { // для настройки стилей;
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)/,
                use: ['file-loader']
            },
            { // доб. babel;
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            { // доб. babel для react;
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: { // для настройки сервера;
        port: 3000,
        historyApiFallback: true // чтобы мы могли переключаться между ссылками с пом маршрутизатора;
    },
    resolve: { // чтобы при автомат. импорте нам расширение автоматом ставил jsx;
        extensions: ['.js', '.jsx']
    }
}