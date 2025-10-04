import { MongoClient } from "mongodb";

const uri = "mongodb+srv://techico:<Wkm20150117>@cluster0.zubauvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
