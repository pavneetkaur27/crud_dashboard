const router = require('express').Router();
const userManager = require('../managers/userManager');

router.get('/checkStatus', function (req, res) {
    console.log('test');
    res.send('all good');
});

router.get('/get', userManager.getUser);

router.post('/add', userManager.addUser);

router.post('/del', userManager.removeUser);

router.post('/save', userManager.saveUser);

module.exports = router;
