var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products',{ products })
  })
});

router.get('/login',(req,res)=> {
  res.render('user/login')
})
router.get('createaccount', (req,res)=> {
  res.render('user/createaccount')
})

module.exports = router;
