var data = require('./data.json')

module.exports = {

	getClasses: function() {
		return data.classes
	},

	getClass: function(class_id) {
		
		var classObj = this.getClasses().filter(function (el) {
  			 return (el.code === parseInt(class_id))
		})

		return classObj[0]
	},

	getBands: function(class_id) {
		return this.getClass(parseInt(class_id)).bands
	},

	getBand: function(class_id, band_id) {

		var bandObj = this.getBands(parseInt(class_id)).filter(function (el) {
			return (el.code === parseInt(band_id))
		})

		return bandObj[0]

	},

	getCategories: function(class_id, band_id) {
		return this.getBand(parseInt(class_id), parseInt(band_id)).categories
	},

	getCategory: function(class_id, band_id, category_id) {

		var categoryObj = this.getBands(parseInt(class_id), parseInt(band_id)).filter(function (el) {
			return (el.code === parseInt(category_id))
		})

		return categoryObj[0]
	}
}