const express = require('express');
const router = new express.Router();
const path = require('path');
const marked = require('marked');

// const utils = require('./utils');

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1];
  req.feature = req.originalUrl.split('/')[2];
  req.version = req.originalUrl.split('/')[3];
  next();
});

router.get('/', function (req, res) {

	var fs = require('fs');

	var doc = fs.readFileSync(path.join(__dirname, 'content', 'example.md'), 'utf8');
  	var html = marked(doc);

	res.render(`${req.section}/${req.feature}/${req.version}/index`,
		{
			content: html
		});

});

// Add your routes above this line

module.exports = router;