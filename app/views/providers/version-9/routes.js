const express = require('express')
const router = new express.Router()

const utils = require('./utils')

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

    if (utils.authenticate("provider", req.session.data.username) == "advocates") {

        res.redirect(`/${req.feature}/${req.version}/advocates/`);

    } else if (utils.authenticate("provider", req.session.data.username) == "litigators") {

        req.session.data.settings = utils.getDummyProvider(311);

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
    var data = { output: utils.getOffenceCategoriesScheme9(req.session.data.class[0]) , selected: req.session.data.offence_category };
    res.json(data);
})

router.get('/data/offences/10/bands', function (req, res) {
    var data = { output: utils.getOffenceBandsScheme10(req.session.data.class[0]) , selected: req.session.data.offence_band };
    res.json(data);
})

router.get('/data/offences/10/categories', function (req, res) {
    var data = { output: utils.getOffenceCategoriesScheme10(req.session.data.class[0], req.session.data.band[0]) , selected: req.session.data.offence_category };
    res.json(data);
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
            claims: utils.getClaims('agfs')
        });
});

router.get('/advocates/start', function(req, res) {
    req.session.destroy();
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

    if (req.session.data.referrer == 'summary') {
        var nextUrl = req.baseUrl + '/advocates/claim-summary'
    } else {
        var nextUrl = req.baseUrl + '/advocates/defendant-details'
    }

    res.render(`${req.feature}/${req.version}/advocates/case-details`,
        {
            links: {
                'next' : nextUrl,
                'previous' : req.baseUrl + '/advocates/bill-type',
                'home' : req.baseUrl + '/advocates/',
                'save' : req.baseUrl + '/advocates/'
            },
            case_types: utils.getCaseTypesByFeeScheme(req.session.data.fee_scheme),
            courts: utils.getCrownCourts()
        });
});

router.get('/advocates/defendant-details', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var nextUrl = req.baseUrl + '/advocates/fees'

        req.session.data.fee_type = 'fixed'

    } else {

        if (req.session.data.bill_type == 'advocate_supplementary') {

            var nextUrl = req.baseUrl + '/advocates/miscellaneous-fees'

        } else {

            var nextUrl = req.baseUrl + '/advocates/offence-details'

        }

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

    // TODO: Nasty code! There must be a better way
    if (req.session.data.defendant_1_representation_order_date_1_year >= 2018 && req.session.data.defendant_1_representation_order_date_1_month >= 4 && req.session.data.defendant_1_representation_order_date_1_day >= 1) {

        res.render(`${req.feature}/${req.version}/advocates/offence-details-scheme-10`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'filter': req.baseUrl + '/advocates/offence-details',
                'clear': req.baseUrl + '/advocates/clear/offences'
            },
            offences: utils.getOffencesScheme10(),
            offence: utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)
        });

    } else {

        delete req.session.data.depdrop_all_params

        res.render(`${req.feature}/${req.version}/advocates/offence-details`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'save' : req.baseUrl + '/advocates/',
                'new' : req.baseUrl + '/advocates/start',
                'home' : req.baseUrl + '/advocates/'
            },
            offences: utils.getOffenceClassesScheme9()
        });

    }

});

router.get('/advocates/offence-details/:class([0-9]+)', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/offence-details-scheme-10`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'filter': req.baseUrl + '/advocates/offence-details',
                'clear': req.baseUrl + '/advocates/clear/offences'
            },
            type: "class",
            offences: utils.getOffencesScheme10ByClassId(req.params.class),
            offence: utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)
        });

});

router.get('/advocates/offence-details/:class([0-9]+)/:band([0-9]+)', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/offence-details-scheme-10`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'filter': req.baseUrl + '/advocates/offence-details',
                'clear': req.baseUrl + '/advocates/clear/offences'
            },
            type: "band",
            offences: utils.getOffencesScheme10ByBandId(req.params.class, req.params.band),
            offence: utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)
        });

});

router.get('/advocates/offence-details/act/:act([0-9]+)', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/offence-details-scheme-10`,
        {
            links: {
                'next' : req.baseUrl + '/advocates/fees',
                'previous' : req.baseUrl + '/advocates/defendant-details',
                'filter': req.baseUrl + '/advocates/offence-details',
                'clear': req.baseUrl + '/advocates/clear/offences'
            },
            type: "act",
            offences: utils.getOffencesScheme10ByActId(req.params.act),
            offence: utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)
        });

});

router.get('/advocates/fees', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var previousUrl = req.baseUrl + '/advocates/defendant-details'

    } else {

        var previousUrl = req.baseUrl + '/advocates/offence-details'

    }

    if (req.session.data.defendant_1_representation_order_date_1_year >= 2018 && req.session.data.defendant_1_representation_order_date_1_month >= 4 && req.session.data.defendant_1_representation_order_date_1_day >= 1) {

        req.session.data.fee_scheme_version = '10'
        var offence = utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)

    } else {

        req.session.data.fee_scheme_version = '9'
        var offence = { "class_label": utils.getOffenceScheme9ClassName(req.session.data.offence_class), "category_label": utils.getOffenceScheme9CategoryName(req.session.data.offence_class, req.session.data.offence_category) }

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
                    },
                    fixed_fees: utils.getFixedFees(req.session.data.fee_scheme, req.session.data.fee_scheme_version),
                    fee_scheme_version: req.session.data.fee_scheme_version
                 });

        } else {

            res.render(`${req.feature}/${req.version}/advocates/graduated-fees-v2`,
                {
                    links: {
                        'next' : req.baseUrl + '/advocates/miscellaneous-fees',
                        'previous' : previousUrl,
                        'save' : req.baseUrl + '/advocates/'
                    },
                    offence: offence,
                    fee_scheme_version: req.session.data.fee_scheme_version
                });

        }
    }

});

router.get('/advocates/miscellaneous-fees', function(req, res) {

    if (req.session.data.bill_type == 'advocate_supplementary') {

        if (req.session.data.defendant_1_representation_order_date_1_year >= 2018 && req.session.data.defendant_1_representation_order_date_1_month >= 4 && req.session.data.defendant_1_representation_order_date_1_day >= 1) {

            req.session.data.fee_scheme_version = '10'

        } else {

            req.session.data.fee_scheme_version = '9'

        }

        var previousUrl = req.baseUrl + '/advocates/defendant-details'
        var miscFees = utils.getMiscellaneousFeesAlternate(req.session.data.fee_scheme, req.session.data.fee_scheme_version)

    } else {

        var previousUrl = req.baseUrl + '/advocates/fees'
        var miscFees = utils.getMiscellaneousFees(req.session.data.fee_scheme, req.session.data.fee_scheme_version, req.session.data.bill_type)

    }

    res.render(`${req.feature}/${req.version}/advocates/miscellaneous-fees`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/travel-expenses',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/advocates/'
            },
            fees: miscFees,
            fee_scheme_version: req.session.data.fee_scheme_version
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
            travel_reasons: utils.getTravelReasons('lgfs'),
            crown_courts: utils.getCrownCourts(),
            magistrates_courts: utils.getMagistratesCourts(),
            prisons: utils.getPrisons(),
            hospitals: utils.getSecureHospitals()
    	});
});

router.get('/advocates/supporting-evidence', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/supporting-evidence`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/claim-summary',
                'previous' : req.baseUrl + '/advocates/travel-expenses',
                'save' : req.baseUrl + '/advocates/'
            }
    	});
});

router.get('/advocates/claim-summary', function(req, res) {

    if (req.session.data.fee_scheme_version == 10) {

        var offence = utils.getOffenceScheme10(req.session.data.offence_class, req.session.data.offence_band, req.session.data.offence_category)

    } else {

        var offence = { "class_label": utils.getOffenceScheme9ClassName(req.session.data.offence_class), "category_label": utils.getOffenceScheme9CategoryName(req.session.data.offence_class, req.session.data.offence_category) }

    }

    if (req.session.data.bill_type == 'advocate_supplementary') {

        var miscFees = utils.getMiscellaneousFeesAlternate(req.session.data.fee_scheme, req.session.data.fee_scheme_version, req.session.data.bill_type)

    } else {

        var miscFees = utils.getMiscellaneousFees(req.session.data.fee_scheme, req.session.data.fee_scheme_version, req.session.data.bill_type)

    }

    res.render(`${req.feature}/${req.version}/advocates/claim-summary`,
    	{
            links: {
                'next' : req.baseUrl + '/advocates/certify-claim',
                'previous' : req.baseUrl + '/advocates/supporting-evidence',
                'save' : req.baseUrl + '/advocates/',
                'case_details' : req.baseUrl + '/advocates/case-details' + '?referrer=summary',
                'defendant_details' : req.baseUrl + '/advocates/defendant-details' + '?referrer=summary',
                'offence_details' : req.baseUrl + '/advocates/offence-details' + '?referrer=summary',
                'fees' : req.baseUrl + '/advocates/fees' + '?referrer=summary',
                'miscellaneous_fees' : req.baseUrl + '/advocates/miscellaneous-fees' + '?referrer=summary',
                'travel_expenses' : req.baseUrl + '/advocates/travel-expenses' + '?referrer=summary',
                'supporting_evidence' : req.baseUrl + '/advocates/supporting-evidence' + '?referrer=summary',
                'additional_information' : req.baseUrl + '/advocates/supporting-evidence' + '?referrer=summary#additional-information'
            },
            offence: offence,
            fees: miscFees
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

router.get('/advocates/clear/offences', function(req, res) {
    delete req.session.data.offence_class
    delete req.session.data.offence_band
    delete req.session.data.offence_category
    res.redirect(`/${req.feature}/${req.version}/advocates/offence-details`);
});

// :claim_id([AST]{1}[0-9]{8})
router.get('/advocates/:claim_id([0-9]+)/details', function(req, res) {

    // TODO: if claim id not valid, send back to all claims list
    res.render(`${req.feature}/${req.version}/advocates/claim-details`,
        {
            links: {
                'home' : req.baseUrl + '/advocates/'
            },
            claim: utils.getClaim('agfs', req.params.claim_id)
        });
});

// ==============================================
// LITIGATORS – Claims
// ==============================================

router.get('/litigators/', function(req, res) {
    req.session.data.settings = utils.getDummyProvider(311);
    res.render(`${req.feature}/${req.version}/litigators/index`,
        {
            links: {
                'start' : req.baseUrl + '/litigators/start',
                'search': req.baseUrl + '/litigators/search',
                'outstanding': req.baseUrl + '/litigators/outstanding',
                'authorised': req.baseUrl + '/litigators/authorised'
            },
            claims: utils.getClaims('lgfs')
        });
});

router.get('/litigators/start', function(req, res) {
    req.session.destroy();
    res.redirect(`/${req.feature}/${req.version}/litigators/bill-type`);
});

router.get('/litigators/bill-type', function(req, res) {
    req.session.data.settings = utils.getDummyProvider(311);
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
            courts: utils.getCrownCourts(),
            provider: utils.getProvider(12345)
    	});
});

router.get('/litigators/defendant-details', function(req, res) {

    if (utils.isFixedFee(req.session.data.fee_scheme, req.session.data.case_type)) {

        var nextUrl = req.baseUrl + '/litigators/fees'

        req.session.data.fee_type = 'fixed'

    } else {

        if (req.session.data.bill_type == 'litigator_supplementary') {

            var nextUrl = req.baseUrl + '/litigators/miscellaneous-fees'

        } else {

            var nextUrl = req.baseUrl + '/litigators/offence-details'

            req.session.data.fee_type = 'graduated'

        }

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
            offences: utils.getOffenceClassesScheme9()
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

    if (req.session.data.bill_type == "litigator_supplementary") {

        var previousUrl = req.baseUrl + '/litigators/defendant-details'
        var nextUrl = req.baseUrl + '/litigators/supporting-evidence'

    } else {

        var previousUrl = req.baseUrl + '/litigators/fees'
        var nextUrl = req.baseUrl + '/litigators/disbursements'

    }


    res.render(`${req.feature}/${req.version}/litigators/miscellaneous-fees`,
    	{
            links: {
                'next' : nextUrl,
                'previous' : previousUrl,
                'save' : req.baseUrl + '/litigators/'
            },
            fees: utils.getMiscellaneousFees(req.session.data.fee_scheme, '9')
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

    // console.log(utils.getDummySupplier(1078,req.session.data.supplier_number));

    res.render(`${req.feature}/${req.version}/litigators/travel-expenses`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/supporting-evidence',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/litigators/'
            },
            travel_types: utils.getTravelTypes(req.session.data.fee_scheme),
            travel_reasons: utils.getTravelReasons('lgfs'),
            travel_origin: utils.getDummySupplier(311,req.session.data.supplier_number)[0].address.postcode,
            crown_courts: utils.getCrownCourts(),
            magistrates_courts: utils.getMagistratesCourts(),
            prisons: utils.getPrisons(),
            hospitals: utils.getSecureHospitals()
    	});
});

router.get('/litigators/supporting-evidence', function(req, res) {

    if (req.session.data.bill_type == "litigator_supplementary") {

        // console.log(typeof Number(req.session.data.special_preparation_fee_pages_of_evidence))
        // console.log(Number(req.session.data.special_preparation_fee_pages_of_evidence)<10000)
        // console.log(`/${req.feature}/${req.version}/litigators/claim-summary`)
        // console.log(req.baseUrl)

        var previousUrl = req.baseUrl + '/litigators/miscellaneous-fees';

        // if (Number(req.session.data.special_preparation_fee_pages_of_evidence) < 10000) {

        //     res.redirect(`/${req.feature}/${req.version}/litigators/claim-summary`);

        // }

    } else {

        var previousUrl = req.baseUrl + '/litigators/travel-expenses';

    }

    res.render(`${req.feature}/${req.version}/litigators/supporting-evidence`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/claim-summary',
                'previous' : previousUrl,
                'save' : req.baseUrl + '/litigators/'
            }
    	});
});

router.get('/litigators/claim-summary', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/claim-summary`,
    	{
            links: {
                'next' : req.baseUrl + '/litigators/certify-claim',
                'previous' : req.baseUrl + '/litigators/supporting-evidence',
                'save' : req.baseUrl + '/litigators/',
                'case_details' : req.baseUrl + '/litigators/case-details' + '?referrer=summary',
                'transfer_details' : req.baseUrl + '/litigators/transfer-details' + '?referrer=summary',
                'defendant_details' : req.baseUrl + '/litigators/defendant-details' + '?referrer=summary',
                'offence_details' : req.baseUrl + '/litigators/offence-details' + '?referrer=summary',
                'fees' : req.baseUrl + '/litigators/fees' + '?referrer=summary',
                'miscellaneous_fees' : req.baseUrl + '/litigators/miscellaneous-fees' + '?referrer=summary',
                'disbursements' : req.baseUrl + '/litigators/miscellaneous-fees' + '?referrer=summary',
                'travel_expenses' : req.baseUrl + '/litigators/travel-expenses' + '?referrer=summary',
                'supporting_evidence' : req.baseUrl + '/litigators/supporting-evidence' + '?referrer=summary',
                'additional_information' : req.baseUrl + '/litigators/supporting-evidence' + '?referrer=summary#additional-information'
            },
            offence: { "class_label": utils.getOffenceScheme9ClassName(req.session.data.offence_class), "category_label": utils.getOffenceScheme9CategoryName(req.session.data.offence_class, req.session.data.offence_category) }
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
    req.session.destroy();
    req.session.data.settings = utils.getDummyProvider(311);
    res.redirect(`/${req.feature}/${req.version}/litigators/`);
});

router.get('/litigators/claim-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/claim-details`,
        {
            links: {
                // 'new' : req.baseUrl + '/litigators/start',
                // 'home' : req.baseUrl + '/litigators/'
            },
            messages: []
        });
});

// ==============================================
// LITIGATORS – Settings
// ==============================================

router.get('/litigators/settings', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/settings/index`,
        {
            links: {
                'edit_provider' : req.baseUrl + '/litigators/settings/provider',
                'edit_user' : req.baseUrl + '/litigators/settings/user',
                'add_user' : req.baseUrl + '/litigators/settings/user/add'
            }
            // ,
            // messages: {
            //     text: 'Huzzah! You saved the provider details'
            // },
            // errors: {
            //     text: 'Boo! Something went wrong'
            // },
            // warnings: {
            //     text: 'Umm! Something wasn\'t quite right, but no matter'
            // }
        });
});

router.get('/litigators/settings/provider', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/settings/provider-form`,
        {
            links: {
                'save' : req.baseUrl + '/litigators/settings' + '?success=true',
                'cancel' : req.baseUrl + '/litigators/settings',
                'back' : req.baseUrl + '/litigators/settings'
            }
        });
});

router.get('/litigators/settings/user/:claim_id([0-9]+)/', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/settings/user-form`,
        {
            links: {
                'save' : req.baseUrl + '/litigators/settings' + '?success=true',
                'cancel' : req.baseUrl + '/litigators/settings',
                'back' : req.baseUrl + '/litigators/settings'
            },
            user: []
        });
});

router.get('/litigators/settings/user/add', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/settings/user-form`,
        {
            links: {
                'save' : req.baseUrl + '/litigators/settings' + '?success=true',
                'cancel' : req.baseUrl + '/litigators/settings',
                'back' : req.baseUrl + '/litigators/settings'
            }
        });
});

module.exports = router