const mongoose = require('mongoose');
const Comment = mongoose.connection.collection('comment');
const { CommentModel } = require('../models/comment');

function saveComment(document) {
    document.createdAt = document.lastUpdated = Date.now();
    const comment = new CommentModel(document);
    const error = comment.validateSync();
    if (error) {
        console.error(' error:', document, error.message);
        return Promise.reject(error.message);
    }
    return Comment.insertOne(document);
}

function updateComment(queryParams, updateParams, upsert = false) {
    updateParams.lastUpdated = Date.now();
    return Comment.updateOne(
        queryParams,
        {
            $set: updateParams,
        },
        upsert
    );
}

function getComments(queryParams, projectParams, limit = 10) {
    return Comment.find(queryParams)
        .project(projectParams)
        .limit(10)
        .sort()
        .toArray();
}

module.exports = {
    saveComment,
    updateComment,
    getComments,
};
