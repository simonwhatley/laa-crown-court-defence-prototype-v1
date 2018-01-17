const express = require('express')
const router = express.Router()

const session = require('express-session')

const utils = require('../../../utils')

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// Add your routes here - above the module.exports line

// ==============================================
// ADVOCATES
// ==============================================

router.get('/advocates/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/case-details`, 
        { 
            'next_url' : './fee-details', 
            'previous_url' : '../advocates/',
            'home_url' : '../advocates/'
        });
});

router.get('/advocates/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/fee-details`, 
        { 
            'next_url' : './check-claim', 
            'previous_url' : '../case-details'
        });
});

router.get('/advocates/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/check-claim`, 
        { 
            'next_url' : './certify-claim', 
            'previous_url' : '../fee-details'
        });
});

router.get('/advocates/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/certify-claim-claim`, 
        { 
            'next_url' : './thank-you', 
            'previous_url' : '../check-claim'
        });
});

router.get('/advocates/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/thank-you`, 
    	{ 
    		'new_claim_url' : './case-details', 
    		'your_claims_url' : './' 
    	});
});

// ==============================================
// LITIGATORS
// ==============================================

router.get('/litigators/bill-type', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            'next_url' : './case-details', 
            'previous_url' : '../litigators/',
            'home_url' : '../litigators/'
        });
});

router.get('/litigators/transfer-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            'next_url' : './case-details', 
            'previous_url' : './bill-type',
            'home_url' : '../litigators/'
        });
});

router.get('/litigators/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            'next_url' : './fee-details', 
            'previous_url' : '../litigators/',
            'home_url' : '../litigators/'
        });
});

router.get('/litigators/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/fee-details`, 
        { 
            'next_url' : './check-claim', 
            'previous_url' : '../case-details'
        });
});

router.get('/litigators/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/check-claim`, 
        { 
            'next_url' : './certify-claim', 
            'previous_url' : '../fee-details'
        });
});

router.get('/litigators/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/certify-claim-claim`, 
        { 
            'next_url' : './thank-you', 
            'previous_url' : '../check-claim'
        });
});

router.get('/litigators/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/thank-you`, 
    	{ 
    		'new_claim_url' : './case-details', 
    		'your_claims_url' : './' 
    	});
});

// Add your routes above this line

module.exports = router