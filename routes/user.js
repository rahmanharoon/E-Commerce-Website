var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
/* GET home page. */
router.get('/', function(req, res, next) {
  
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render('',{admin:true,products})
  })
});

module.exports = router;
