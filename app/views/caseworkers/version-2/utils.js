var claims = require('./data/claims.json');

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

		if (!claim_id) return null

		var claimObj = claims.filter( function(obj) {
			return (obj.id == claim_id);
		});

		return claimObj[0];

	}

}