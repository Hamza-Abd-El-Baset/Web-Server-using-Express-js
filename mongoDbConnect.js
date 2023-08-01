const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/express-app-DB')
.then(() => {
  console.log('Connected to MongoDB successfully')
})
.catch(err => {
  console.error(err)
  process.exit(1)
})

/*
const User = mongoose.model('User', { name: String });

const user1 = new User({ name: 'Hamza' });
user1.save().then(() => console.log('Hello'));
*/


/*

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/express-app-DB";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("express-app-DB");
    const users = database.collection('users-collection');
    users.insertOne({
        name: "Mohamed"
    })
    // Query for a user that has the name Mohamed
    const query = { name: 'Mohamed' };
    const user = await users.findOne(query);
    console.log(user);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/

