const { getMongoDbConnection } = require('../config/connection');
const COLLECTION = require('../config/collections');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')


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

module.exports.Login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const admin = await collection.findOne();
            if (admin) {
                if (admin.username == username) {
                    bcrypt.compare(password, admin.password)
                        .then(status => status ? resolve({ id: admin._id }) : reject({ message: "Incorrect password" }))
                        .catch(error => reject({ message: error.message }))
                }
                else return reject({ message: "Incorrect username" });
            }
            else return reject({ message: "Admin does not exist" });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports.ForgotPassword = ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getMongoDbConnection();
            const collection = db.collection(COLLECTION.admin);
            const admin = await collection.findOne();
            if (admin) {
                if (admin.email == email) {
                    bcrypt.compare(password, admin.password)
                        .then((status) => {
                            if (status){
                                async function main() {

                                    let transporter = nodemailer.createTransport({
                                        service: "gmail",
                                        auth: {
                                            user: process.env.ADMIN_MAIL_ID,
                                            pass: process.env.ADMIN_PASSWORD,
                                        },
                                    });

                                    // send mail with defined transport object
                                    let info = await transporter.sendMail({
                                        from: process.env.ADMIN_MAIL_ID, // sender address
                                        to: email, // list of receivers
                                        subject: "sdfs ✔", // Subject line
                                        text: "Hello sdffsd?", // plain text body
                                        html: "<b>Hello world?</b>", // html body
                                    });

                                    console.log("Message sent: %s", info.messageId);

                                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                                }

                                main()
                                .then(status =>  resolve({ mailStatus: true }))
                                .catch(console.error);
                            }else{
                                reject({ message: "Incorrect password" })
                            }
                            
                        } )
                        .catch(error => reject({ message: error.message }))
                }
                else return reject({ message: "Incorrect username" });
            }
            else return reject({ message: "Admin does not exist" });
        } catch (error) {
            reject(error);
        }
    })
}