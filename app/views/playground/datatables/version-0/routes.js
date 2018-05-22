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

  var limit = 100;
  if ([10,25,50,100].indexOf(parseInt(req.query.limit)) !== -1) {
    var limit = (req.query.limit) ? parseInt(req.query.limit) : 100;
  }
  
  var sort_by = (req.query.sort) ? req.query.sort : 'name';
  var sort_order = (req.query.sort) ? req.query.sort : 'asc';

  var page = (req.query.page) ? parseInt(req.query.page) : 1;

  var page_count = Math.ceil(count / limit);

  var start_page = (page > 3) ? (page - 2) : 1;
  var end_page = (page > 3) ? (page + 2) : 5;

  var prev_page = page - 1;
  var next_page = page + 1;
  
  var start_item = (page == 1) ? page : ((page*limit)-limit)+1;
  var end_item = (page == 1) ? (page*limit) : ((start_item+limit)-1);

  res.render(`${req.section}/${req.feature}/${req.version}/list`,
    {
      links: {
          'list' : req.baseUrl + '/providers',
          'view' : req.baseUrl + '/provider/'
      },
      pagination: {
        total_count: count,
        start_item: start_item,
        end_item: end_item,
        page_count: page_count,
        current_page: page,
        start_page: start_page,
        end_page: end_page,
        prev_page: prev_page,
        next_page: next_page,
        limit: limit,
        sort_by: sort_by,
        sort_order: sort_order
      },
      providers: utils.getProviders(sort_by,sort_order,limit,page)
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
