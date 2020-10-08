const { response, Router } = require('express');
var express = require('express');
const { route } = require('../app');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require("../helpers/product-helpers")
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })
  
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Images);

  productHelpers.addProduct(req.body,(id)=> {
    let images=req.files.Images
    console.log(id);
    images.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if (!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
    res.render("admin/add-product")
  })
})
router.get('/delete-product/:id',(req,res)=> {
  let proId = req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=> {
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id',async(req,res)=> {
  let product = productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product',{product})
})
module.exports = router;
