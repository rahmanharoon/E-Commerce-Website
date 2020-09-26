var express = require('express');
var router = express.Router();
var productHelper = require("../helpers/product-helpers")
/* GET users listing. */
router.get('/', function(req, res, next) {
  

  res.render('admin/view-products',{admin:true,products})
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Images);

  productHelper.addProduct(req.body,(id)=> {
    let images=req.files.Images
    console.log(id);
    images.mv('./public/product-images/'+id+'.jpeg',(err,done)=>{
      if (!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
    res.render("admin/add-product")
  })
})

module.exports = router;
