const { saveUser } = require('../daos/userDao');
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
        const response = await saveUser(dataToSave);
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

async function getUser(req, res) { }

async function removeUser(req, res) { }

module.exports = {
    getUser,
    addUser,
    removeUser,
};
