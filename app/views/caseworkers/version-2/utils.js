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
					    "case_number": "T20180101",
					    "court": "Cardiff",
					    "fee_scheme": "agfs",
					    "fee_scheme_version": 9,
					    "bill_type": "advocate_final",
					    "case_type": "trial",
					    // Trial
					    "first_day_of_trial": "2018-01-02T00:00:00.000Z",
					    "trial_concluded_on": "2018-01-06T00:00:00.000Z",
					    "estimated_trial_length": 5,
					    "actual_trial_length": 5,
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
					    "total_amount": 99999,
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
					    },
					    "instructed_advocate": {
					        "code": "001PY",
					        "first_name": "Horace",
					        "last_name": "Rumpole"
					    },
					    "offence": {
					        "class": "A – Homicide and related grave offences",
					        "band": "",
					        "category": "Murder"
					    },
					    "miscellaneous_fees":[
						    {
						    	"type": "abuse_of_process_hearings_half_day",
						    	"date_of_hearing": "2018-01-04T00:00:00.000Z",
						    	"net_amount": 999.99
						    },
						    {
						    	"type": "abuse_of_process_hearings_whole_day",
						    	"date_of_hearing": "2018-01-08T00:00:00.000Z",
						    	"net_amount": 1999.99
						    }
					    ],
					    "expenses": [
					    	{
					    		"type": "car_travel",
					    		"reason": "court_hearing",
					    		"destination": "Cardiff CC",
					    		"location": "",
					    		"hours": "",
					    		"distance": "10",
					    		"date_of_expense": "2018-01-09T00:00:00.000Z",
					    		"cost_per_mile": "25",
					    		"net_amount": 2.50,
					    		"vat_amount": 0.50,
					    		"additional_information": ""
					    	},
					    	{
					    		"type": "car_travel",
					    		"reason": "court_hearing",
					    		"destination": "Cardiff CC",
					    		"location": "",
					    		"hours": "",
					    		"distance": "10",
					    		"date_of_expense": "2018-01-10T00:00:00.000Z",
					    		"cost_per_mile": "25",
					    		"net_amount": 2.50,
					    		"vat_amount": 0.50,
					    		"additional_information": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida urna ex, gravida pretium justo semper quis. Aenean vitae massa at nunc fringilla venenatis ut non velit."
					    	}
					    ],
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
					    "additional_information": ""
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