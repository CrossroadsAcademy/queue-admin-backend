const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
let objMongoConnection;

module.exports.createMongoDbConnection = async function createMongoDbConnection() {
  try {
    objMongoConnection = await mongoClient.connect(
        process.env.DB_URL,
      {
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to database');
  } catch (error) {
      console.log("Database Connection Failed Error:",error);
  }
};
module.exports.getMongoDbConnection = async function getMongoDbConnection() {
  try {
    return await objMongoConnection.db(process.env.DB_NAME);
  } catch (error) {}
};
