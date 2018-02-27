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
  res.redirect(`/${req.section}/${req.feature}/${req.version}/find`)
})

// Route for offence lookup
router.get('/find', function (req, res) {

  res.render(`${req.section}/${req.feature}/${req.version}/find`,
    {
      base: req.baseUrl,
      offences: utils.getOffences()
    })

})

// Add your routes above this line
module.exports = router