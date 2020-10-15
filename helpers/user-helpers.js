var db = require('../config/connection')
var collection=require('../config/collections')
const bcrypt = require('bcrypt')
const { resolve } = require('path')
var ObjectId = require('mongodb').ObjectID
// const { resolve } = require('path')
//  const { ObjectID } = require('bson')
//const { resolve } = require('path')


module.exports={
    doSignup:(userData)=> {
        return new Promise(async(resolve,reject)=> {
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            }) 
        })
    },
    doLogin:(userData)=> {
        return new Promise(async(resolve,reject)=> {
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            let loginStatus = false
            let response = {}
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=> {
                    if(status){
                        console.log("Login succes");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("Login Failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("Login Failed");
                resolve({status:false})
            }      
        })
    },
    addToCart:(proId,userId)=>{
        let proObj={
            item:ObjectId(proId),
            quantity:1
        }
        return new Promise (async(resolve,reject)=>{
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(userCart){
                let proExist = userCart.products.findIndex(product => product.item === proId)
                 console.log(proExist);
                 if(proExist != -1){
                    db.get().collection(collection.CART_COLLECTION).updateOne({'products.item':ObjectId(proId)},
                    {
                        $inc:'products.quantity'
                    }
                    )
                 }
                // db.get().collection(collection.CART_COLLECTION).
                // updateOne({user:ObjectId(userId)},
                // {                    
                //      $push:{products:proObj}        
                // }
                // ).then((response)=>{
                //     resolve()
                // })
            }else{
                let cartObj={
                    user:ObjectId(userId),
                    products:[proObj]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                        let:{proList:'$products'},
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id','$$proList']
                                    }
                                }
                            }
                        ],
                        as:'cartItems'
                    }
                }
            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
    },
    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count=0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(cart){
                count=cart.products.length
            }
            resolve(count)
        })
    }
}