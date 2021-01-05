## 问题
- [ ] HMR 的原理

## 概念
- 打包工具demo[minipack-explain](https://github.com/chinanf-boy/minipack-explain/blob/master/src/minipack.js)
### 入口[entry]
构建依赖图的入口文件
默认: `./src/index.js`
语法：
- `entry: string | [string]`
- `entry: { <entryChunkName> string | [string] } | {}`
```javascript
module.exports = {
    entry: './src/main.js'
}
```
配置多个入口的使用场景：
- 分离应用程序和第三方库。使第三方库的文件名不变，更好的利用缓存。
- 多页面应用

### 输出[output]
output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。
默认: `./dist/main.js`
```javascript
module.exports = {
    output: 'bundle.js'
}

// 多个入口
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
```

### loader
让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。
三种方式使用loader：
- 配置方式
- 内联方式：优先级高于配置
- CLI方式

[loader 特性](https://webpack.docschina.org/concepts/loaders/#loader-features)

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};

```

### 插件[plugin]
扩展webpack的能力，插件目的在于解决 loader 无法实现的其他事。
由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入一个 new 实例。
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
### 模式[mode]
默认值为 production
### 模块(Modules)
开发者将程序分解为功能离散的 chunk，并称之为 模块。

### target
配置打包出的项目代码的运行环境。

### manifest
应用开发的代码类型
- 你或你的团队编写的源码。
- 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
- webpack 的 runtime 和 manifest，管理所有模块的交互。

runtime: 在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。
manifest: 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。

### 模块热替换(HMR)
原理比较复杂


## 指南
- [ ] [预获取/预加载模块(prefetch/preload module)](https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules)
- [ ] [bundle 分析](https://webpack.docschina.org/guides/code-splitting/#bundle-analysis)
