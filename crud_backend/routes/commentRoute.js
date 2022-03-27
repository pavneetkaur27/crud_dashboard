const router = require('express').Router()
const commentManager = require('../managers/commentManager')

router.get('/checkStatus', function (req, res, next) {
    console.log('test')
    res.send('all good')
})

router.get('/reply', commentManager.getComments)

router.post('/add', commentManager.addComment)
router.post('/reply', commentManager.addReply)

// router.post('/del', commentManager.deleteComment);

module.exports = router
