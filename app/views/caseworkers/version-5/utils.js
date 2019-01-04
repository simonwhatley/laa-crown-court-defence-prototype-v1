let claims = require('./data/claims.json');
let claim = require('./data/claim_12345.json');
let refusalReasons = require('./data/refusal_reasons.json');
let rejectReasons = require('./data/reject_reasons.json');

module.exports = {

	// See: Stackoverflow
	// Q: https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	// A: https://stackoverflow.com/a/979325
	sortBy: function(field, reverse, primer){

	   let key = primer ?
	       function(x) {return primer(x[field])} :
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     }
	},

	getClaims: function(sort_by,sort_order,limit,page) {

		let data = [];

		if (!limit) limit = 100;

		if (!page) page = 1;

		let start = (page == 1) ? 0 : ((page * limit)-limit);
		let end = (page * limit);

		let order = (sort_order == 'desc') ? true : false;

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

		// let claimObj = claims.filter( function(obj) {
		// 	return (obj.id == claim_id);
		// });

		// return claimObj[0];

		let data = claim;

		return data[0];

	},

	getExpenseTotals: function(claim_id) {

		let data = claim;
		let totals = [
		    {
		      "type": "car_travel",
		      "quantity": 10,
		      "amount": {
		        "net": 80,
		        "vat": 15.999999999999998,
		        "total": 95.99999999999999
		      }
		    },
		    {
		      "type": "parking",
		      "quantity": 10,
		      "amount": {
		        "net": 0,
		        "vat": 0,
		        "total": 42.00000000000001
		      }
		    },
		    {
		      "type": "subsistence",
		      "quantity": 10,
		      "amount": {
		        "net": 0,
		        "vat": 0,
		        "total": 100.19
		      }
		    }
		];



		// https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
		// TODO: get all net amounts for a given type and sum them
		// let sum = data.expenses.net_amount.reduce((a, b) => a + b, 0);
		// console.log(sum);


		return totals;

	},

	getRefusalReasons: function() {
		return refusalReasons;
	},

	getRejectReasons: function() {
		return rejectReasons;
	}

}