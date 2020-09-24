# koa-better-method-override

> Override HTTP verbs for koa.

Forked from [Express method-override] (identical).

[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]

### Install

```bash
# npm
npm install koa-better-method-override
# yarn
yarn add koa-better-method-override
```

### Usage, more [Express method-override]

```js
const Koa = require('koa');
// koa@2.x.x
const methodOverride = require('koa-better-method-override');
// koa@1.x.x
const methodOverride = require('koa-better-method-override/v1');

const app = new Koa();

app.use(methodOverride());

app.listen(3000);
```

### License

[MIT](LICENSE)


[Express method-override]: https://github.com/expressjs/method-override

[npm-img]: https://img.shields.io/npm/v/koa-better-method-override.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-better-method-override
[travis-img]: https://img.shields.io/travis/koa-modules/methodoverride.svg?style=flat-square
[travis-url]: https://travis-ci.org/koa-modules/methodoverride
[coveralls-img]: https://img.shields.io/coveralls/koa-modules/methodoverride.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koa-modules/methodoverride?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/3imed-jaberi/koa-better-method-override/blob/master/LICENSE
