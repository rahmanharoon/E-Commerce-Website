var db = require('../config/connection')
var collection=require('../config/collections')
module.exports={

    addProduct:(product,callback)=> {
        

        db.get().collection('product').insertOne(product).then((data)=> {
            
            callback(data.ops[0]._id)

        })
    },

    getAllProducts:()=>{
        return new Promise((resolve,reject)=>{
            let products=db.get().collection(collection.PRODUCT_COLLECTION).find()
        })
    }
}