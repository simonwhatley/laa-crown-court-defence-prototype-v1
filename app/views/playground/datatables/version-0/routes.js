const express = require('express');
const router = new express.Router();

const utils = require('./utils');

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1];
  req.feature = req.originalUrl.split('/')[2];
  req.version = req.originalUrl.split('/')[3];
  next();
});

// Route index page
router.get('/', function (req, res) {
  res.redirect(`/${req.section}/${req.feature}/${req.version}/providers`);
});

// Route for provider list
router.get('/providers', function (req, res) {

  var count = utils.getProviderCount();
  var limit = (req.query.limit) ? req.query.limit : 100;

  var page_count = Math.ceil(count / limit);

  var start_page = 1;
  var end_page = 5;

  var prev_page = parseInt(req.query.page) - 1;
  var next_page = parseInt(req.query.page) + 1;

  if (req.query.page > 3) {
    start_page = parseInt(req.query.page) - 2;
    end_page = parseInt(req.query.page) + 2;
  }

  res.render(`${req.section}/${req.feature}/${req.version}/list`,
    {
      links: {
          'list' : req.baseUrl + '/providers',
          'view' : req.baseUrl + '/provider/'
      },
      providers: utils.getProviders(req.session.data.sort,req.session.data.order,limit,req.session.data.page),
      pagination: {
        total_count: count,
        page_count: page_count,
        start_page: start_page,
        end_page: end_page,
        prev_page: prev_page,
        next_page: next_page
      }
    });

});

// Route for single provider
router.get('/provider/:provider_id([0-9]+)/', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/detail`,
    {
      links: {
          'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/edit',
          'back': req.baseUrl + '/provider/list'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single provider
router.get('/provider/:provider_id([0-9]+)/edit', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/detail'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Add your routes above this line

module.exports = router
