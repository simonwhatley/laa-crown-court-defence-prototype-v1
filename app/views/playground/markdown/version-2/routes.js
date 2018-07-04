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

router.get('/:file/', (req, res) => {

	let fs = require('fs');

	try {
		
		let doc = fs.readFileSync(path.join(__dirname, 'content', (req.params.file + '.md')), 'utf8');
		let html = marked(doc);

		res.render(`${req.section}/${req.feature}/${req.version}/page`,
		{
			content: html,
			links: {'back': req.baseUrl + '/'}
		});

	}
	catch (e) {

		res.render(`${req.section}/${req.feature}/${req.version}/404`,{
			links: {'home': req.baseUrl + '/'}
		});

	}

});

router.get('/:folder/:file/', (req, res) => {

	let fs = require('fs');

	try {
		
		let doc = fs.readFileSync(path.join(__dirname, ('content/' + req.params.folder), (req.params.file + '.md')), 'utf8');
		let html = marked(doc);

		res.render(`${req.section}/${req.feature}/${req.version}/page`,
		{
			content: html,
			links: {'back': req.baseUrl + '/'}
		});

	}
	catch (e) {

		res.render(`${req.section}/${req.feature}/${req.version}/404`,{
			links: {'home': req.baseUrl + '/'}
		});

	}

});

// Add your routes above this line

module.exports = router;