const path =  require('path');
const fs = require('fs');
const webpack = require('webpack');
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);

const deleteall = function(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(curPath.indexOf('.ares') < 0){
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    console.log('=> rmdir', curPath)
                    deleteall(curPath);
                } else { // delete file
                    console.log('=> unlinkfile', curPath)
                    fs.unlinkSync(curPath);
                }
            }
        });
        if(path != './ares'){
            fs.rmdirSync(path);
        }
	}
};

const copyFile = function(srcPath, tarPath, cb) {
    console.log('=> copyfile from', srcPath, 'to', tarPath)
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
      if (err) {
        console.log('read error', srcPath)
      }
      cb && cb(err)
    })
  
    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
      if (err) {
        console.log('write error', tarPath)
      }
      cb && cb(err)
    })
    ws.on('close', function(ex) {
      cb && cb(ex)
    })
  
    rs.pipe(ws)
}
const copyFolder = function(srcDir, tarDir, cb) {
    fs.readdir(srcDir, function(err, files) {
        var count = 0
        var checkEnd = function() {
            ++count == files.length && cb && cb()
        }

        if (err) {
            checkEnd()
            return
        }

        files.forEach(function(file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)

            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    console.log('=> mkdir', tarPath)
                    fs.mkdir(tarPath, function(err) {
                        if (err) {
                            console.log(err)
                            return
                        }
                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })

        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',  // 公共路径
    indexPath: 'index.html' , // 相对于打包路径index.html的路径
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // 向 PWA 插件传递选项。
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
            {
                // Languages are loaded on demand at runtime
                languages: ['json', 'typescript', 'html', 'css']
            }
        ])
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
        if (IS_PROD) {
            config.plugin('extract-css').tap(args => [{
                filename: `static/css/[name].css`,
                chunkFilename: `static/css/[name].css`
            }]);
        }
        config.output
            .filename('static/js/[name].js') 
            .chunkFilename('static/js/[id].js')
            .end()
        // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
        // config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        //     {
        //         analyzerMode: "static"
        //     }
        // ]);
    },
    configureWebpack: config => {
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new webpack.optimize.LimitChunkCountPlugin({
                    maxChunks: 1
                  })
            )
            plugins.push({
                apply: (compiler) => {
                    compiler.hooks.done.tap('copy-file', compilation => {
                        // do something when webpack compilation done
                        deleteall('./ares')
                        copyFolder('./dist', './ares', function(err) {
                            if (err) {
                                console.error(err)
                                return
                            }
                            deleteall('./dist')
                            console.info('+=============================================+')
                            console.info('|              build completed.               |')
                            console.info('+=============================================+')
                        })
                    });
                }
            });
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    css: {
        extract: IS_PROD,
        //requireModuleExtension: false,// 去掉文件名中的 .module
        loaderOptions: {
            // 给 less-loader 传递 Less.js 相关选项
            less: {
                // `globalVars` 定义全局对象，可加入全局变量
                // globalVars: {
                //     primary: '#333'
                // }
            }
        }
    },
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        //host: "localhost",
        port: 8888, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        // proxy: { //配置多个跨域
        //     "/api": {
        //         target: "http://172.11.11.11:7071",
        //         changeOrigin: true,
        //         // ws: true,//websocket支持
        //         secure: false,
        //         pathRewrite: {
        //             "^/api": "/"
        //         }
        //     },
        //     "/api2": {
        //         target: "http://172.12.12.12:2018",
        //         changeOrigin: true,
        //         //ws: true,//websocket支持
        //         secure: false,
        //         pathRewrite: {
        //             "^/api2": "/"
        //         }
        //     },
        // }
    }
}
