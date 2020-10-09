var db = require('../config/connection')
var collection=require('../config/collections')
const { ObjectID } = require('bson')
const { resolve } = require('path')
var ObjectId = require('mongodb').ObjectID
// const { resolve } = require('path')
// const { Db } = require('mongodb')
module.exports={

    addProduct:(product,callback)=> {
        

        db.get().collection('product').insertOne(product).then((data)=> {
            
            callback(data.ops[0]._id) 

        })
    },

    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=> {
        return new Promise((resolve,reject)=> {
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:ObjectID(proId)}).then((response)=> {
                resolve(response)
            })
        })
    },
    getProductDetails:(proId)=> {
        return new Promise((resolve,reject)=> {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectID(proId)}).then((product)=> {
                resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetails)=> {
        return new Promise((resolve,reject)=> {
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:ObjectID(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    Category:proDetails.Category
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}