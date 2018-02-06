var courts = require('./data/crown_courts.json')

module.exports = {

	getCourts: function() {
		return courts
	},

	getFeeType: function(case_type) {

		// var caseType = case_type.toLowerCase().replace(/\s/g, '_');
		
		var data = {
			"appeal_against_conviction": "fixed",
			"appeal_against_sentence": "fixed",
			"breach_of_crown_court_order": "fixed",
			"committal": "fixed",
			"committal_for_sentence": "fixed",
			"contempt": "fixed",
			"elected_case_not_proceeded": "fixed",
			"hearing_subsequent_to_sentence": "fixed",
			"cracked_before_retrial": "graduated",
			"cracked_trial": "graduated",
			"discontinuance": "graduated",
			"guilty_plea": "graduated",
			"retrial": "graduated",
			"trial": "graduated"
		}

		return data[case_type]
	},

	feeType: function(fee_scheme, fee_type, case_type) {
		// var data = {
		// 	"agfs": [
		// 		"fixed": [
		// 			"Appeal Against Conviction",
		// 			"Appeal Against Sentence",
		// 			"Breach of Crown Court Order",
		// 			"Committal",
		// 			"Contempt",
		// 			"Elected Case Not Proceeded"
		// 		],
		// 		"graduated": [
		// 			"Cracked Before Retrial",
		// 			"Cracked Trial",
		// 			"Guilty Plea",
		// 			"Retrial",
		// 			"Trial"
		// 		]
		// 	],
		// 	"lgfs": [
		// 		"fixed": [
		// 			"Appeal Against Conviction",
		// 			"Appeal Against Sentence",
		// 			"Breach of Crown Court Order",
		// 			"Committal",
		// 			"Committal For Sentence",
		// 			"Elected Case Not Proceeded",
		// 			"Hearing Subsequent to Sentence"
		// 		],
		// 		"graduated": [
		// 			"Cracked Before Retrial",
		// 			"Cracked Trial",
		// 			"Discontinuance",
		// 			"Retrial",
		// 			"Trial"
		// 		]
		// 	]
		// };

		// return (!!~data[fee_scheme][fee_type].indexOf(case_type));

	    //return (case_type == "trial" ? "graduated" : "fixed");

	},
	isFixedFee: function(fee_scheme, case_type) {
		// var caseType = case_type.toLowerCase().replace(/\s/g, '_');

		var data = {
			"agfs": [
				"appeal_against_conviction",
				"appeal_against_sentence",
				"breach_of_crown_court_order",
				"committal",
				"contempt",
				"elected_case_not_proceeded"
			],
			"lgfs": [
				"appeal_against_conviction",
				"appeal_against_sentence",
				"breach_of_crown_court_order",
				"committal",
				"committal_for_sentence",
				"elected_case_not_proceeded",
				"hearing_subsequent_to_sentence"
			]
		};

		return (!!~data[fee_scheme].indexOf(case_type));
	},
	isGraduatedFee: function(fee_scheme, case_type) {
		// var caseType = case_type.toLowerCase().replace(/\s/g, '_');

		var data = {
			"agfs": [
				"cracked_before_retrial",
				"cracked_trial",
				"guilty_plea",
				"retrial",
				"trial"
			],
			"lgfs": [
				"cracked_before_retrial",
				"cracked_trial",
				"discontinuance",
				"retrial",
				"trial"
			]
		};

		return (!!~data[fee_scheme].indexOf(case_type));
	},
	authenticate: function(user_type, username) {

		// var data = {
		// 	"providers": [
		// 		"advocate",
		// 		"advocateadmin",
		// 		"advocate@example.com",
		// 		"advocateadmin@example.com",
		// 		"horace@example.com",
		// 		"horace.rumpole@example.com",
		// 		"litigator",
		// 		"litigatoradmin",
		// 		"litigator@example.com",
		// 		"litigatoradmin@example.com",
		// 		"perry@example.com",
		// 		"perry.mason@example.com"
		// 	],
		// 	"caseworkers": [
		// 		"caseworker",
		// 		"caseworkeradmin",
		// 		"caseworker@example.com",
		// 		"caseworkeradmin@example.com"
		// 	]
		// };

		var data = {
			"horace" : "advocates",
			"perry" : "litigators"
		};

		return data[username];
	}
}