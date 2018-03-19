var courts = require('./data/crown_courts.json')
var caseTypes = require('./data/case_types.json')
var offences = require('./data/scheme_9_offences_reverse.json')
var fixedFees = require('./data/fixed_fees.json')
var miscellaneousFees = require('./data/miscellaneous_fees.json')
var disbursements = require('./data/disbursements.json')
var transferReasons = require('./data/transfer_reasons.json')
var travelTypes = require('./data/travel_types.json')
var travelReasons = require('./data/travel_reasons.json')

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

		var caseObj = caseTypes.filter( function(obj) {
	        return (obj.key == case_type)
	    })

		return caseObj[0].type

	},

	getOffenceCategories: function() {
		return offences.categories
	},

	getOffenceClasses: function(category_id) {

		if(!category_id) return null

		var categoryObj = this.getOffenceCategories().filter(function (obj) {
  			 return (obj.key == category_id)
		})

		return categoryObj[0].classes

	},

	getOffenceCategoryName: function(category_id) {

		if(!category_id) return null

		var categoryObj = this.getOffenceCategories().filter(function (obj) {
  			 return (obj.key == category_id)
		})

		return categoryObj[0].name
	},

	getOffenceClassName: function(class_id, category_id) {

		if(!class_id) return null

		if(!category_id) return null

		var classObj = this.getOffenceClasses(category_id).filter(function (obj) {
  			 return (obj.key == class_id)
		})

		return classObj[0].name
	},

	getFixedFees: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme)
			return null

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return fixedFees.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

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

	getTransferReasons: function() {
		return transferReasons
	},

	getTravelTypes: function(fee_scheme) {
		
		if(!fee_scheme) return travelTypes

		return travelTypes.filter( function(obj) {
	        return !!~obj.scheme.indexOf(fee_scheme)
	    })

	},

	getTravelReasons: function() {
		return travelReasons
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