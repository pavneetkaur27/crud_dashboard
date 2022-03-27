const mongoose = require('mongoose')
const { Schema } = mongoose

class CommentSchema extends Schema {
    constructor(object, options) {
        super(object, options)
        this.add({
            postId: {
                type: Number,
                required: true,
            },
            userId: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            imageUrl: {},
            parentId: {
                type: String,
                // validdation
            },
            lastUpdated: {
                type: Number,
                required: true,
            },
            createdAt: {
                type: Number,
                required: true,
            },
        })
    }
}

const commentSchema = new CommentSchema()
const CommentModel = mongoose.model('comment', commentSchema, 'comment')

module.exports = {
    CommentModel,
}
