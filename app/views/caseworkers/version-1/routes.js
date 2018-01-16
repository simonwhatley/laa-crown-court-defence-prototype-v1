const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.version}/sign-in`)
})

// Add your routes here - above the module.exports line



// Add your routes above this line

module.exports = router
