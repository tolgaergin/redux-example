'use strict'

const gulp = require('gulp');

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
};

const config = {
  sassInputDir: './sass/style.scss',
  sassOutputDir: '../html/assets/css',
  nodeDir: '../build/node_modules',
  assetsDir: '../html/assets',
};

// JS Webpack
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

// JS Development
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = false;
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function (callback) {
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

// JS Build
gulp.task('webpack:build', function (callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ];

  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
    }));
    callback();
  });
});

gulp.task('watch', () => {
  gulp.watch('js/**/*.js', ['webpack:build-dev']);
//  gulp.watch('sass/**/*.scss', ['sass-develop']);
});

// define tasks here
gulp.task('default', ['js-product', 'sass-product', 'imagemin']);
