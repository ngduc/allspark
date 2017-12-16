# allspark

![Node](https://img.shields.io/node/v/allspark.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/allspark.svg?style=flat-square)](https://www.npmjs.com/package/allspark)
[![Travis](https://img.shields.io/travis/ngduc/allspark/master.svg?style=flat-square)](https://travis-ci.org/ngduc/allspark)
[![David](https://img.shields.io/david/ngduc/allspark.svg?style=flat-square)](https://david-dm.org/ngduc/allspark)
[![Coverage Status](https://img.shields.io/coveralls/ngduc/allspark.svg?style=flat-square)](https://coveralls.io/github/ngduc/allspark)
[![NPM](https://img.shields.io/npm/dt/allspark.svg?style=flat-square)](https://www.npmjs.com/package/allspark)

> allspark is a modern webapp generator

### Usage

```js
import allspark from 'allspark';

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add allspark (--dev)

or npm

	npm install allspark (--save-dev)


### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js
import allspark from 'allspark';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js
allspark

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/ngduc/allspark) example.

### Builds

If you don't use a package manager, you can [access `allspark` via unpkg (CDN)](https://unpkg.com/allspark/), download the source, or point your package manager to the url.

`allspark` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `allspark` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist/umd` folder](https://unpkg.com/allspark/dist/umd/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/allspark) on your page. The UMD builds make `allspark` available as a `window.allspark` global variable.

### License

The code is available under the [MIT](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
