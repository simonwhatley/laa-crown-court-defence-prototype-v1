const express = require('express')
const router = new express.Router()

const utils = require('./utils')

router.get('/', (req, res) => {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`)
});

router.get('/sign-in', function(req, res) {
    res.render(`${req.feature}/${req.version}/sign-in`,
        {
            proposition_links: "hide"
        });
});

router.get('/auth', function(req, res) {

    if (utils.authenticate("provider", req.session.data.username) == "advocates") {

        res.redirect(`/${req.feature}/${req.version}/advocates/`);

    } else if (utils.authenticate("provider", req.session.data.username) == "litigators") {

        res.redirect(`/${req.feature}/${req.version}/litigators/`);

    } else {

        // TODO: Check user input for errors

        res.render(`${req.feature}/${req.version}/sign-in`,
            {
                errors: {
                    username: "Enter a valid email address",
                    password: "Enter a valid password"
            }
        });

        // res.redirect('sign-in')
    }

});

router.get('/sign-out', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/sign-in`);
});

// ==============================================
// Data
// ==============================================

router.get('/data/offences/9/classes', function (req, res) {
    var data = { output: utils.getOffenceClasses(req.session.data.category[0]) , selected: req.session.data.offence_class }
    res.json(data)
});

// ==============================================
// ADVOCATES
// ==============================================

router.get('/advocates/', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/index`,
        {
            links: {
                'start' : req.baseUrl + '/advocates/start',
                'search': req.baseUrl + '/advocates/search',
                'outstanding': req.baseUrl + '/advocates/outstanding',
                'authorised': req.baseUrl + '/advocates/authorised'
            },
            claims: []
        });
});

router.get('/advocates/start', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/advocates/bill-type`);
});

router.get('/advocates/bill-type', function(req, res) {
    req.session.data.bill_type = 'advocate_final'
    res.redirect(`/${req.feature}/${req.version}/advocates/case-details`);
});

router.get('/advocates/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/case-details`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fee-details',
                'previous' : req.baseUrl + '/advocates/',
                'home' : req.baseUrl + '/advocates/'
            },
            case_types: utils.getCaseTypesByFeeScheme('agfs'),
            courts: utils.getCourts(),
            offences: utils.getOffenceCategories()
        });
});

router.get('/advocates/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/fee-details`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/check-claim',
                'previous' : req.baseUrl + '/advocates/case-details'
            },
            fee_type: utils.getFeeTypeForCaseType(req.session.data.case_type),
            fixed_fees: utils.getFixedFees('agfs','9'),
            misc_fees: utils.getMiscellaneousFees('agfs','9'),
            travel_types: utils.getTravelTypes('agfs'),
            travel_reasons: utils.getTravelReasons()
        });
});

router.get('/advocates/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/check-claim`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/certify-claim',
                'previous' : req.baseUrl + '/advocates/fee-details'
            },
            offence: { "category_label": utils.getOffenceCategoryName(req.session.data.offence_category), "class_label": utils.getOffenceClassName(req.session.data.offence_class, req.session.data.offence_category) }
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
                'new' : req.baseUrl + '/advocates/start',
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
                'start' : req.baseUrl + '/litigators/start',
                'search': req.baseUrl + '/litigators/search',
                'outstanding': req.baseUrl + '/litigators/outstanding',
                'authorised': req.baseUrl + '/litigators/authorised'
            },
            claims: []
        });
});

router.get('/litigators/start', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/litigators/bill-type`);
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
            },
            transfer_reasons: utils.getTransferReasons()
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
            },
            case_types: utils.getCaseTypesByFeeScheme('lgfs'),
            courts: utils.getCourts(),
            offences: utils.getOffenceCategories()
        });
});

router.get('/litigators/fee-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/fee-details`,
        {
            links: {
                'next' : req.baseUrl + '/litigators/check-claim',
                'previous' : req.baseUrl + '/litigators/case-details'
            },
            fee_type: utils.getFeeTypeForCaseType(req.session.data.case_type),
            fixed_fees: utils.getFixedFees('lgfs','9'),
            misc_fees: utils.getMiscellaneousFees('lgfs','9'),
            disbursements: utils.getDisbursements('lgfs','9'),
            travel_types: utils.getTravelTypes('lgfs'),
            travel_reasons: utils.getTravelReasons()
        });
});

router.get('/litigators/check-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/check-claim`,
        {
            links: {
                'next' : req.baseUrl + '/litigators/certify-claim',
                'previous' : req.baseUrl + '/litigators/fee-details'
            },
            offence: { "category_label": utils.getOffenceCategoryName(req.session.data.offence_category), "class_label": utils.getOffenceClassName(req.session.data.offence_class, req.session.data.offence_category) }
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