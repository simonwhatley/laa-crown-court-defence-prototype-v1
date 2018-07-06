const express = require('express');
const router = new express.Router();

router.use('/', (req, res, next) => {
  req.feature = req.originalUrl.split('/')[1];
  req.version = req.originalUrl.split('/')[2];
  // res.locals.feature = req.feature
  // res.locals.version = req.version
  next();
})

// Route index page
router.get('/', function (req, res) {
  res.render('index');
});

// Add your routes here - above the module.exports line

// ==============================================
// PROVIDERS
// ==============================================

// Providers (Advocates and Litigators)
router.use(/\/providers\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/providers/version-${req.params[0]}/routes`)(req, res, next);
});

// ==============================================
// CASEWORKERS
// ==============================================

// Caseworkers
router.use(/\/caseworkers\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/caseworkers/version-${req.params[0]}/routes`)(req, res, next);
});

// ==============================================
// ADMINS
// ==============================================

// Admins (provider registration)
router.use(/\/admins\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/admins/version-${req.params[0]}/routes`)(req, res, next);
});

// ==============================================
// PLAYGROUND
// ==============================================

// Playground > Accordion
router.use(/\/playground\/accordion\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/accordion/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Autocomplete
router.use(/\/playground\/autocomplete\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/autocomplete/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Collections
router.use(/\/playground\/collections\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/collections/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Dependent drop-downs
router.use(/\/playground\/dependent-dropdowns\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/dependent-dropdowns/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Search/filter
router.use(/\/playground\/search-filter\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/search-filter/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Data tables
router.use(/\/playground\/datatables\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/datatables/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Data
router.use(/\/playground\/data\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/data/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Multiple items
router.use(/\/playground\/multiple-items\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/multiple-items/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Markdown
router.use(/\/playground\/markdown\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/markdown/version-${req.params[0]}/routes`)(req, res, next);
});

// Playground > Macros
router.use(/\/playground\/macros\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/playground/macros/version-${req.params[0]}/routes`)(req, res, next);
});

// Add your routes above this line

module.exports = router;
