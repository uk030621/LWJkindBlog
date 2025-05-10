import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = { useUnifiedTopology: true };

let client;
let db;

if (!client) {
  client = new MongoClient(uri, options);
  db = client.db("community_blog");
}

export { client, db };
