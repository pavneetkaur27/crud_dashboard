const mongoose              = require('mongoose');
const request 				= require('request');
const moment                = require('moment-timezone');
const helper                = require('../../helper');
const httpResponse          = helper.HttpResponse;
const constants             = helper.Constants;
const errorCodes            = helper.Errors;
const sendError 		    = httpResponse.sendError;
const sendSuccess			= httpResponse.sendSuccess;

// Models require
const UserData = require('../../models/users');


