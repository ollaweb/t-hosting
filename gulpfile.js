"use strict"

const srcPath = 'src';
const buildPath = 'dist';
const path = {
    src: {
        html: [srcPath + '/*.html', "!" + srcPath + '/_*.html'],
        css: srcPath + '/sass/*.scss',
        js: srcPath + '/js/**/*.js',
        img: srcPath + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: srcPath + '/fonts/**/*.{woff,woff2,ttf,eot,svg,otf}',
        php: srcPath + '/*.php',
    },
    watch: {
        html: srcPath + '/**/*.html',
        css: srcPath + '/sass/**/*.scss',
        js: srcPath + '/js/**/*.js',
        img: srcPath + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: srcPath + '/fonts/**/*.{woff,woff2,ttf,eot,svg,otf}',
        php: srcPath + '/**/*.php',
    },
    build: {
        html: buildPath + '/',
        css: buildPath + '/css',
        js: buildPath + '/js',
        img: buildPath + '/img',
        fonts: buildPath + '/fonts',
        php: buildPath + '/',
    },
    clean: './' + buildPath,
}

//getting plugins
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();//upload html in browser
const plumber = require('gulp-plumber'); //catch errors
const fileInclude = require('gulp-file-include');//include html files into one
const sass = require('gulp-sass')(require('sass')); //from scss to css
const autoprefixer = require('gulp-autoprefixer'); //add autoprefixers
const groupMedia = require('gulp-group-css-media-queries'); //group all media together and at te end of the file
const cleanCSS = require('gulp-clean-css');//clean from comments and create .min file
const rename = require('gulp-rename');//save as any other name of file

const imagemin = require('gulp-imagemin');//makes img sizes smaller

const del = require('del'); //delete files
const webpack = require('webpack-stream');
const TerserPlugin = require("terser-webpack-plugin");

//Init BrowserSync
function sync() {
    browserSync.init({
        server: {
            baseDir: './' + buildPath + '/',
            serveStaticOptions: { //for multi-pages sites
                extensions: ["html"]
            }
        }
    });
}

//Copy html in dist directory
function html() {
    return src(path.src.html)
        .pipe(plumber())
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

//Making css from scss and clean and minify it
function css() {
    return src(path.src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(groupMedia())
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

//Put all JS modules into 1 file (DEVELOPER mode)
function js() {
    return src(path.src.js)
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'bundle.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

//PRODUCTION mode (also minifying the file)
function js_production() {
    return src(path.src.js)
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'bundle.min.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            },
            optimization: {
                minimize: true,
                minimizer: [new TerserPlugin()],
            },
        }))
        .pipe(dest(path.build.js))
}

//Minify img and copy to dist directory
function images() {
    return src(path.src.img)
        .pipe(imagemin())
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

//Build fonts
function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
}

//Copy php files to dist directory
function php() {
    return src(path.src.php)
        .pipe(dest(path.build.php))
        .pipe(browserSync.stream())
}

//Delete files before export new ones
function clean() {
    return del(path.clean)
}

//Wacth the files (html, scss,js,img, fonts)
function watchFiles() {
    watch([path.watch.html], html);
    watch([path.watch.css], css);
    watch([path.watch.js], js);
    watch([path.watch.img], images);
    watch([path.watch.fonts], fonts);
    watch([path.watch.php], php);
}

let build = series(clean, parallel(html, css, js, images, fonts, php));
let taskManager = parallel(build, watchFiles, sync);

let build_production = series(clean, parallel(html, css, js_production, images, fonts, php));
let production = parallel(build_production, watchFiles, sync);


exports.html = html;
exports.css = css;
exports.js = js;
exports.js_production = js_production;
exports.images = images;
exports.fonts = fonts;
exports.php = php;
exports.clean = clean;
exports.build = build;
exports.sync = sync;
exports.taskManager = taskManager;

exports.build_production = build_production;
exports.production = production;

exports.default = taskManager;