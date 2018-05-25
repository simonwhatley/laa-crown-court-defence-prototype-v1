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

	res.redirect(`/${req.feature}/${req.version}/providers`);

    

});

router.get('/sign-out', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`);
});

// ==============================================
// HOME
// ==============================================

router.get('/home', function(req, res) {
    // res.render(`${req.feature}/${req.version}/home`,
    //     {
    //         links: {
                
    //         }
    //     });
    res.redirect(`/${req.feature}/${req.version}/providers`);
});

// ==============================================
// PROVIDERS
// ==============================================

// Route for provider list
router.get('/providers', function (req, res) {

  // Total number of providers
  var count = utils.getProviderCount();

  // Prevent users putting in a limit not in the pre-defined set: 10, 25, 50, 100
  var limit = 100;
  if ([10,25,50,100].indexOf(parseInt(req.query.limit)) !== -1) {
    var limit = (req.query.limit) ? parseInt(req.query.limit) : 100;
  }
  
  var sort_by = (req.query.sort) ? req.query.sort : 'name';
  var sort_order = (req.query.order) ? req.query.order : 'asc';

  // Current page
  var page = (req.query.page) ? parseInt(req.query.page) : 1;

  // Total number of pages
  var page_count = Math.ceil(count / limit);

  var start_page = 1;
  var end_page = 5;

  // First five pages
  if (page > 3) {
  	start_page = page - 2;
  	end_page = page + 2;
  }

  // Last five pages
  if (page > (page_count - 3)) {
  	start_page = page_count - 4;
  	end_page = page_count;
  }

  var prev_page = page - 1;
  var next_page = page + 1;
  
  var start_item = (page == 1) ? page : ((page*limit)-limit)+1;
  var end_item = (page == 1) ? (page*limit) : ((start_item+limit)-1);

  res.render(`${req.feature}/${req.version}/providers/list`,
    {
      links: {
      	  provider: {
        	'add' : req.baseUrl + '/provider/add',
        	'view' : req.baseUrl + '/provider',
      	  },
      	  user: {
      	  	'add' : req.baseUrl + '/provider/' + req.params.provider_id + '/user/add',
      	  	'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/user/'
      	  },
      	  'list': req.baseUrl + '/providers',
          'home': req.baseUrl + '/home'
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

  if (typeof(req.session.data.provider) === 'undefined') {
  	var provider = utils.getProvider(req.params.provider_id);
  }
  else {

  	if (parseInt(req.params.provider_id) === parseInt(req.session.data.provider.id)) {
  		var provider = req.session.data.provider;
  	}
  	else {
  		var provider = utils.getProvider(req.params.provider_id);
  	}
  }

  res.render(`${req.feature}/${req.version}/providers/view`,
    {
      links: {
      	  provider: {
        	'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/edit',
        	'delete' : req.baseUrl + '/provider/' + req.params.provider_id + '/delete'
      	  },
      	  user: {
      	  	'add' : req.baseUrl + '/provider/' + req.params.provider_id + '/user/add',
      	  	'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/user'
      	  },
          'back': req.baseUrl + '/providers'
      },
      provider: provider
    });

});

// Route for single provider
router.get('/provider/add', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/providers'
      },
      provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single provider
router.get('/provider/:provider_id([0-9]+)/edit', function (req, res) {
  
  if (typeof(req.session.data.provider) === 'undefined') {
  	var provider = utils.getProvider(req.params.provider_id);
  }
  else {

  	if (parseInt(req.params.provider_id) === parseInt(req.session.data.provider.id)) {
  		var provider = req.session.data.provider;
  	}
  	else {
  		var provider = utils.getProvider(req.params.provider_id);
  	}
  }

  res.render(`${req.feature}/${req.version}/providers/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      },
      provider: provider
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
      users: utils.getProviderUsers(req.params.provider_id)
    });

});

// Route for single user
router.get('/provider/:provider_id([0-9]+)/user/:user_id([0-9]+)/', function (req, res) {

  if (typeof(req.session.data.user) === 'undefined') {
    var user = utils.getUser(req.params.user_id);
  }
  else {

    if (parseInt(req.params.user_id) === parseInt(req.session.data.user.id)) {
      var user = req.session.data.user;
    }
    else {
      var user = utils.getUser(req.params.user_id);
    }
  }

  res.render(`${req.feature}/${req.version}/providers/users/view`,
    {
      links: {
          'edit' : req.baseUrl + '/provider/' + req.params.provider_id + '/user/' + req.params.user_id + '/edit',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      },
      provider: utils.getProvider(req.params.provider_id),
      user: user
    });

});

// Route for single user
router.get('/provider/:provider_id([0-9]+)/user/add', function (req, res) {

  res.render(`${req.feature}/${req.version}/providers/users/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/',
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/'
      }
      // ,
      // provider: utils.getProvider(req.params.provider_id)
    });

});

// Route for single user
router.get('/provider/:provider_id([0-9]+)/user/:user_id([0-9]+)/edit', function (req, res) {

  if (typeof(req.session.data.user) === 'undefined') {
    var user = utils.getUser(req.params.user_id);
  }
  else {

    if (parseInt(req.params.user_id) === parseInt(req.session.data.user.id)) {
      var user = req.session.data.user;
    }
    else {
      var user = utils.getUser(req.params.user_id);
    }
  }

  res.render(`${req.feature}/${req.version}/providers/users/edit`,
    {
      links: {
          'save' : req.baseUrl + '/provider/' + req.params.provider_id + '/user/' + req.params.user_id,
          'cancel': req.baseUrl + '/provider/' + req.params.provider_id + '/user/' + req.params.user_id,
          'back': req.baseUrl + '/provider/' + req.params.provider_id + '/user/' + req.params.user_id
      },
      provider: utils.getProvider(req.params.provider_id),
      user: user
    });

});

// Add your routes above this line

module.exports = router
