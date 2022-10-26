const { getMongoDbConnection } = require('../config/connection');
const COLLECTION = require('../config/collections');
const bcrypt = require('bcrypt');

module.exports.registerAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { password } = data
            console.log(data, "db function");
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const checkAdmin = await collection.findOne();
            if (checkAdmin) {
                return reject({ message: "Admin already exists" });
            } else {
                data.password = await bcrypt.hash(password, 10)
                const response = await collection.insertOne(data);
                if (response.acknowledged) return resolve(response)
                return reject({ message: "Admin Data Insertion Failed" });
            }
        } catch (error) {
            reject(error);
        }
    })
}

// module.exports.Login = ({username, password}) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const db = await getMongoDbConnection();
//             const collection = db.collection(COLLECTION.admin);
//             const checkAdmin = await collection.findOne();
//             if(checkAdmin){
//                 if(checkAdmin.username==username){
//                     bcrypt.compare(password, checkAdmin.password).then((status)=>{
//                         status? resolve({ message: "Login Successfull" }): reject({ message: "Incorrect password" })
//                     }).catch(error => reject({ message: error.message }))
//                 }
//                 else   return reject({ message: "Incorrect username" });          
//             }
//            else return reject({ message: "Admin does not exist" });
//         } catch (error) {
//             reject(error);
//         }
//     })
// }