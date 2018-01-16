const express = require('express')
const router = express.Router()

// Route index page
// router.get('/', function (req, res) {
//   res.render('index')
// })

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// Add your routes here - above the module.exports line


// ADVOCATES

router.get('/advocates/case-details', function(req, res) {
    
    res.render(`${req.feature}/${req.version}/advocates/case-details`, 
    	{ 
    		'next_url' : '/providers/version-1/advocates/defendant-details', 
    		'previous_url' : '/providers/version-1/advocates/',
    		'home_url' : '/providers/version-1/advocates/'
    	});
});

router.get('/advocates/defendant-details', function(req, res) {
    res.render(`${req.feature}/${req.version}/advocates/defendant-details`, 
    	{ 
    		'next_url' : '/providers/advocates/offence-details', 
    		'previous_url' : '/providers/advocates/case-details' 
    	});
});

router.get('/providers/advocates/offence-details', function(req, res) {
    
	// TODO: If case_type is a fixed fee
	// appeal_against_conviction
	// appeal_against_sentence
	// breach_of_crown_court_order
	// committal
	// contempt
	// elected_cases_not_proceeded

    res.render('providers/advocates/offence-details', 
    	{ 
    		'next_url' : '/providers/advocates/fixed-fees', 
    		'previous_url' : '/providers/advocates/defendant-details' 
    	});

    // TODO: Else case_type is a graduated fee
    // cracked_before_retrial
    // cracked_trial
    // guilty_plea
    // retrial
    // trial

    // res.render('providers/advocates/offence-details', 
    // 	{ 
    // 		'next_url' : '/providers/advocates/fixed-fees', 
    // 		'previous_url' : '/providers/advocates/defendant-details' 
    // 	});

});

router.get('/providers/advocates/fixed-fees', function(req, res) {
    res.render('providers/advocates/fixed-fees', 
    	{ 
    		'next_url' : '/providers/advocates/miscellaneous-fees', 
    		'previous_url' : '/providers/advocates/offence-details' 
    	});
});

router.get('/providers/advocates/graduated-fees', function(req, res) {
    res.render('providers/advocates/graduated-fees', 
    	{ 
    		'next_url' : '/providers/advocates/miscellaneous-fees', 
    		'previous_url' : '/providers/advocates/offence-details' 
    	});
});

router.get('/providers/advocates/miscellaneous-fees', function(req, res) {
    res.render('providers/advocates/miscellaneous-fees', 
    	{ 
    		'next_url' : '/providers/advocates/travel-expenses', 
    		'previous_url' : '/providers/advocates/fixed-fees' 
    	});
});

router.get('/providers/advocates/travel-expenses', function(req, res) {
    res.render('providers/advocates/travel-expenses', 
    	{ 
    		'next_url' : '/providers/advocates/supporting-evidence', 
    		'previous_url' : '/providers/advocates/miscellaneous-fees' 
    	});
});

router.get('/providers/advocates/supporting-evidence', function(req, res) {
    res.render('providers/advocates/supporting-evidence', 
    	{ 
    		'next_url' : '/providers/advocates/additional-information', 
    		'previous_url' : '/providers/advocates/travel-expenses' 
    	});
});

router.get('/providers/advocates/additional-information', function(req, res) {
    res.render('providers/advocates/additional-information', 
    	{ 
    		'next_url' : '/providers/advocates/claim-summary', 
    		'previous_url' : '/providers/advocates/supporting-evidence' 
    	});
});

router.get('/providers/advocates/claim-summary', function(req, res) {
    res.render('providers/advocates/claim-summary', 
    	{ 
    		'next_url' : '/providers/advocates/certify-claim', 
    		'previous_url' : '/providers/advocates/additional-information' 
    	});
});

router.get('/providers/advocates/certify-claim', function(req, res) {
    res.render('providers/advocates/certify-claim', 
    	{ 
    		'next_url' : '/providers/advocates/thank-you', 
    		'previous_url' : '/providers/advocates/claim-summary' 
    	});
});

router.get('/providers/advocates/thank-you', function(req, res) {
    res.render('providers/advocates/thank-you', 
    	{ 
    		'new_claim_url' : '/providers/advocates/case-details', 
    		'your_claims_url' : '/providers/advocates/' 
    	});
});


// LITIGATORS

router.get('/providers/litigators/bill-type', function(req, res) {
    res.render('providers/litigators/bill-type', 
    	{ 
    		'next_url' : '/providers/litigators/case-details', 
    		'previous_url' : '/providers/litigators/',
    		'home_url' : '/providers/litigators/' 
    	});
});

// if (req.query.bill_type === 'litigator_transfer') {
//     var next_url = '/providers/litigators/transfer-details';
// } else {
//     var next_url = '/providers/litigators/case-details';
// }

// TODO: If bill_type is transfer

router.get('/providers/litigators/transfer-details', function(req, res) {
    res.render('providers/litigators/transfer-details', 
    	{ 
    		'next_url' : '/providers/litigators/case-details', 
    		'previous_url' : '/providers/litigators/bill-type',
    		'home_url' : '/providers/litigators/' 
    	});
});

// TODO: Else bill_type is final|interim

router.get('/providers/litigators/case-details', function(req, res) {
    res.render('providers/litigators/case-details', 
    	{ 
    		'next_url' : '/providers/litigators/defendant-details', 
    		'previous_url' : '/providers/litigators/bill-type',
    		'home_url' : '/providers/litigators/' 
    	});
});

router.get('/providers/litigators/defendant-details', function(req, res) {
    res.render('providers/litigators/defendant-details', 
    	{ 
    		'next_url' : '/providers/litigators/offence-details', 
    		'previous_url' : '/providers/litigators/case-details' 
    	});
});

router.get('/providers/litigators/offence-details', function(req, res) {
    
	// TODO: If case_type is a fixed fee:
	// appeal_against_conviction
	// appeal_against_sentence
	// breach_of_crown_court_order
	// committal_for_sentence
	// contempt
	// elected_cases_not_proceeded
	// hearing_subsequent_to_sentence

    // if (req.session.case_type === 'trial') {
    //     var next_url = '/providers/litigators/graduated-fees';
    // } else {
    //     var next_url = '/providers/litigators/fixed-fees';
    // }

    res.render('providers/litigators/offence-details', 
    	{ 
    		'next_url' : '/providers/litigators/fixed-fees', 
    		'previous_url' : '/providers/litigators/defendant-details'
    	});

    // TODO: Else case_type is a graduated fee:
    // cracked_before_retrial
    // cracked_trial
    // discontinuance
    // guilty_plea
    // retrial
    // trial

    // res.render('providers/litigators/offence-details', 
    // 	{ 
    // 		'next_url' : '/providers/litigators/fixed-fees', 
    // 		'previous_url' : '/providers/litigators/defendant-details' 
    // 	});

});

router.get('/providers/litigators/fixed-fees', function(req, res) {
    res.render('providers/litigators/fixed-fees', 
    	{ 
    		'next_url' : '/providers/litigators/miscellaneous-fees', 
    		'previous_url' : '/providers/litigators/offence-details' 
    	});
});

router.get('/providers/litigators/graduated-fees', function(req, res) {
    res.render('providers/litigators/graduated-fees', 
    	{ 
    		'next_url' : '/providers/litigators/miscellaneous-fees', 
    		'previous_url' : '/providers/litigators/offence-details' 
    	});
});

router.get('/providers/litigators/miscellaneous-fees', function(req, res) {
    res.render('providers/litigators/miscellaneous-fees', 
    	{ 
    		'next_url' : '/providers/litigators/disbursements', 
    		'previous_url' : '/providers/litigators/fixed-fees' 
    	});
});

router.get('/providers/litigators/disbursements', function(req, res) {
    res.render('providers/litigators/disbursements', 
    	{ 
    		'next_url' : '/providers/litigators/travel-expenses', 
    		'previous_url' : '/providers/litigators/miscellaneous-fees' 
    	});
});

router.get('/providers/litigators/travel-expenses', function(req, res) {
    res.render('providers/litigators/travel-expenses', 
    	{ 
    		'next_url' : '/providers/litigators/supporting-evidence', 
    		'previous_url' : '/providers/litigators/disbursements' 
    	});
});

router.get('/providers/litigators/supporting-evidence', function(req, res) {
    res.render('providers/litigators/supporting-evidence', 
    	{ 
    		'next_url' : '/providers/litigators/additional-information', 
    		'previous_url' : '/providers/litigators/travel-expenses' 
    	});
});

router.get('/providers/litigators/additional-information', function(req, res) {
    res.render('providers/litigators/additional-information', 
    	{ 
    		'next_url' : '/providers/litigators/claim-summary', 
    		'previous_url' : '/providers/litigators/supporting-evidence' 
    	});
});

router.get('/providers/litigators/claim-summary', function(req, res) {
    res.render('providers/litigators/claim-summary', 
    	{ 
    		'next_url' : '/providers/litigators/certify-claim', 
    		'previous_url' : '/providers/litigators/additional-information' 
    	});
});

router.get('/providers/litigators/certify-claim', function(req, res) {
    res.render('providers/litigators/certify-claim', 
    	{ 
    		'next_url' : '/providers/litigators/thank-you', 
    		'previous_url' : '/providers/litigators/claim-summary' 
    	});
});

router.get('/providers/litigators/thank-you', function(req, res) {
    res.render('providers/litigators/thank-you', 
    	{ 
    		'new_claim_url' : '/providers/litigators/bill-type', 
    		'your_claims_url' : '/providers/litigators/' 
    	});
});


// Add your routes above this line

module.exports = router