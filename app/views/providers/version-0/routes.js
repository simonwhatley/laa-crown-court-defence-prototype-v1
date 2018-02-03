const express = require('express')
const router = new express.Router()

const utils = require('../../../utils')

router.get('/', (req, res) => {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// ==============================================
// ADVOCATES
// ==============================================

router.get('/advocates/', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/index`, 
        {
            links: {
                'start' : req.baseUrl + '/advocates/case-details',
                'search': req.baseUrl + '/advocates/search',
                'outstanding': req.baseUrl + '/advocates/outstanding',
                'authorised': req.baseUrl + '/advocates/authorised'
            },
            claims: []
        });
});

router.get('/advocates/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/case-details`, 
        {
            links: {
                'next' : req.baseUrl + '/advocates/fee-details', 
                'previous' : req.baseUrl + '/advocates/',
                'home' : req.baseUrl + '/advocates/'
            }
        });
});

router.post('/advocates/fee-details', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/fee-details`, 
        {
            links: {
                'next' : req.baseUrl + '/advocates/check-claim', 
                'previous' : req.baseUrl + '/advocates/case-details'
            },
            fee_type: utils.getFeeType(req.session.data.case_type)
        });
});

router.get('/advocates/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/check-claim`, 
        { 
            links: {
                'next' : req.baseUrl + '/advocates/certify-claim', 
                'previous' : req.baseUrl + '/advocates/fee-details'
            }
        });
});

router.get('/advocates/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/certify-claim`, 
        { 
            links: {
                'next' : req.baseUrl + '/advocates/thank-you', 
                'previous' : req.baseUrl + '/advocates/check-claim'
            }
        });
});

router.get('/advocates/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/thank-you`, 
    	{ 
            links: {
                'new' : req.baseUrl + '/advocates/case-details', 
        		'home' : req.baseUrl + '/advocates/'
            }            
    	});
});

// ==============================================
// LITIGATORS
// ==============================================

router.get('/litigators/', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/index`, 
        {
            links: {
                'start' : req.baseUrl + '/litigators/bill-type',
                'search': req.baseUrl + '/litigators/search',
                'outstanding': req.baseUrl + '/litigators/outstanding',
                'authorised': req.baseUrl + '/litigators/authorised'
            },
            claims: []
        });
});

router.get('/litigators/bill-type', function(req, res) {
    
    res.render(`${req.feature}/${req.version}/litigators/bill-type`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/details', 
                'previous' : req.baseUrl + '/litigators/',
                'home' : req.baseUrl + '/litigators/'
            }
        });
});

router.get('/litigators/details', function(req, res) {

    if (req.session.data.bill_type == "litigator_transfer") {
        
        res.redirect(`/${req.feature}/${req.version}/litigators/transfer-details`)

    } else {
        
        res.redirect(`/${req.feature}/${req.version}/litigators/case-details`)
            
    }

});

router.get('/litigators/transfer-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/transfer-details`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/case-details', 
                'previous' : req.baseUrl + '/litigators/bill-type',
                'home' : req.baseUrl + '/litigators/'
            }
            
        });
});

router.get('/litigators/case-details', function(req, res) {

    if (req.session.data.bill_type == "litigator_transfer") {

        var previousUrl = req.baseUrl + '/litigators/transfer-details'

    } else {
        
        var previousUrl = req.baseUrl + '/litigators/bill-type'

    }

    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/fee-details', 
                'previous' : previousUrl,
                'home' : req.baseUrl + '/litigators/'
            }
            
        });
});

router.get('/litigators/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/fee-details`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/check-claim', 
                'previous' : req.baseUrl + '/litigators/case-details'
            },
            fee_type: utils.getFeeType(req.session.data.case_type)
        });
});

router.get('/litigators/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/check-claim`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/certify-claim', 
                'previous' : req.baseUrl + '/litigators/fee-details'
            }            
        });
});

router.get('/litigators/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/certify-claim`, 
        { 
            links: {
                'next' : req.baseUrl + '/litigators/thank-you', 
                'previous' : req.baseUrl + '/litigators/check-claim'
            }
        });
});

router.get('/litigators/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/thank-you`, 
    	{ 
            links: {
                'new' : req.baseUrl + '/litigators/bill-type', 
        		'home' : req.baseUrl + '/litigators/'
            }
    	});
});

module.exports = router