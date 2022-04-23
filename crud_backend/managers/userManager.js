const UserDao = require('../daos/userDao');
const enums = require('../utils/enums');
const {
    getSuccessRespObj,
    statusCodes,
    errorCodes,
    sendErrResp,
} = require('../utils/responseUtils');

/**
 * API end saves user data
 * @param { express.Request } req
 * @param { express.Response } res
 */
async function addUser(req, res) {
    console.log('Got req for addUser', req.body);

    const { username, email, status, role } = req.body;

    /* todo add email validation */
    if (!email) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'email missing'
        );
    }

    if (!username) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'username missing'
        );
    }

    if (!role || (role && !enums.USER_ROLES[role])) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'role missing'
        );
    }

    try {
        const dataToSave = {
            u_name: username,
            e_mail: email,
            role: role,
        };
        if (status) {
            dataToSave.stts = status;
        }
        const response = await UserDao.saveUser(dataToSave);
        if (response?.result?.ok) {
            res.send(getSuccessRespObj('done'));
        } else {
            console.error(
                'addUser error: ',
                email,
                username,
                errorCodes.SERVICE_ERROR
            );
            return sendErrResp(
                res,
                statusCodes.SERVICE_ERROR,
                errorCodes.SERVICE_ERROR,
                errorCodes.SERVICE_ERROR
            );
        }
    } catch (err) {
        console.error('addUser error: ', email, username, err);
        return sendErrResp(
            res,
            statusCodes.SERVICE_ERROR,
            errorCodes.SERVICE_ERROR,
            err
        );
    }
}

async function getUser(req, res) {
    console.log('Got req for getUser', req.body);
    res.send(getSuccessRespObj('done'));

}

async function removeUser(req, res) {
    console.log('Got req for removeUser', req.body);
    res.send(getSuccessRespObj('done'));
}

async function saveUser(req, res) {
    console.log('Got req for saveUser test', req.body);

    const { firstName, lastName, email } = req.body;

    /* todo add email validation */
    if (!email) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'email missing'
        );
    }

    if (!firstName) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'username missing'
        );
    }

    if (!lastName) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'username missing'
        );
    }

    try {
        const dataToSave = {
            u_name: firstName + ' ' + lastName,
            e_mail: email,
        };

        const response = await UserDao.saveUser(dataToSave);
        if (response?.result?.ok) {
            res.send(getSuccessRespObj('done'));
        } else {
            console.error(
                'addUser error: ',
                email,
                firstName, lastName,
                errorCodes.SERVICE_ERROR
            );
            return sendErrResp(
                res,
                statusCodes.SERVICE_ERROR,
                errorCodes.SERVICE_ERROR,
                errorCodes.SERVICE_ERROR
            );
        }
    } catch (err) {
        console.error('addUser error: ', email, err);
        return sendErrResp(
            res,
            statusCodes.SERVICE_ERROR,
            errorCodes.SERVICE_ERROR,
            err
        );
    }
}

module.exports = {
    getUser,
    addUser,
    removeUser,
    saveUser,
};
