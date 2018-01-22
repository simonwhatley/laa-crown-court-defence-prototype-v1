const express = require('express')
const router = new express.Router()

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
      base: req.baseUrl
    })

})

// Route for bands
router.get('/browse/:class([0-9]+)', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/band`,
    {
      base: req.baseUrl,
      class: req.params.class
    })

})

// Route for categories
router.get('/browse/:class([0-9]+)/:band([0-9]+)', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/category`,
    {
      base: req.baseUrl,
      class: req.params.class,
      band: req.params.band
    })

})

// Route for categories
router.get('/detail/:class([0-9]+)/:band([0-9]+)/:category([0-9]+)', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/detail`,
    {
      base: req.baseUrl,
      class: req.params.class,
      band: req.params.band,
      category: req.params.category
    })

})

// Add your routes above this line
module.exports = router