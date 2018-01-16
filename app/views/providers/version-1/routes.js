const express = require('express')
const router = express.Router()

// Route index page
// router.get('/', function (req, res) {
//   res.render('index')
// })

// Route to the start (sign in) page
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// Add your routes here - above the module.exports line

// ADVOCATES

router.get('/advocates/case-details', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/case-details`, 
        { 
            'next_url' : './defendant-details', 
            'previous_url' : '../advocates/',
            'home_url' : '../advocates/'
        });
});

router.get('/advocates/defendant-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/defendant-details`, 
    	{ 
    		'next_url' : './offence-details', 
    		'previous_url' : './case-details' 
    	});
});

router.get('/advocates/offence-details', function(req, res) {
    
    res.render(`${req.feature}/${req.version}/advocates/offence-details`, 
    	{ 
    		'next_url' : './fees', 
    		'previous_url' : './defendant-details' 
    	});

});


router.get('/advocates/fees', function(req, res) {

    res.render(`${req.feature}/${req.version}/advocates/fixed-fees`, 
        { 
            'next_url' : './miscellaneous-fees', 
            'previous_url' : './offence-details' 
        });

    // res.render(`${req.feature}/${req.version}/advocates/graduated-fees`, 
    //  { 
    //      'next_url' : './miscellaneous-fees', 
    //      'previous_url' : './offence-details' 
    //  });
});

// router.get('/advocates/fixed-fees', function(req, res) {
//     res.render(`${req.feature}/${req.version}/advocates/fixed-fees`, 
//     	{ 
//     		'next_url' : './miscellaneous-fees', 
//     		'previous_url' : './offence-details' 
//     	});
// });

// router.get('/advocates/graduated-fees', function(req, res) {
//     res.render(`${req.feature}/${req.version}/advocates/graduated-fees`, 
//     	{ 
//     		'next_url' : './miscellaneous-fees', 
//     		'previous_url' : './offence-details' 
//     	});
// });

router.get('/advocates/miscellaneous-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/miscellaneous-fees`, 
    	{ 
    		'next_url' : './travel-expenses', 
    		'previous_url' : './fees' 
    	});
});

router.get('/advocates/travel-expenses', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/travel-expenses`, 
    	{ 
    		'next_url' : './supporting-evidence', 
    		'previous_url' : './miscellaneous-fees' 
    	});
});

router.get('/advocates/supporting-evidence', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/supporting-evidence`, 
    	{ 
    		'next_url' : './additional-information', 
    		'previous_url' : './travel-expenses' 
    	});
});

router.get('/advocates/additional-information', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/additional-information`, 
    	{ 
    		'next_url' : './claim-summary', 
    		'previous_url' : './supporting-evidence' 
    	});
});

router.get('/advocates/claim-summary', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/claim-summary`, 
    	{ 
    		'next_url' : './certify-claim', 
    		'previous_url' : './additional-information' 
    	});
});

router.get('/advocates/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/certify-claim`, 
    	{ 
    		'next_url' : './thank-you', 
    		'previous_url' : './claim-summary' 
    	});
});

router.get('/advocates/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/thank-you`, 
    	{ 
    		'new_claim_url' : './case-details', 
    		'your_claims_url' : './' 
    	});
});


// LITIGATORS

router.get('/litigators/bill-type', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/bill-type`, 
    	{ 
    		'next_url' : './case-details', 
    		'previous_url' : './litigators/',
    		'home_url' : './litigators/' 
    	});
});

// if (req.query.bill_type === 'litigator_transfer') {
//     var next_url = '/litigators/transfer-details';
// } else {
//     var next_url = '/litigators/case-details';
// }

// TODO: If bill_type is transfer

router.get('/litigators/transfer-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/transfer-details`, 
    	{ 
    		'next_url' : './case-details', 
    		'previous_url' : './bill-type',
    		'home_url' : './litigators/' 
    	});
});

// TODO: Else bill_type is final|interim

router.get('/litigators/case-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/case-details`, 
    	{ 
    		'next_url' : './defendant-details', 
    		'previous_url' : './bill-type',
    		'home_url' : './litigators/' 
    	});
});

router.get('/litigators/defendant-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/defendant-details`, 
    	{ 
    		'next_url' : './offence-details', 
    		'previous_url' : './case-details' 
    	});
});

router.get('/litigators/offence-details', function(req, res) {
    
	// TODO: If case_type is a fixed fee:
	// appeal_against_conviction
	// appeal_against_sentence
	// breach_of_crown_court_order
	// committal_for_sentence
	// contempt
	// elected_cases_not_proceeded
	// hearing_subsequent_to_sentence

    // if (req.session.case_type === 'trial') {
    //     var next_url = '/litigators/graduated-fees';
    // } else {
    //     var next_url = '/litigators/fixed-fees';
    // }

    res.render(`${req.feature}/${req.version}/litigators/offence-details`, 
    	{ 
    		'next_url' : './fixed-fees', 
    		'previous_url' : './defendant-details'
    	});

    // TODO: Else case_type is a graduated fee:
    // cracked_before_retrial
    // cracked_trial
    // discontinuance
    // guilty_plea
    // retrial
    // trial

    // res.render(`${req.feature}/${req.version}/litigators/offence-details`, 
    // 	{ 
    // 		'next_url' : './fixed-fees', 
    // 		'previous_url' : './defendant-details' 
    // 	});

});

router.get('/litigators/fixed-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/fixed-fees`, 
    	{ 
    		'next_url' : './miscellaneous-fees', 
    		'previous_url' : './offence-details' 
    	});
});

router.get('/litigators/graduated-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/graduated-fees`, 
    	{ 
    		'next_url' : './miscellaneous-fees', 
    		'previous_url' : './offence-details' 
    	});
});

router.get('/litigators/miscellaneous-fees', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/miscellaneous-fees`, 
    	{ 
    		'next_url' : './disbursements', 
    		'previous_url' : './fixed-fees' 
    	});
});

router.get('/litigators/disbursements', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/disbursements`, 
    	{ 
    		'next_url' : './travel-expenses', 
    		'previous_url' : './miscellaneous-fees' 
    	});
});

router.get('/litigators/travel-expenses', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/travel-expenses`, 
    	{ 
    		'next_url' : './supporting-evidence', 
    		'previous_url' : './disbursements' 
    	});
});

router.get('/litigators/supporting-evidence', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/supporting-evidence`, 
    	{ 
    		'next_url' : './additional-information', 
    		'previous_url' : './travel-expenses' 
    	});
});

router.get('/litigators/additional-information', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/additional-information`, 
    	{ 
    		'next_url' : './claim-summary', 
    		'previous_url' : './supporting-evidence' 
    	});
});

router.get('/litigators/claim-summary', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/claim-summary`, 
    	{ 
    		'next_url' : './certify-claim', 
    		'previous_url' : './additional-information' 
    	});
});

router.get('/litigators/certify-claim', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/certify-claim`, 
    	{ 
    		'next_url' : './thank-you', 
    		'previous_url' : './claim-summary' 
    	});
});

router.get('/litigators/thank-you', function(req, res) {
    res.render(`${req.feature}/${req.version}/litigators/thank-you`, 
    	{ 
    		'new_claim_url' : './bill-type', 
    		'your_claims_url' : './' 
    	});
});


// Add your routes above this line

module.exports = router