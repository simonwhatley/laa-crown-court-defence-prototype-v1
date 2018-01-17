module.exports = {
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
		// var caseType = case_type.toLowerCase().split(' ').join('_');
		var caseType = case_type.toLowerCase().replace(/\s/g, '_');

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

		return (!!~data[fee_scheme].indexOf(caseType));
	},
	isGraduatedFee: function(fee_scheme, case_type) {
		// var caseType = case_type.toLowerCase().split(' ').join('_');
		var caseType = case_type.toLowerCase().replace(/\s/g, '_');

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

		return (!!~data[fee_scheme].indexOf(caseType));
	}
}