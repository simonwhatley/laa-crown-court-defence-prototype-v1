var offences = require('./data/scheme_9_offences.json')

module.exports = {

	getOffences: function() {
		return offences
	},

	getOffencesByClassId: function(class_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.class_id == class_id)
		})

		return classObj[0]
	},

	getOffencesByBandId: function(band_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.band_id == band_id)
		})

		return classObj[0]
	},

	getOffencesByCategoryId: function(category_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj[0]
	},

	getOffencesByActId: function(act_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.act_id == act_id)
		})

		return classObj[0]
	}

	
}