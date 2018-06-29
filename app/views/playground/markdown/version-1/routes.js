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

router.get('/', (req, res) => {

	let fs = require('fs');

	let doc = fs.readFileSync(path.join(__dirname, 'content', 'home.md'), 'utf8');
  	let html = marked(doc);

	res.render(`${req.section}/${req.feature}/${req.version}/index`,
	{
		content: html
	});

});

router.get('/:page/', (req, res) => {

	let fs = require('fs');

	try {
		
		let doc = fs.readFileSync(path.join(__dirname, 'content', (req.params.page + '.md')), 'utf8');
		let html = marked(doc);

		res.render(`${req.section}/${req.feature}/${req.version}/page`,
		{
			content: html
		});

	}
	catch (e) {

		res.render(`${req.section}/${req.feature}/${req.version}/404`);

	}

});

// router.get('/404', (req, res) => {
	
// 	res.render(`${req.section}/${req.feature}/${req.version}/404`);

// });

// Add your routes above this line

module.exports = router;