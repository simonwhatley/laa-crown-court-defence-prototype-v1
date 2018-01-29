var offences = require('./data/scheme_10_offences.json')

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

	getOffencesByBandId: function(class_id, band_id) {
		
		var classObj = this.getOffencesByClassId(class_id).filter(function (el) {
  			 return (el.band_id == band_id)
		})

		return classObj
	},

	getOffencesByCategoryId: function(category_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj
	},

	getOffencesByActId: function(act_id) {
		
		var classObj = this.getOffences().filter(function (el) {
  			 return (el.act_id == act_id)
		})

		return classObj
	},

	getOffence: function(class_id, band_id, category_id) {
		
		var classObj = this.getOffencesByBandId(class_id, band_id).filter(function (el) {
  			 return (el.category_id == category_id)
		})

		return classObj[0]
	}
	
}