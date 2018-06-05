const express = require('express');
const router = express.Router();

const utils = require('./utils');

// ==============================================
// COMMON
// ==============================================

// Route to the start (sign in) page
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`);
})

router.get('/sign-in', function(req, res) {
    res.render(`${req.feature}/${req.version}/sign-in`,
        {
            proposition_links: "hide",
            links: {
            	'sign_in': req.baseUrl + '/claims'
            }
        });
});

router.get('/auth', function(req, res) {

    res.redirect(`/${req.feature}/${req.version}/claims`);

});

router.get('/sign-out', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`);
});

// ==============================================
// CLAIMS
// ==============================================

router.get('/claims', function(req, res) {

	// Total number of providers
  var count = utils.getClaimCount();

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

  res.render(`${req.feature}/${req.version}/claims/list`,
    {
      links: {
      	  claim: {
      	  	'view': req.baseUrl + '/claim'
      	  }
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
      claims: utils.getClaims(sort_by,sort_order,limit,page)
    });

});

router.get('/claim/:claim_id([0-9]+)', function(req, res) {
    res.render(`${req.feature}/${req.version}/claims/detail`,
        {
            links: {
      	  		'back': req.baseUrl + '/claims'
            },
            claim: utils.getClaim(req.param.claim_id),
            reasons: {
            	'rejected': utils.getRejectReasons(),
            	'refused' : utils.getRefusalReasons()
            },
            layout: req.query.layout
        });
});

// Add your routes above this line

module.exports = router
