const ObjectID = require('mongodb').ObjectID;
const enums = require('../utils/enums');
const {
    getSuccessRespObj,
    statusCodes,
    errorCodes,
    sendErrResp,
} = require('../utils/responseUtils');
const CommentDao = require('../daos/commentDao');

async function addComment(req, res) {
    const { comment, postId, userId } = req.body;
    if (!postId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'postId missing'
        );
    }
    if (!userId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'userId missing'
        );
    }
    if (!comment) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'comment missing'
        );
    }

    const datatoSave = {
        postId,
        userId,
        comment,
    };
    try {
        const response = await CommentDao.saveComment(datatoSave);
        res.status(statusCodes.OK);
        return res.send({ result: response });
    } catch (err) {
        console.log('addcomment err', err);
        return sendErrResp(
            res,
            statusCodes.SERVICE_ERROR,
            errorCodes.SERVICE_ERROR,
            err
        );
    }
}

async function addReply(req, res) {
    const { comment, postId, userId, parentId } = req.body;
    if (!postId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'postId missing'
        );
    }
    if (!userId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'userId missing'
        );
    }
    if (!comment) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'comment missing'
        );
    }

    if (!parentId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'parentId missing'
        );
    }

    const datatoSave = {
        postId,
        userId,
        comment,
        parentId,
    };
    try {
        const response = await CommentDao.saveComment(datatoSave);
        res.status(statusCodes.OK);
        return res.send({ result: response });
    } catch (err) {
        console.log('addcomment err', err);
        return sendErrResp(
            res,
            statusCodes.SERVICE_ERROR,
            errorCodes.SERVICE_ERROR,
            err
        );
    }
}

async function getComments(req, res) {
    const { comment, postId, userId, parentId } = req.body;
    if (!postId) {
        return sendErrResp(
            res,
            statusCodes.BAD_REQUEST,
            errorCodes.BAD_REQUEST,
            'postId missing'
        );
    }

    const query = {
        postId,
    };
    const projectParams = {
        comment: 1,
        parentId: 1,
        // _id: 0
    };
    let commentSection = [];
    let commentsMapping = {};
    const limit = 10;
    try {
        const data = await CommentDao.getComments(query, projectParams, limit);
        console.log(data);
        if (data.length === 0) {
            res.status(statusCodes.OK);
            return res.send({ result: data });
        }
        for (let i = 0; i < data.length; i++) {
            let comment = data[i];
            if (!comment.parentId) {
                commentsMapping[comment._id.toString()] = [];
                commentsMapping[comment._id.toString()].push(comment);
            } else {
                commentsMapping[comment.parentId].push(comment);
            }
        }
        console.log(commentsMapping);
        res.status(statusCodes.OK);
        return res.send({ result: commentsMapping });
    } catch (err) {
        console.log('addcomment err', err);
        return sendErrResp(
            res,
            statusCodes.SERVICE_ERROR,
            errorCodes.SERVICE_ERROR,
            err
        );
    }
}

module.exports = {
    getComments,
    addComment,
    addReply,
    // deleteComment,
};
