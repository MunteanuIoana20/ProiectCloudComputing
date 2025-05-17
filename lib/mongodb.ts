import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = globalThis._mongoClientPromise!;

export default clientPromise;
