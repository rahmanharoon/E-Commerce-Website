var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"OPPO A5",
      category:"Mobile",
      description:" OPPO A5 2020 (Dazzling White, 4GB RAM, 64GB Storage)",
      image:"https://images-na.ssl-images-amazon.com/images/I/71wPwmxo2NL._SL1500_.jpg"
    },
    {
      name:"LG V30+",
      category:"Mobile",
      description:"LG V30+'s 6.0 display makes your vieweing experience a real treat",
      image:"https://www.lg.com/hk_en/images/mobile-phone/md05885198/gallery/H930DS-Aurora-Black-128GB_Desk1_171009.jpg"
    },
    {
      name:"REDMI 7A",
      category:"Mobile",
      description:"4000mAh(typ) two-day battery, 12MP AI Sony IMX486 rear camera, 13.8cm (5.45) HD+ display and 2-year warranty",
      image:"https://i01.appmifile.com/webfile/globalimg/in/cms/34137661-AF75-C01C-3A19-A5850B95458C.jpg"
    },
    {
      name:"OnePlus 7T Pro",
      category:"Mobile",
      description:"The 7T Pro is the replacement for the OnePlus 7 Pro. The frosted, matte texture of the OnePlus 7T",
      image:"https://i.gadgets360cdn.com/products/large/oneplus-7t-pro-386x800-1570722452.jpg"
    }
  ]

  res.render('admin/view-products',{admin:true,products})
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
})

module.exports = router;
