import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local file");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    try {
      global._mongoClientPromise = client.connect();
    } catch (err) {
      console.error("MongoDB connection failed:", err);
    }
  }
  clientPromise = global._mongoClientPromise;
}


export default clientPromise;