var offences = require('./data/scheme_9_offences.json')

module.exports = {

	getOffences: function() {
		return offences
	},

	getOffencesByClassId: function(class_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.class_id == class_id)
		})

		return classObj
	},

	getOffence: function(class_id, category_id) {
		
		var classObj = this.getOffencesByClassId(class_id).filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj[0]
	}
	
}