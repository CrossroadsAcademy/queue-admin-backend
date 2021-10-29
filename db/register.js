const {getMongoDbConnection} =require('../config/connection');
const COLLECTION = require('../config/collections');


module.exports.registerAdmin = (data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(data,"db function");
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const response = await collection.insertOne(data);

            if(response.acknowledged) return resolve(response)
            return reject({msg:"Admin Data Insertion Failed"});
            
        } catch (error) {
            reject(error);
        }
    })
}