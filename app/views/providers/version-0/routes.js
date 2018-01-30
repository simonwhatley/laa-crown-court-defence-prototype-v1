const express = require('express')
const router = new express.Router()

const utils = require('../../../utils')

router.get('/', (req, res) => {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// Add your routes here - above the module.exports line

// ==============================================
// ADVOCATES
// ==============================================

router.get('/advocates/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/case-details`, 
        {
            links: [
                {'next' : './fee-details'}, 
                {'previous' : '../advocates/'},
                {'home' : '../advocates/'}
            ]
        });
});

router.get('/advocates/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/fee-details`, 
        {
            links: [ 
                {'next' : './check-claim'}, 
                {'previous' : '../case-details'}
            ]
        });
});

router.get('/advocates/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/check-claim`, 
        { 
            links: [
                {'next' : './certify-claim'}, 
                {'previous' : '../fee-details'}
            ]
        });
});

router.get('/advocates/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/certify-claim-claim`, 
        { 
            links: [
                {'next' : './thank-you'}, 
                {'previous' : '../check-claim'}
            ]
        });
});

router.get('/advocates/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/thank-you`, 
    	{ 
            links: [
        		{'new_claim' : './case-details'}, 
        		{'your_claims' : './'}
            ]
    	});
});

// ==============================================
// LITIGATORS
// ==============================================

router.get('/litigators/bill-type', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            links: [
                {'next' : './case-details'}, 
                {'previous' : '../litigators/'},
                {'home' : '../litigators/'}
            ]
        });
});

router.get('/litigators/transfer-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            links: [
                {'next' : './case-details'}, 
                {'previous' : './bill-type'},
                {'home' : '../litigators/'}
            ]
        });
});

router.get('/litigators/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
        { 
            links: [
                {'next' : './fee-details'}, 
                {'previous' : '../litigators/'},
                {'home' : '../litigators/'}
            ]
        });
});

router.get('/litigators/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/fee-details`, 
        { 
            links: [
                {'next' : './check-claim'}, 
                {'previous' : '../case-details'}
            ]
        });
});

router.get('/litigators/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/check-claim`, 
        { 
            links: [
                {'next' : './certify-claim'}, 
                {'previous' : '../fee-details'}
            ]
        });
});

router.get('/litigators/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/certify-claim-claim`, 
        { 
            links: [
                {'next' : './thank-you'}, 
                {'previous' : '../check-claim'}
            ]
        });
});

router.get('/litigators/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/thank-you`, 
    	{ 
            links: [
        		{'new_claim' : './case-details'}, 
        		{'your_claims' : './'}
            ]
    	});
});

// Add your routes above this line

module.exports = router