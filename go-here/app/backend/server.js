import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 4000;
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "goHere";

let db;

async function connectToMongo() {
    const client = new MongoClient(mongoURL);
  
    try {
      await client.connect();
      console.log("Connected to MongoDB");
  
      db = client.db(dbName);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

connectToMongo();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

app.use(cors());


const COLLECTIONS = {
    washrooms: "washrooms"
  };

app.get("/getAllWashrooms", express.json(), async (req, res) => {
    try {
        const collection = db.collection(COLLECTIONS.washrooms);
        const data = await collection.find().toArray();
        res.json({ response: data });
      } catch (error) {
        res.status(500).json({error: error.message})
      }
});