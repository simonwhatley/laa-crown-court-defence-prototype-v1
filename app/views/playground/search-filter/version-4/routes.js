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
      offences: utils.getOffences(),
      offence: utils.getOffence(req.session.data.class, req.session.data.category)
    })

})

// Route for class detail
router.get('/search/:class([A-K])', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/offences`,
    {
      base: req.baseUrl,
      type: "class",
      offences: utils.getOffencesByClassId(req.params.class),
      offence: utils.getOffence(req.session.data.class, req.session.data.category)
    })

})

// Add your routes above this line
module.exports = router