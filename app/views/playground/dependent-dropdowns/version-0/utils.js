var offences = require('./data/scheme_9_offences.json')

module.exports = {

	getOffences: function() {
		return offences
	},

	getOffenceClass: function(class_id) {
		
		var classObj = this.getOffences().classes.filter(function (el) {
  			 return (el.id == class_id)
		})

		return classObj[0]
	},

	getOffenceCategory: function(class_id, category_id) {
		
		var classObj = this.getOffenceClass(class_id).categories.filter(function (el) {
  			 return (el.id == category_id)
		})

		return classObj[0]
	}
	
}