const express = require('express')
const router = new express.Router()

const utils = require('./utils')

router.use('/', (req, res, next) => {
  req.section = req.originalUrl.split('/')[1]
  req.feature = req.originalUrl.split('/')[2]
  req.version = req.originalUrl.split('/')[3]
  next()
})

// Route index page
router.get('/', function (req, res) {
  req.session.destroy()
  res.redirect(`/${req.section}/${req.feature}/${req.version}/search`)
})

// Route for search
router.get('/search', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/offences`,
    {
      base: req.baseUrl,
      classes: utils.getOffences().classes
    })

})



router.get('/data/categories', function (req, res) {

  console.log(req.session.data)
  // console.log(req.session.data.depdrop_all_params['offence-class'])

  // console.log(utils.getOffenceClass(req.session.data.depdrop_parents[0]).categories)

  var data = "{ output: " + JSON.stringify(utils.getOffenceClass(req.session.data.class[0]).categories) + ", selected: '' }"

  console.log(data)

  res.json(data)

})

router.get('/data/categories/:class([A-K])', function (req, res) {
  
  // var data = "{ output: " + utils.getOffenceClass(req.params.class).categories + ", selected: '' }"
  var data = "{ output: " + JSON.stringify(utils.getOffenceClass(req.params.class).categories) + ", selected: '' }"

  res.send(data)

  // res.json(utils.getOffenceClass(req.params.class))
  // res.json(utils.getOffenceClass(req.params.class).categories)

})

// router.get('/data/:class([A-K])/:category([0-9]+)', function (req, res) {

//   res.json(utils.getOffenceCategory(req.params.class, req.params.category))

// })

// Add your routes above this line
module.exports = router