var crownCourts = require('./data/crown_courts.json');
var magistratesCourts = require('./data/magistrates_courts.json');
var prisons = require('./data/prisons.json');
var secureHospitals = require('./data/secure_hospitals.json');
var caseTypes = require('./data/case_types.json');
var offencesScheme10 = require('./data/scheme_10_offences.json');
var offencesScheme10_flat = require('./data/scheme_10_offences_flat.json');
var offencesScheme9 = require('./data/scheme_9_offences.json');
var miscellaneousFees = require('./data/miscellaneous_fees.json');
var fixedFees = require('./data/fixed_fees.json');
var fixedFeesV2 = require('./data/fixed_fees_v2.json');
var disbursements = require('./data/disbursements.json');
var transferReasons = require('./data/transfer_reasons.json');
var travelTypes = require('./data/travel_types.json');
var travelReasons = require('./data/travel_reasons.json');
var messages = require('./data/messages.json');
var advocateClaims = require('./data/claims_advocates.json');
var litigatorClaims = require('./data/claims_litigators.json');
var providers = require('./data/providers.json');
var providersLGFS = require('./data/providers_lgfs.json');

module.exports = {

	getDummyProvider: function(provider_id) {

		if (!provider_id) return null

		var providerObj = providersLGFS.filter( function(obj) {
			return (obj.id == provider_id)
		});

		return providerObj[0];

	},

	getDummyUser: function(user_id) {

	},

	getDummySupplier: function(provider_id, supplier_number) {

		if (!provider_id) return null

		if (!supplier_number) return null

		var suppliers = this.getDummyProvider(provider_id).suppliers;

		return suppliers.filter( function(obj) {
	        return !!~obj.lgfs_account_number.indexOf(supplier_number);
	    });

	},

	getProviders: function(type) {
		return providers
	},

	getProvider: function(provider_id) {

		if (!provider_id) return null

		var providerObj = providers.filter( function(obj) {
			return (obj.id == provider_id)
		})

		return providerObj[0]

	},

	getSupplier: function(provider_id, supplier_number) {

		if (!provider_id) return null

		if (!supplier_number) return null

		var offices = this.getProvider(provider_id).offices;

		return offices.filter( function(obj) {
	        return !!~obj.code.indexOf(supplier_number)
	    })

	},

	getCrownCourts: function() {
		return crownCourts
	},

	getMagistratesCourts: function() {
		return magistratesCourts
	},

	getPrisons: function() {
		return prisons
	},

	getSecureHospitals: function() {
		return secureHospitals
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

	getOffenceScheme9ClassName: function(class_id) {

		if(!class_id) return null

		var classObj = this.getOffenceClassesScheme9().filter(function (obj) {
  			 return (obj.key == class_id)
		})

		return classObj[0].name
	},

	getOffenceScheme9CategoryName: function(class_id, category_id) {

		if(!class_id) return null

		if(!category_id) return null

		var classObj = this.getOffenceCategoriesScheme9(class_id).filter(function (obj) {
  			 return (obj.key == category_id)
		})

		return classObj[0].name
	},

	getOffencesScheme10: function() {
		return offencesScheme10_flat
	},

	getOffencesScheme10ByClassId: function(class_id) {
		// console.log(class_id)
		var classObj = this.getOffencesScheme10().filter(function (el) {
  			 return (el.class_id == class_id)
		})

		return classObj
	},

	getOffencesScheme10ByBandId: function(class_id, band_id) {
		// console.log(band_id)
		var classObj = this.getOffencesScheme10ByClassId(class_id).filter(function (el) {
  			 return (el.band_id == band_id)
		})

		return classObj
	},

	getOffencesScheme10ByCategoryId: function(category_id) {

		var classObj = this.getOffencesScheme10().filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj
	},

	getOffencesScheme10ByActId: function(act_id) {

		var classObj = this.getOffencesScheme10().filter(function (el) {
  			 return (el.act_id == act_id)
		})

		return classObj
	},

	getOffenceScheme10: function(class_id, band_id, category_id) {

		var classObj = this.getOffencesScheme10ByBandId(class_id, band_id).filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj[0]
	},

	getFixedFees: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme)
			return null

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return fixedFees.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme.toLowerCase()) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

	},

	getFixedFeesV2: function(case_type) {

		if (!case_type)
			return null

		return fixedFeesV2.filter( (obj) =>
			!!~obj.key.indexOf(case_type.toLowerCase())
		)

	},

	getMiscellaneousFees: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme)
			return null

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return miscellaneousFees.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme.toLowerCase()) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

	},

	getDisbursements: function(fee_scheme, fee_scheme_version) {

		if(!fee_scheme)
			var fee_scheme = "lgfs"

		if(!fee_scheme_version)
			var fee_scheme_version = "9"

		return disbursements.filter( (obj) =>
	        !!~obj.scheme.indexOf(fee_scheme.toLowerCase()) && !!~obj.scheme_version.indexOf(fee_scheme_version)
	    )

	},

	getTransferReasons: function() {
		return transferReasons
	},

	getTravelTypes: function(fee_scheme) {

		if(!fee_scheme) return travelTypes

		return travelTypes.filter( function(obj) {
	        return !!~obj.scheme.indexOf(fee_scheme.toLowerCase())
	    });

	},

	getTravelReasons: function(fee_scheme) {

		if(!fee_scheme) return travelReasons

		return travelReasons.filter( function(obj) {
	        return !!~obj.scheme.indexOf(fee_scheme)
	    })
	},

	// TODO: refactor
	getClaims: function(fee_scheme) {
		if(!fee_scheme) return null

		if (fee_scheme == 'agfs') {
			return advocateClaims;
		}

		if (fee_scheme == 'lgfs') {
			return litigatorClaims;
		}
	},

	// TODO: refactor
	getClaim: function(fee_scheme, claim_id) {

		if(!claim_id) return null

		if (fee_scheme == 'agfs') {
			var claimObj = advocateClaims.filter(function (obj) {
	  			 return (obj.id == claim_id)
			});
		}

		if (fee_scheme == 'lgfs') {
			var claimObj = litigatorClaims.filter(function (obj) {
	  			 return (obj.id == claim_id)
			});
		}

		return claimObj[0];
	},

	getMessages: function(claim_id) {

		if(!claim_id) return null

		var messageObj = messages.cases.filter(function (obj) {
  			 return (obj.claim_id == claim_id)
		});

		return messageObj[0].messages;

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