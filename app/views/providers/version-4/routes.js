const express = require('express')
const router = new express.Router()

const utils = require('./utils')

// ==============================================
// COMMON
// ==============================================

// Route to the start (sign in) page
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`);
})

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

router.get('/data/offences/9/categories', function (req, res) {
    var data = { output: utils.getOffenceCategoriesScheme9(req.session.data.class[0]) , selected: req.session.data.offence_category }
    res.json(data)
})

router.get('/data/offences/10/bands', function (req, res) {
    var data = { output: utils.getOffenceBandsScheme10(req.session.data.class[0]) , selected: req.session.data.offence_band }
    res.json(data)
})

router.get('/data/offences/10/categories', function (req, res) {
    var data = { output: utils.getOffenceCategoriesScheme10(req.session.data.class[0], req.session.data.band[0]) , selected: req.session.data.offence_category }
    res.json(data)
})

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
    res.render(`${req.feature}/${req.version}/advocates/bill-type`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/case-details',
                'previous' : req.baseUrl + '/advocates/',
                'home' : req.baseUrl + '/advocates/',
                'cancel' : req.baseUrl + '/advocates/cancel'
            }
        });
});

router.get('/advocates/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/case-details`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/defendant-details',
                'previous' : req.baseUrl + '/advocates/bill-type',
                'home' : req.baseUrl + '/advocates/',
                'save' : req.baseUrl + '/advocates/'
            },
            case_types: utils.getCaseTypesByFeeScheme(req.session.data.fee_scheme),
            courts: utils.getCourts()
        });
});

router.get('/advocates/defendant-details', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var nextUrl = req.baseUrl + '/advocates/fees'

        req.session.data.fee_type = 'fixed'

    } else {

        var nextUrl = req.baseUrl + '/advocates/offence-details'

        req.session.data.fee_type = 'graduated'

    }

    res.render(`${req.feature}/${req.version}/advocates/defendant-details`,
    	{
            links: {
                'next' : nextUrl,
                'previous' : req.baseUrl + '/advocates/case-details',
                'save' : req.baseUrl + '/advocates/'
            }
    	});
});

router.get('/advocates/offence-details', function(req, res) {

    // TODO: delete offence keys prior to re-running
    delete req.session.data.depdrop_all_params

    // TODO: Nasty code! There must be a better way
    if (req.session.data.representation_order_date_year >= 2018 && req.session.data.representation_order_date_month >= 4 && req.session.data.representation_order_date_day >= 1) {
        var classes = utils.getOffenceClassesScheme10()
    } else {
        var classes = utils.getOffenceClassesScheme9()
    }

    res.render(`${req.feature}/${req.version}/advocates/offence-details`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'save' : req.baseUrl + '/advocates/',
                'new' : req.baseUrl + '/advocates/start',
                'home' : req.baseUrl + '/advocates/'
            },
            classes: classes
    	});

});

router.get('/advocates/fees', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var previousUrl = req.baseUrl + '/advocates/defendant-details'

    } else {

        var previousUrl = req.baseUrl + '/advocates/offence-details'

    }

    if (req.session.data.bill_type == "advocate_interim") {

        res.render(`${req.feature}/${req.version}/advocates/interim-fees`,
            {
                links: {
                    'next' : req.baseUrl + '/advocates/travel-expenses',
                    'previous' : previousUrl,
                    'save' : req.baseUrl + '/advocates/',
                    'new' : req.baseUrl + '/advocates/start',
                    'home' : req.baseUrl + '/advocates/'
                }
            });

    } else {

        if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

            res.render(`${req.feature}/${req.version}/advocates/fixed-fees`,
                 {
                    links: {
                        'next' : req.baseUrl + '/advocates/miscellaneous-fees',
                        'previous' : previousUrl,
                        'save' : req.baseUrl + '/advocates/'
                    }
                 });

        } else {

            res.render(`${req.feature}/${req.version}/advocates/graduated-fees`,
                {
                    links: {
                        'next' : req.baseUrl + '/advocates/miscellaneous-fees',
                        'previous' : previousUrl,
                        'save' : req.baseUrl + '/advocates/'
                    }
                });

        }
    }

});

router.get('/advocates/miscellaneous-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/miscellaneous-fees`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/travel-expenses',
                'previous' : req.baseUrl + '/advocates/fees',
                'save' : req.baseUrl + '/advocates/'
            },
            fees: utils.getMiscellaneousFees(req.session.data.fee_scheme, req.session.data.fee_scheme_version)
    	});
});

router.get('/advocates/travel-expenses', function(req, res) {

    if (req.session.data.bill_type == "advocate_interim") {

        var previousUrl = req.baseUrl + '/advocates/fees'

    } else {

        var previousUrl = req.baseUrl + '/advocates/miscellaneous-fees'

    }

    res.render(`${req.feature}/${req.version}/advocates/travel-expenses`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/supporting-evidence',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/advocates/'
            },
            travel_types: utils.getTravelTypes(req.session.data.fee_scheme),
            travel_reasons: utils.getTravelReasons()
    	});
});

router.get('/advocates/supporting-evidence', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/supporting-evidence`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/additional-information',
                'previous' : req.baseUrl + '/advocates/travel-expenses',
                'save' : req.baseUrl + '/advocates/'
            }
    	});
});

router.get('/advocates/additional-information', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/additional-information`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/claim-summary',
                'previous' : req.baseUrl + '/advocates/supporting-evidence',
                'save' : req.baseUrl + '/advocates/'
            }
    	});
});

router.get('/advocates/claim-summary', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/claim-summary`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/certify-claim',
                'previous' : req.baseUrl + '/advocates/additional-information',
                'save' : req.baseUrl + '/advocates/'
            }
    	});
});

router.get('/advocates/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/certify-claim`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/thank-you',
                'previous' : req.baseUrl + '/advocates/claim-summary',
                'save' : req.baseUrl + '/advocates/'
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

router.get('/advocates/cancel', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/advocates/`);
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
                'home' : req.baseUrl + '/litigators/',
                'cancel' : req.baseUrl + '/litigators/cancel'
            }

    	});
});

router.get('/litigators/details', function(req, res) {

    if (req.session.data.bill_type == "litigator_transfer") {

        res.redirect(`/${req.feature}/${req.version}/litigators/transfer-details`);

    } else {

        res.redirect(`/${req.feature}/${req.version}/litigators/case-details`);

    }

});

router.get('/litigators/transfer-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/transfer-details`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/case-details',
                'previous' : req.baseUrl + '/litigators/bill-type',
                'home' : req.baseUrl + '/litigators/',
                'save' : req.baseUrl + '/litigators/',
                'cancel' : req.baseUrl + '/litigators/cancel'
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
                'next' : req.baseUrl + '/litigators/defendant-details',
                'previous' : previousUrl,
                'home' : req.baseUrl + '/litigators/',
                'save' : req.baseUrl + '/litigators/',
                'cancel' : req.baseUrl + '/litigators/cancel'
            },
            case_types: utils.getCaseTypesByFeeScheme(req.session.data.fee_scheme),
            courts: utils.getCourts()

    	});
});

router.get('/litigators/defendant-details', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var nextUrl = req.baseUrl + '/litigators/fees'

        req.session.data.fee_type = 'fixed'

    } else {

        var nextUrl = req.baseUrl + '/litigators/offence-details'

        req.session.data.fee_type = 'graduated'

    }

    res.render(`${req.feature}/${req.version}/litigators/defendant-details`,
    	{
            links: {
                'next' : nextUrl,
                'previous' : req.baseUrl + '/litigators/case-details',
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/offence-details', function(req, res) {

    res.render(`${req.feature}/${req.version}/litigators/offence-details`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/fees',
                'previous' : req.baseUrl + '/litigators/defendant-details',
                'save' : req.baseUrl + '/litigators/'
            },
            classes: utils.getOffenceClassesScheme9()
    	});

});

router.get('/litigators/fees', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var previousUrl = req.baseUrl + '/litigators/defendant-details'

    } else {

        var previousUrl = req.baseUrl + '/litigators/offence-details'

    }

    if (req.session.data.bill_type == "litigator_interim") {

        res.render(`${req.feature}/${req.version}/litigators/interim-fees`,
            {
                links: {
                    'next' : req.baseUrl + '/litigators/disbursements',
                    'previous' : previousUrl,
                    'save' : req.baseUrl + '/litigators/'
                }
            });

    } else if (req.session.data.bill_type == "litigator_transfer") {

        res.render(`${req.feature}/${req.version}/litigators/transfer-fees`,
            {
                links: {
                    'next' : req.baseUrl + '/litigators/miscellaneous-fees',
                    'previous' : previousUrl,
                    'save' : req.baseUrl + '/litigators/'
                }
            });

    } else {

        if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

            res.render(`${req.feature}/${req.version}/litigators/fixed-fees`,
                {
                    links: {
                        'next' : req.baseUrl + '/litigators/miscellaneous-fees',
                        'previous' : previousUrl,
                        'save' : req.baseUrl + '/litigators/'
                    }
                });

        } else {

            res.render(`${req.feature}/${req.version}/litigators/graduated-fees`,
                {
                    links: {
                        'next' : req.baseUrl + '/litigators/miscellaneous-fees',
                        'previous' : previousUrl,
                        'save' : req.baseUrl + '/litigators/'
                    }
                });

        }

    }

});

router.get('/litigators/miscellaneous-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/miscellaneous-fees`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/disbursements',
                'previous' : req.baseUrl + '/litigators/fees',
                'save' : req.baseUrl + '/litigators/'
            },
            fees: utils.getMiscellaneousFees(req.session.data.fee_scheme, req.session.data.fee_scheme_version)
    	});
});

router.get('/litigators/disbursements', function(req, res) {
    
    if (req.session.data.bill_type == "litigator_interim") {

        var previousUrl = req.baseUrl + '/litigators/fees'

    } else {

        var previousUrl = req.baseUrl + '/litigators/miscellaneous-fees'

    }

    res.render(`${req.feature}/${req.version}/litigators/disbursements`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/travel-expenses',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/litigators/'
            },
            disbursements: utils.getDisbursements(req.session.data.fee_scheme, req.session.data.fee_scheme_version)
    	});
});

router.get('/litigators/travel-expenses', function(req, res) {

    if (req.session.data.bill_type == "litigator_transfer") {

        var previousUrl = req.baseUrl + '/litigators/fees'

    } else {

        var previousUrl = req.baseUrl + '/litigators/disbursements'

    }

    res.render(`${req.feature}/${req.version}/litigators/travel-expenses`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/supporting-evidence',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/supporting-evidence', function(req, res) {

    res.render(`${req.feature}/${req.version}/litigators/supporting-evidence`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/additional-information',
                'previous' : req.baseUrl + '/litigators/travel-expenses',
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/additional-information', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/additional-information`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/claim-summary',
                'previous' : req.baseUrl + '/litigators/supporting-evidence',
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/claim-summary', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/claim-summary`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/certify-claim',
                'previous' : req.baseUrl + '/litigators/additional-information',
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/certify-claim`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/thank-you',
                'previous' : req.baseUrl + '/litigators/claim-summary',
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/thank-you`,
    	{
            links: {
                'new' : req.baseUrl + '/litigators/start',
                'home' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/cancel', function(req, res) {
    req.session.destroy()
    res.redirect(`/${req.feature}/${req.version}/litigators/`);
});

module.exports = router