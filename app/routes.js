const express = require('express')
const router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Add your routes here - above the module.exports line


router.get('/providers/litigators/case-details', function(req, res) {
    res.render('providers/litigators/case-details', 
    	{ 
    		'next_url' : '/providers/litigators/defendant-details', 
    		'previous_url' : '/providers/litigators/' 
    	});
});


module.exports = router
