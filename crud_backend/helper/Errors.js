"use strict";
var errors = {
	"invalid_parameters" 										: [100, "Invalid Parameters"],
	"server_error"		 										: [500, "Something went wrong"],
	"no_server_response"										: [2300,"No response from server"],
	"invalid_email"												: [101, "Invalid Email Id"]
};

module.exports = errors; 