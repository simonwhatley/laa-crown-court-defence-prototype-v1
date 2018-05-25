var providers = require('./data/providers.json');

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

	getProviders: function(sort_by,sort_order,limit,page) {

		var data = [];

		if (!limit) limit = 100;

		if (!page) page = 1;

		var start = (page == 1) ? 0 : ((page * limit)-limit);
		var end = (page * limit);

		var order = (sort_order == 'desc') ? true : false;

		switch(sort_by) {
			case 'id':
				data = providers.sort(this.sortBy('id', order, parseInt));
				break;
			case 'type':
				data = providers.sort(this.sortBy('provider_type', order, function(a) {
					return a.toUpperCase();
				}));
				break;
			case 'scheme':
				// TODO

				break;
			case 'status':
				// TODO sort by status and provider name...remove items that aren't the correct status???
				data = providers.sort(this.sortBy('account_status', order, function(a) {
					return a.toUpperCase();
				}));
				break;
			case 'vat':
				// TODO

				break;
			default:
				data = providers.sort(this.sortBy('provider_name', order, function(a) {
					return a.toUpperCase();
				}));
				break;
		}

		return data.slice(start,end);

	},

	getProvider: function(provider_id) {

		if (!provider_id) return null

		var providerObj = providers.filter( function(obj) {
			return (obj.id == provider_id);
		});

		return providerObj[0];

	},

	getProviderCount: function() {
		return parseInt(providers.length);
	},

	getProviderUsers: function(provider_id) {

		if (!provider_id) return null

		var userObj = users.filter( function(obj) {
			return (obj.provider_id == provider_id);
		});

		return userObj[0];

	},

	getUser: function(user_id) {
		
		// var data = [{
		// 	id: 3072,
		// 	name: "1 Law",
		// 	users: [{
		// 		id: 1,
		// 		firstname: "Simon",
		// 		Lastname: "Whatley",
		// 		email: "simon.whatley@example.com",
		// 		type: "admin",
		// 		role: "admin",
		// 		notifications: true,
		// 		status: "active"
		// 	}]
		// }];

		var data = {
				id: 1,
				supplier_number: "123SW",
				first_name: "Simon",
				last_name: "Whatley",
				email: "simon.whatley@example.com",
				type: "admin",
				role: "admin",
				notifications: true,
				status: "active"
			};

		return data;

	}

}