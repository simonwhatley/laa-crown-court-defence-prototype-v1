var claims = require('./data/claims.json');
var refusalReasons = require('./data/refusal_reasons.json');
var rejectReasons = require('./data/reject_reasons.json');

module.exports = {

	// See: Stackoverflow
	// Q: https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	// A: https://stackoverflow.com/a/979325
	sortBy: function(field, reverse, primer){

	   var key = primer ?
	       function(x) {return primer(x[field])} :
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     }
	},

	getClaims: function(sort_by,sort_order,limit,page) {

		var data = [];

		if (!limit) limit = 100;

		if (!page) page = 1;

		var start = (page == 1) ? 0 : ((page * limit)-limit);
		var end = (page * limit);

		var order = (sort_order == 'desc') ? true : false;

		switch(sort_by) {
			case 'id':
				// data = claims.sort(this.sortBy('id', order, parseInt));
				break;
			case 'type':
				// data = claims.sort(this.sortBy('provider_type', order, function(a) {
				// 	return a.toUpperCase();
				// }));
				break;
			case 'scheme':
				// TODO

				break;
			case 'status':
				// TODO sort by status and provider name...remove items that aren't the correct status???
				// data = claims.sort(this.sortBy('account_status', order, function(a) {
				// 	return a.toUpperCase();
				// }));
				break;
			case 'vat':
				// TODO

				break;
			default:
				data = claims.sort(this.sortBy('case_number', order, function(a) {
					return a.toUpperCase();
				}));
				break;
		}

		return data.slice(start,end);

	},

	getClaimCount: function() {
		return parseInt(claims.length);
	},

	getClaim: function(claim_id) {

		// if (!claim_id) return null

		// var claimObj = claims.filter( function(obj) {
		// 	return (obj.id == claim_id);
		// });

		// return claimObj[0];

		var data =  [{
					    "id": 12345,
					    "supplier_number": "1K905R",
					    "case_number": "T20180101",
					    "court": "Cardiff",
					    "fee_scheme": "agfs",
					    "fee_scheme_version": 9,
					    "bill_type": "litigator_final",
					    "case_type": "trial",
					    // Trial
					    // "first_day_of_trial": "2018-01-02T00:00:00.000Z",
					    // "trial_concluded_on": "2018-01-06T00:00:00.000Z",
					    // "estimated_trial_length": 5,
					    // "actual_trial_length": 5,
					    // Retrial
					    // "first_day_of_retrial": "2018-02-02T00:00:00.000Z",
					    // "retrial_concluded_on": "2018-04-06T00:00:00.000Z",
					    // "estimated_retrial_length": 2,
					    // "actual_retrial_length": 3,
					    // "apply_reduced_rate_retrial": "yes",
					    // Cracked trial
					    // "notice_of_fixed_warned_trial_issued": "2018-02-02T00:00:00.000Z",
					    // "fixed_warned_trial": "2018-02-03T00:00:00.000Z",
					    // "case_cracked_on": "2018-02-04T00:00:00.000Z",
					    // "case_cracked_in": "first_third",
					    // Cracked before retrial
					    // "cracked_before_retrial_notice_of_fixed_warned_trial_issued": "2018-02-02T00:00:00.000Z",
					    // "cracked_before_retrial_fixed_warned_trial": "2018-02-03T00:00:00.000Z",
					    // "cracked_before_retrial_case_cracked_on": "2018-02-04T00:00:00.000Z",
					    // "cracked_before_retrial_case_cracked_in": "first_third",
					    "fee_type": "graduated",
					    "date_submitted": "2018-02-01T10:30:00.000Z",
					    "status": "allocated",
					    "reference_number": "HR/PS/72852849",
				        "totals": {
				            "claimed": {
				                "fees": 9990.00,
				                "miscellaneous_fees": 990.00,
				                "disbursements": 0.00,
				                "expenses": 90.00,
				                "net_amount": 11079.00,
				                "vat_amount": 2215.80,
				                "gross_amount": 13294.80
				            },
				            "assessed": {
				                "fees": 0.00,
				                "miscellaneous_fees": 0.00,
				                "disbursements": 0.00,
				                "expenses": 0.00,
				                "net_amount": 0.00,
				                "vat_amount": 0.00,
				                "gross_amount": 0.00
				            }
				        },
					    // "total_amount": 99999.99,
					    "defendants": [{
					        "urn": 12345,
					        "first_name": "Philippine",
					        "last_name": "Struttman",
					        "date_of_birth": "1973-06-05T00:00:00.000Z",
					        "judicial_apportionment": "yes",
					        "representation_orders": [{
					            "maat_reference": 72852849,
					            "representation_order_date": "2017-09-24T00:00:00.000Z"
					            // },
					            // {
					            //   "maat_reference": 82852840,
					            //   "representation_order_date": "2018-01-04T00:00:00.000Z"
					        }]
					    }],
					    "certification": {
					        "certified_by": "Rufus Titterington",
					        "certified_date": "2018-02-01T10:30:00.000Z",
					        "reason": "I attended the main hearing (1st day of trial)"
					    // },
					    // "instructed_advocate": {
					    //     "code": "001PY",
					    //     "first_name": "Horace",
					    //     "last_name": "Rumpole"
					    },
					    "offence": {
					        "class": "A – Homicide and related grave offences",
					        "band": "",
					        "category": "Murder"
					    },
					    // "miscellaneous_fees": [{
					    //     "type": "abuse_of_process_hearings_half_day",
					    //     "date_of_hearing": "2018-01-04T00:00:00.000Z",
					    //     "net_amount": 999.99
					    // }, {
					    //     "type": "abuse_of_process_hearings_whole_day",
					    //     "date_of_hearing": "2018-01-08T00:00:00.000Z",
					    //     "net_amount": 1999.99
					    // }],
					    "expenses": [{
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 42,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-02T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 10.5,
					        "vat_amount": 2.1,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 37,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-03T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 9.25,
					        "vat_amount": 1.85,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 33,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-04T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 8.25,
					        "vat_amount": 1.65,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 42,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-05T00:00:00.000Z",
					        "cost_per_mile": 0.45,
					        "net_amount": 18.9,
					        "vat_amount": 3.78,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-06T00:00:00.000Z",
					        "cost_per_mile": 0.45,
					        "net_amount": 14.4,
					        "vat_amount": 2.88,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-07T00:00:00.000Z",
					        "cost_per_mile": 0.45,
					        "net_amount": 14.4,
					        "vat_amount": 2.88,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-08T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 8,
					        "vat_amount": 1.6,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-09T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 8,
					        "vat_amount": 1.6,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-10T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 8,
					        "vat_amount": 1.6,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }, {
					        "type": "car_travel",
					        "reason": {
					            "key": "court_hearing",
					            "label": "Court hearing (Crown court)"
					        },
					        "origin": {
					            "name": "Birmingham (B4 6QB)",
					            "postcode": "B4 6QB",
					            "supplier_number": "1K905R"
					        },
					        "destination": {
					            "type": "crown_court",
					            "name": "Wolverhampton",
					            "postcode": "WV1 3LQ"
					        },
					        "distance": 32,
					        "distance_calculated": 32,
					        "date_of_expense": "2018-01-11T00:00:00.000Z",
					        "cost_per_mile": 0.25,
					        "net_amount": 8,
					        "vat_amount": 1.6,
					        "additional_information": "Lorem ispum dolor sit emet"
					    }],
					    // "warrants": [{
					    //     "date_issued": "2017-12-01T00:00:00.000Z",
					    //     "date_executed": "2018-02-01T00:00:00.000Z"
					    //     // },
					    //     // {
					    //     //  "date_issued": "2017-12-31T00:00:00.000Z",
					    //     //  "date_executed": "2018-03-01T00:00:00.000Z"
					    // }],
					    "evidence": {
					        "electronic_evidence": "no",
					        "checklist": ["representation_order", "invoices"]
					    },
					    "additional_information": "",
					    "messages": [{
					        "message_id": 61347,
					        "timestamp": "2018-03-29T10:50:00.000Z",
					        "message": "Your claim has been submitted",
					        "user_id": 1,
					        "user_name": "System",
					        "type": "system"
					    }, {
					        "message_id": 69230,
					        "timestamp": "2018-03-29T10:53:00.000Z",
					        "message": "Your claim has been allocated",
					        "user_id": 1,
					        "user_name": "System",
					        "type": "system"
					    }],
					}];

		return data[0];

	},

	getRefusalReasons: function() {
		return refusalReasons;
	},

	getRejectReasons: function() {
		return rejectReasons;
	}

}