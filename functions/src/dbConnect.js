import { MongoClient } from "mongodb";

import { uri } from "./secrets.js";

export default function dbConnect() { //dbConnect tells us which database we are putting our instructions for connecting in a database - for example firebase or Mongodb. 
    const client = new MongoClient(uri); 
    return client.db("mydatabase");
    
}