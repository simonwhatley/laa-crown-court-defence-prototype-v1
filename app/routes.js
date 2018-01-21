const express = require('express')
const router = express.Router()


router.use('/', (req, res, next) => {
  req.feature = req.originalUrl.split('/')[1]
  req.version = req.originalUrl.split('/')[2]
  // res.locals.feature = req.feature
  // res.locals.version = req.version
  next()
})

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line

// Providers (Advocates and Litigators)
router.use(/\/providers\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/providers/version-${req.params[0]}/routes`)(req, res, next);
})

// Caseworkers
router.use(/\/caseworkers\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/caseworkers/version-${req.params[0]}/routes`)(req, res, next);
})

// Admins (provider registration)
router.use(/\/admins\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/admins/version-${req.params[0]}/routes`)(req, res, next);
})

// Playground > Collections
router.use(/\/playground\/collections\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/collections/version-${req.params[0]}/routes`)(req, res, next);
})

// Add your routes above this line

module.exports = router
