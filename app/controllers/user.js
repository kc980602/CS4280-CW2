var express = require('express');
var createError = require('http-errors');
var modelUser = require('../models/user');
//used as controllerLocation.list in route index.js
//home page accessing location list without specific parameter
// module.exports.list = function(req, res, next) {
//     modelUser(function(err, result) {
//         //just use callback to get back data from model, no parameter needed
//         if (err) return next(createError(err)); //normal error handling
//         res.render('index', result);
//     });
// };
// //used as controllerLocation.info in route location.js
// //details page of a location
//
// module.exports.info = function(req, res, next) {
//     modelUser(req.query.id, function(err, result) {
//         //assume parameter location id coming from query string
//         if (err) return next(createError(err)); //normal error handling
//         //send data to view of details page
//         res.render('details', result);
//     });
// };
