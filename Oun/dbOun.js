const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017/moviebox';

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient
        .connect(URL)
        .then((client)=>{
            console.log('Connected to Mongo DB');
            dbConnection = client.db();
            return cb();

        })
        .catch((err) => {
            return cd(err);
        })
    },
    getDb: () => dbConnection,
}