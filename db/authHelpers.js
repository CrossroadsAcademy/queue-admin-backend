const {getMongoDbConnection} =require('../config/connection');
const COLLECTION = require('../config/collections');


module.exports.registerAdmin = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(data,"db function");
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const checkUsername=await collection.find({username:data.username});
            if(!checkUsername){
                const response = await collection.insertOne(data);
                if(response.acknowledged) return resolve(response)
                return reject({msg:"Admin Data Insertion Failed"});
            }else{
                return reject({msg:"Username already exists"});
            }           
        } catch (error) {
            reject(error);
        }
    })
}

module.exports.checkAdmin=({username, password})=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const response = await collection.find({username:username});
            console.log("AdminCheck:",response);          
        } catch (error) {
            
        }
    })
}