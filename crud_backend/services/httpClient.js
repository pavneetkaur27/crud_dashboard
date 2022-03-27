const https = require('https')
const Q = require('q')
const Client = require('node-rest-client').Client
const restClient = new Client()
const responseUtils = require('../utils/responseUtils.js')
const statusCodes = responseUtils.statusCodes

const headers = {
    'Content-Type': 'application/json',
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
}

function post(url, params = {}, headersJson = {}) {
    var deferred = Q.defer()
    console.log('post request', url, params)
    restClient.post(
        url,
        {
            data: params,
            headers: headersJson,
        },
        function (data, response) {
            if (
                !data ||
                (response.statusCode !== statusCodes.OK &&
                    response.statusCode !== statusCodes.CREATED)
            ) {
                if (Buffer.isBuffer(data)) {
                    data = data.toString()
                }
                console.error(
                    'Error in POST url:',
                    url,
                    params,
                    response.statusCode,
                    data
                )
                deferred.resolve({
                    result: null,
                    headers: response.headers,
                    statusCode: response.statusCode,
                    errorObj: createJSONResp(response, data),
                })
            } else {
                console.log('post req resolved', data)
                deferred.resolve({
                    result: createJSONResp(response, data),
                    headers: response.headers,
                    statusCode: response.statusCode,
                })
            }
        }
    )
    return deferred.promise
}

function get(url, queryParams = {}, headersJson = {}) {
    var deferred = Q.defer()
    console.log('get request:', url, queryParams)
    restClient.get(
        url,
        {
            data: queryParams,
            headers: headersJson,
        },
        function (data, response) {
            if (
                !data ||
                (response.statusCode !== statusCodes.OK &&
                    response.statusCode !== statusCodes.CREATED)
            ) {
                if (Buffer.isBuffer(data)) {
                    data = data.toString()
                }
                console.error('Error in get url:', url, data)
                deferred.resolve({
                    result: null,
                    headers: response.headers,
                    statusCode: response.statusCode,
                    errorObj: createJSONResp(response, data),
                })
            } else {
                deferred.resolve({
                    result: createJSONResp(response, data),
                    headers: response.headers,
                    statusCode: response.statusCode,
                })
            }
        }
    )
    return deferred.promise
}

function createJSONResp(response, data) {
    var responseHeaders = response.headers
    var contentType = responseHeaders['content-type']
    if (!contentType) {
        contentType = responseHeaders['Content-Type']
    }
    var finalResult = null
    if (contentType && contentType.indexOf('application/json') > -1) {
        finalResult = data
    } else {
        if (data) {
            try {
                finalResult = JSON.parse(data.toString())
            } catch (e) {
                finalResult = data.toString()
            }
        }
    }
    return finalResult
}

module.exports = {
    get,
    post,
    newget,
    newpost,
    subscribeToSns,
}
