var db = require('../config/connection')
var collection=require('../config/collections')
const bcrypt = require('bcrypt')
const { resolve } = require('path')
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
    }
}