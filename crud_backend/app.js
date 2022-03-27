const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const server_debug = require('debug')('Server')
const compression = require('compression')
const cors = require('cors')
const expressValidator = require('express-validator')
const config = require('./config')

//validator
app.use(expressValidator())

//Security
app.use(helmet())

//Performance
app.use(compression())

//Cors
app.use(cors())

/*----------------------Require route-----------------------*/
const index = require('./routes/index')
const usersRoute = require('./routes/usersRoute')
const commentRoute = require('./routes/commentRoute')
/*----------------------------------------------------------*/

//connect_mongo
config.db

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST,OPTIONS')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    return next()
})

app.options('*', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.status(200).end()
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

/*---------All Routes----------*/
app.use('/', index)
app.use('/user', usersRoute)
app.use('/comment', commentRoute)
/*-----------------------------*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(function (err, req, res) {
    res.locals.message = err.message
    let errMsg
    if (err.message) {
        errMsg = err.message
        console.log('err ' + errMsg)
    } else {
        errMsg = err
        console.log('err ' + errMsg)
    }
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.send(errMsg)
    err.status == 404 ? server_debug('Not found') : server_debug('Server Error')
})

module.exports = app
