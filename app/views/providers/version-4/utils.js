var courts = require('./data/crown_courts.json')
var caseTypes = require('./data/case_types.json')
var offencesScheme10 = require('./data/scheme_10_offences.json')
var offencesScheme9 = require('./data/scheme_9_offences.json')
var miscellaneousFees = require('./data/miscellaneous_fees.json')
var disbursements = require('./data/disbursements.json')

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

		if(!fee_scheme)
			return null

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return miscellaneousFees.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

	},

	getDisbursements: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme)
			var fee_scheme = "lgfs"

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return disbursements.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

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

		if(!fee_scheme || !case_type) return null

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

		if(!fee_scheme || !case_type) return null

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

		var data = {
			"horace" : "advocates",
			"horace@example.com" : "advocates",
			"perry" : "litigators",
			"perry@example.com" : "litigators"
		};

		return data[username];
	}
}