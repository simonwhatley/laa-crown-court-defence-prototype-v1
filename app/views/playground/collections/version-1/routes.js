const express = require('express')
const router = express.Router()

//const session = require('express-session')

//const utils = require('../../../utils')

const offences = require('./data.json')

console.log(offences)

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1]
  req.feature = req.originalUrl.split('/')[2]
  req.version = req.originalUrl.split('/')[3]
  next()
});

// Route index page
router.get('/', function (req, res) {
  // res.render('class')
  res.redirect(`/${req.section}/${req.feature}/${req.version}/class`)
});


router.get('./class', function (req, res) {

  res.render(`/${req.section}/${req.feature}/${req.version}/class`,
  	{
  		'previous_url': ''
  	});
});

// Route for bands
// /:classId([0-9]+)/

router.get('./band', function (req, res) {

  res.render(`/${req.section}/${req.feature}/${req.version}/band`,
  	{
  		'previous_url': './class'
  	});
});

// Route for categories
// /:classId([0-9]+)/:bandId([0-9]+)/

router.get('./category', function (req, res) {

  res.render(`/${req.section}/${req.feature}/${req.version}/category`,
  	{
  		'previous_url': './band'
  	});
});

// Add your routes above this line
module.exports = router