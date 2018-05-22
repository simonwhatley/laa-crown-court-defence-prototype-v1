const express = require('express')
const router = express.Router()

const utils = require('./utils');

// ==============================================
// COMMON
// ==============================================

// Route to the start (sign in) page
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`);
});

router.get('/sign-in', function(req, res) {
    res.render(`${req.feature}/${req.version}/sign-in`,
        {
            proposition_links: "hide"
        });
});

router.get('/auth', function(req, res) {

	res.redirect(`/${req.feature}/${req.version}/home`);

    

});

router.get('/sign-out', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`);
});

// ==============================================
// HOME
// ==============================================

router.get('/home', function(req, res) {
    res.render(`${req.feature}/${req.version}/home`,
        {
            links: {
                
            }
        });
});

// ==============================================
// PROVIDERS
// ==============================================

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

  res.render(`${req.feature}/${req.version}/providers/list`,
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

  res.render(`${req.feature}/${req.version}/providers/view`,
    {
      links: {
          'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/edit',
          'back': req.baseUrl + '/providers'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single provider
router.get('/provider/:provider_id([0-9]+)/edit', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// ==============================================
// PROVIDER USERS
// ==============================================

// Route for single provider
router.get('/provider/:provider_id([0-9]+)/users', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/view`,
    {
      links: {
          'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/edit',
          'back': req.baseUrl + '/providers'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single user
router.get('/provider/:provider_id([0-9]+)/user/:user_id([0-9]+)/view', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/users/view`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single user
router.get('/provider/:provider_id([0-9]+)/user/:user_id([0-9]+)/edit', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/users/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Add your routes above this line

module.exports = router
