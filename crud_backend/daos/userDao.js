const mongoose = require('mongoose')
const User = mongoose.connection.collection('user')
const { UserModel } = require('../models/user')

function saveUser(document) {
    document.creationTime = document.lastUpdated = Date.now()
    const user = new UserModel(document)
    const error = user.validateSync()
    if (error) {
        console.error('saveUser error:', document, error.message)
        return Promise.reject(error.message)
    }
    return User.insertOne(document)
}

module.exports = {
    saveUser,
}
