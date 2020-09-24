/*!
 * koa-better-method-override -- koa@1.x.x
 *
 * Copyright(c) 2020 Imed Jaberi
 * MIT Licensed
 */

'use strict'

/**
 * Module dependences.
 */

const debug = require('debug')('koa-better-method-override')
const methods = require('methods')
// I don't use `querystring` here beacause Koa do that for us.
// I don't use `vary` here beacause Koa give me access to vary.

/**
 * Some global constants.
 */

const ALLOWED_METHODS = 'POST'
const HTTP_METHOD_OVERRIDE_HEADER = 'X-HTTP-Method-Override'

/**
 * Method Override:
 *
 * Provides faux HTTP method support.
 *
 * Pass an optional `getter` to use when checking for
 * a method override.
 *
 * A string is converted to a getter that will look for
 * the method in `this.request.body[getter]` and a function will be
 * called with `this.request` and expects the method to be returned.
 * If the string starts with `X-` then it will look in
 * `this.request.headers[getter]` instead.
 *
 * The original method is available via `this.request.originalMethod`.
 *
 * @param {string|function} [getter=X-HTTP-Method-Override]
 * @param {object} [options]
 * @return {function}
 * @api public
 */

module.exports = function methodOverride (getter, options = {}) {
  // get the getter fn
  const get = typeof getter === 'function'
    ? getter
    : createGetter(getter || HTTP_METHOD_OVERRIDE_HEADER)

  // get allowed request methods to examine
  const methods = options.methods === undefined
    ? ALLOWED_METHODS.split(' ')
    : options.methods

  return function * methodOverride (next) {
    this.request.originalMethod = this.request.originalMethod || this.request.method

    // validate request is an allowed method
    if (methods && methods.indexOf(this.request.originalMethod) === -1) {
      return yield * next
    }

    const val = get(this.request, this.response)
    const method = Array.isArray(val) ? val[0] : val

    // replace
    if (method !== undefined && supports(method)) {
      this.request.method = method.toUpperCase()
      debug(`override ${this.request.originalMethod} as ${this.request.method}`)
    }

    return yield * next
  }
}

/**
 * Create a getter for the given string.
 */

function createGetter (str) {
  if (str.substring(0, 2).toUpperCase() === 'X-') {
    // header getter
    return createHeaderGetter(str)
  }

  return createQueryGetter(str)
}

/**
 * Create a getter for the given query key name.
 */

function createQueryGetter (key) {
  return function (request) {
    return request.query[key]
  }
}

/**
 * Create a getter for the given header name.
 */

function createHeaderGetter (str) {
  const name = str.toLowerCase()

  return function (request, response) {
    // set appropriate Vary header
    response.vary(str)

    // get header
    const header = request.headers[name]

    if (!header) {
      return undefined
    }

    // multiple headers get joined with comma by node.js core
    const index = header.indexOf(',')

    // return first value
    return index !== -1
      ? header.substr(0, index).trim()
      : header.trim()
  }
}

/**
 * Check if node supports `method`.
 */

function supports (method) {
  return method &&
    typeof method === 'string' &&
    methods.indexOf(method.toLowerCase()) !== -1
}
