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
  } catch (error) {}
};
module.exports.getMongoDbConnection = async function getMongoDbConnection() {
  try {
    return await objMongoConnection.db('MSG');
  } catch (error) {}
};
