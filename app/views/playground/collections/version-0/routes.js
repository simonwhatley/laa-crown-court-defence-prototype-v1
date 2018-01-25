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
  res.redirect(`/${req.section}/${req.feature}/${req.version}/class`)
})

// Add your routes above this line
module.exports = router