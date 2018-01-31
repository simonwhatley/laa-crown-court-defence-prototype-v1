var offences = require('./data/scheme_10_offences.json')

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

	getOffenceBands: function(class_id) {
		
		var classObj = this.getOffenceClass(class_id).bands

		return classObj
	},

	getOffenceBand: function(class_id, band_id) {
		
		var classObj = this.getOffenceClass(class_id).bands.filter(function (el) {
  			 return (el.id == band_id)
		})

		return classObj[0]
	},

	getOffenceCategories: function(class_id, band_id) {
		
		var classObj = this.getOffenceBand(class_id, band_id).categories

		return classObj
	},

	getOffenceCategory: function(class_id, band_id, category_id) {
		
		var classObj = this.getOffenceBands(class_id, band_id).categories.filter(function (el) {
  			 return (el.id == category_id)
		})

		return classObj[0]
	}
	
}