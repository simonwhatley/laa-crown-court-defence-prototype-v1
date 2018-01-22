const express = require('express')
const router = new express.Router()

const utils = require('./utils')

//const offences = require('./data.json')

// var bands = offences.classes.filter(function (el) {
//   return (el.code === 1)
// })

// console.log(bands)
// console.log(utils.getClass(offences, 1))
// console.log(utils.getClass(1))
// console.log(utils.getBands(1))

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1]
  req.feature = req.originalUrl.split('/')[2]
  req.version = req.originalUrl.split('/')[3]
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.redirect(`/${req.section}/${req.feature}/${req.version}/browse`)
})

// Route for classes
router.get('/browse', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/class`,
    {
      base: req.baseUrl,
      classes: utils.getClasses()
    })

})

// Route for bands
router.get('/browse/:class([0-9]+)', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/band`,
    {
      base: req.baseUrl,
      classes: utils.getClasses(),
      bands: utils.getBands(3), // replace hard coded numeral with req.params.class 
      class: req.params.class // replace with the class ID from the object
    })

})

// Route for categories
router.get('/browse/:class([0-9]+)/:band([0-9]+)', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/category`,
    {
      base: req.baseUrl,
      classes: utils.getClasses(),
      bands: utils.getBands(3),
      // categories: utils.getCategories(3,3),
      class: req.params.class,
      band: req.params.band
    })

})

// Add your routes above this line
module.exports = router