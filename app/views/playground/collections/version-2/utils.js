var data = require('./data.json')

module.exports = {

	getClasses: function() {
		return data.classes
	},

	getClass: function(class_id) {
		
		var classObj = this.getClasses().filter(function (el) {
  			 return (el.code == class_id)
		})

		return classObj[0]
	},

	getBands: function(class_id) {
		return this.getClass(class_id).bands
	},

	getBand: function(class_id, band_id) {

		var bandObj = this.getBands(class_id).filter(function (el) {
			return (el.code == band_id)
		})

		return bandObj[0]

	},

	getCategories: function(class_id, band_id) {
		return this.getBand(class_id, band_id).categories
	},

	getCategory: function(class_id, band_id, category_id) {

		var categoryObj = this.getBands(class_id, band_id).filter(function (el) {
			return (el.code == category_id)
		})

		return categoryObj[0]
	}
}