var courts = require('./data/crown_courts.json')
var caseTypes = require('./data/case_types.json')
var offencesScheme10 = require('./data/scheme_10_offences.json')
var offencesScheme9 = require('./data/scheme_9_offences.json')
var miscellaneousFees = require('./data/miscellaneous_fees.json')

module.exports = {

	getCourts: function() {
		return courts
	},

	getCaseTypesByFeeScheme: function(fee_scheme) {

		if(!fee_scheme) return caseTypes

		return caseTypes.filter( function(obj) {
	        return !!~obj.scheme.indexOf(fee_scheme)
	    })

	},

	getCaseTypesByFeeType: function(fee_type) {

		if(!fee_type) return caseTypes

		return caseTypes.filter( function(obj) {
	        return !!~obj.type.indexOf(fee_type)
	    })

	},

	getFeeTypeForCaseType: function(case_type) {

		if(!case_type) return null

		return caseTypes.filter( function(obj) {
	        return (obj.type == case_type)
	    })

	},

	getOffenceClassesScheme9: function() {
		return offencesScheme9.classes
	},

	getOffenceCategoriesScheme9: function(class_id) {
	
		if(!class_id) return null

		var classObj = this.getOffenceClassesScheme9().filter(function (obj) {
  			 return (obj.key == class_id)
		})

		return classObj[0].categories

	},

	getOffenceClassesScheme10: function() {
		return offencesScheme10.classes
	},

	getOffenceBandsScheme10: function(class_id) {

		if(!class_id) return null

		var classObj = this.getOffenceClassesScheme10().filter(function (obj) {
  			 return (obj.key == class_id)
		})

		return classObj[0].bands

	},

	getOffenceCategoriesScheme10: function(class_id, band_id) {

		if(!class_id || !band_id) return null

		var classObj = this.getOffenceBandsScheme10(class_id).filter(function (obj) {
  			 return (obj.key == band_id)
		})

		return classObj[0].categories

	},

	getMiscellaneousFees: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme || !fee_scheme_version) return null

		return miscellaneousFees.filter( function(obj) {
	        return !!~obj.scheme.indexOf(fee_scheme)
	    })

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


		

		// var data = {
		// 	"agfs": [
		// 		"Appeal Against Conviction",
		// 		"Appeal Against Sentence",
		// 		"Breach of Crown Court Order",
		// 		"Committal",
		// 		"Contempt",
		// 		"Cracked Before Retrial",
		// 		"Cracked Trial",
		// 		"Elected Case Not Proceeded",
		// 		"Guilty Plea",
		// 		"Retrial",
		// 		"Trial"
		// 	],
		// 	"lgfs": [
		// 		"Appeal Against Conviction",
		// 		"Appeal Against Sentence",
		// 		"Breach of Crown Court Order",
		// 		"Committal",
		// 		"Committal For Sentence",
		// 		"Cracked Before Retrial",
		// 		"Cracked Trial",
		// 		"Discontinuance",
		// 		"Elected Case Not Proceeded",
		// 		"Hearing Subsequent to Sentence",
		// 		"Retrial",
		// 		"Trial"
		// 	]
		// }