var statusCodes = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    SERVICE_ERROR: 500,
    FORBIDDEN_ERROR: 403,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
}
var errorCodes = {
    BAD_REQUEST: 'BAD_REQUEST',
    SERVICE_ERROR: 'SERVICE_ERROR',
    FORBIDDEN_ERROR: 'FORBIDDEN_ERROR',
    USER_ALREADY_CONNECTED: 'USER_ALREADY_CONNECTED',
    NOT_FOUND: 'NOT_FOUND',
    REQ_LIM_EXC_CELEB: 'REQ_LIM_EXC_CELEB',
    SESSION_FORBIDDEN_FOR_USER: 'SESSION_FORBIDDEN_FOR_USER',
    TA_ALREADY_EXISTS: 'TA_ALREADY_EXISTS',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    NOT_ALLOWED_TO_JOIN_PRIVATE_SESSION: 'NOT_ALLOWED_TO_JOIN_PRIVATE_SESSION',
}

var getResponseObj = function (
    success = false,
    statusCode = '',
    errorCode = '',
    errorMessage = '',
    result = null
) {
    return { success, statusCode, errorCode, errorMessage, result }
}

var getSuccessRespObj = function (result) {
    return { result: result }
}

/**
 * Generates error response with the given params
 *
 * @param {string} errorCode
 * @param {string} errMessage
 * @param {Object=} extraData?
 */
const getErrRespObj = function (errorCode, errMessage, extraData) {
    if (!errorCode) {
        errorCode = 'SERVICE_ERROR'
    }
    var errorMessage = errMessage || errorCodesToMessagesMap[errorCode]
    if (!errorMessage) {
        errorMessage = ''
    }
    return { errorCode, errorMessage, extraData }
}

var sendErrResp = function (res, statuscode, errorCode, errMessage) {
    if (!statuscode) {
        statuscode = statusCodes.SERVICE_ERROR
    }
    if (!errorCode) {
        errorCode = 'SERVICE_ERROR'
    }
    var errorMessage = errMessage || errorCodesToMessagesMap[errorCode]
    if (!errorMessage) {
        errorMessage = ''
    }
    res.status(statuscode)
    res.send({ errorCode: errorCode, errorMessage: errorMessage })
}

var errorCodesToMessagesMap = {
    SERVICE_ERROR: 'Some error occured',
    BAD_REQUEST: 'missing params',
    FORBIDDEN_ERROR: 'You are not authorized',
    NOT_LOGGED_IN: 'You are not logged in',
    USER_ALREADY_CONNECTED: 'user is already connected to the session',
    SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
    MISSING_SESSION_ID: 'MISSING_SESSION_ID',
    REQ_LIM_EXC_CELEB: 'REQ_LIM_EXC_CELEB',
    SERVICE_UNAVAILABLE: 'service is unavailable',
}

exports.getResponseObj = getResponseObj
exports.getSuccessRespObj = getSuccessRespObj
exports.getErrRespObj = getErrRespObj
exports.sendErrResp = sendErrResp
exports.statusCodes = statusCodes
exports.errorCodes = errorCodes
exports.errorCodesToMessagesMap = errorCodesToMessagesMap
