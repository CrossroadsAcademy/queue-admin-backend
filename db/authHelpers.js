const { getMongoDbConnection } = require('../config/connection');
const COLLECTION = require('../config/collections');
const bcrypt = require('bcrypt')


module.exports.registerAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { username, password } = data
            console.log(data, "db function");
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const checkUsername = await collection.findOne({ username: username });
            if (checkUsername) {
                console.log(checkUsername);
                return reject({ msg: "Username already exists" });
            } else {
                data.password = await bcrypt.hash(password, 10)
                const response = await collection.insertOne(data);
                if (response.acknowledged) return resolve(response)
                return reject({ msg: "Admin Data Insertion Failed" });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports.checkAdmin = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const response = await collection.findOne({ username: username });
            console.log("AdminCheck:", response);
        } catch (error) {

        }
    })
}