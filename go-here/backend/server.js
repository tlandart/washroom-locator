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
    washrooms: "washrooms",
    users: "users",
    requested: "requested",
    sponsors: "sponsors"
  };

  app.get("/getAllSponsors", express.json(), async (req, res) => {
    try {
        const collection = db.collection(COLLECTIONS.sponsors);
        const data = await collection.find().toArray();
        res.json({ response: data });
      } catch (error) {
        res.status(500).json({error: error.message})
      }
});

app.post("/postSponsor", express.json(), async (req, res) => {
  try {
    const { title, sponsorlvl } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Title and sponsorlvl 0, 1, 2, or 3 are required." });
    }

    const collection = db.collection(COLLECTIONS.sponsors);
    const result = await collection.insertOne({
      title,
      sponsorlvl
    });
    res.json({
      response: "Sponsor added succesfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/patchSponsorlvl/:sponsorId", express.json(), async (req, res) => {
  try {
    const sponsorId = req.params.sponsorId;
    if (!ObjectId.isValid(sponsorId)) {
      return res.status(400).json({ error: "Invalid sponsor ID." });
    }

    const { sponsorlvl } = req.body;
    
    const collection = db.collection(COLLECTIONS.sponsors);
    const data = await collection.updateOne({
      _id: new ObjectId(sponsorId),
    }, {
      $set: {
        ...(sponsorlvl && {sponsorlvl})
      }
    });

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find sponsor with given ID." });
    }
    res.json({ response: `Document with ID ${sponsorId} patched.` });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

app.delete("/deleteSponsor/:sponsorId", express.json(), async (req, res) => {
  try {
    const sponsorId = req.params.sponsorId;
    if (!ObjectId.isValid(sponsorId)) {
      return res.status(400).json({ error: "Invalid sponsor ID." });
    }

    const collection = db.collection(COLLECTIONS.sponsors);
    const data = await collection.deleteOne({
      _id: new ObjectId(sponsorId),
    });

    if (data.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find sponsor with given ID." });
    }
    res.json({ response: `Document with ID ${sponsorId} deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get("/getAllWashrooms", express.json(), async (req, res) => {
    try {
        const collection = db.collection(COLLECTIONS.washrooms);
        const data = await collection.find().toArray();
        res.json({ response: data });
      } catch (error) {
        res.status(500).json({error: error.message})
      }
});

app.get("/getWashroom/:washroomId", express.json(), async (req, res) => {
  try {
    const washroomId = req.params.washroomId;
    if (!ObjectId.isValid(washroomId)) {
      return res.status(400).json({ error: "Invalid washroom ID." });
    }

    const collection = db.collection(COLLECTIONS.washrooms);
    const data = await collection.findOne(new ObjectId(washroomId));

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find washroom with given ID." });
    }
    res.json({ response: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/postWashroom", express.json(), async (req, res) => {
  try {
    const { title, address, longitude, latitude, sponsorlvl } = req.body;

    if (!title || !address || !longitude || !latitude) {
      return res
        .status(400)
        .json({ error: "Title, Address, Longitude, Latitude, and sponsorlvl 0, 1, 2, or 3 are required." });
    }

    const collection = db.collection(COLLECTIONS.washrooms);
    const result = await collection.insertOne({
      title,
      address,
      longitude,
      latitude,
      sponsorlvl
    });
    res.json({
      response: "Washroom added succesfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/patchWashroom/:washroomId", express.json(), async (req, res) => {
  try {
    const washroomId = req.params.washroomId;
    if (!ObjectId.isValid(washroomId)) {
      return res.status(400).json({ error: "Invalid Washroom ID." });
    }

    const { title, address, longitude, latitude, sponsorlvl } = req.body;
    if (!title && !address && !longitude && !latitude) {
      return res
        .status(400)
        .json({ error: "Must have at least one of title, address, longitude, latitude, or sponsorlvl." });
    }

    const collection = db.collection(COLLECTIONS.washrooms);
    const data = await collection.updateOne({
      _id: new ObjectId(washroomId),
    }, {
      $set: {
        ...(title && {title}),
        ...(address && {address}),
        ...(longitude && {longitude}),
        ...(latitude && {latitude}),
        ...(sponsorlvl && {sponsorlvl})
      }
    });

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find washroom with given ID." });
    }
    res.json({ response: `Document with ID ${washroomId} patched.` });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

app.get("/getUser/:userId", express.json(), async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    const collection = db.collection(COLLECTIONS.users);
    const data = await collection.findOne(new ObjectId(userId));

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find user  with given ID." });
    }
    res.json({ response: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/postUser", express.json(), async (req, res) => {
  try {
    const { firstName, lastName, healthCondition } = req.body;

    if (!firstName && !lastName && !healthCondition) {
      return res
        .status(400)
        .json({ error: "At least one of firstName, lastName, healthCondition is required" });
    }

    const collection = db.collection(COLLECTIONS.users);
    const result = await collection.insertOne({
      firstName,
      lastName,
      healthCondition
    });
    res.json({
      response: "User added succesfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/patchUser/:userId", express.json(), async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID." });
    }

    const { firstName, lastName, healthCondition} = req.body;
    if (!firstName && !lastName && !healthCondition) {
      return res
        .status(400)
        .json({ error: "Must have at least one of firstName or lastName or healthCondition" });
    }

    const collection = db.collection(COLLECTIONS.users);
    const data = await collection.updateOne({
      _id: new ObjectId(userId),
    }, {
      $set: {
        ...(firstName && {firstName}),
        ...(lastName && {lastName}),
        ...(healthCondition && {healthCondition})
      }
    });

    if (data.matchedCount === 0) {
      return res
        .status(404)
        .json({ error: "Unable to find user with given ID." });
    }
    res.json({ response: `Document with ID ${userId} patched.` });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

app.get("/getAllRequested", express.json(), async (req, res) => {
  try {
      const collection = db.collection(COLLECTIONS.requested);
      const data = await collection.find().toArray();
      res.json({ response: data });
    } catch (error) {
      res.status(500).json({error: error.message})
    }
});

app.post("/postWashroomRequest", express.json(), async (req, res) => {
  try {
    const { title, address, longitude, latitude } = req.body;

    if (!title || !address || !longitude || !latitude) {
      return res
        .status(400)
        .json({ error: "Title, Address, Longitude, and Latitude are required." });
    }

    const collection = db.collection(COLLECTIONS.requested);
    const result = await collection.insertOne({
      title,
      address,
      longitude,
      latitude
    });
    res.json({
      response: "Washroom request added succesfully.",
      insertedId: result.insertedId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/patchRequestStatus/:washroomId", express.json(), async (req, res) => {
  try {
    const washroomId = req.params.washroomId;
    if (!ObjectId.isValid(washroomId)) {
      return res.status(400).json({ error: "Invalid Washroom ID." });
    }

    const { status } = req.body;
    if (!status && status != "ACCEPTED" && status != "DECLINED") {
      return res
        .status(400)
        .json({ error: "Must have status of either \"ACCEPTED\" or \"DECLINED\"." });
    }

    const washroomCollection = db.collection(COLLECTIONS.washrooms);
    const requestCollection = db.collection(COLLECTIONS.requested);

    if(status === "ACCEPTED"){
      const washroomData = await requestCollection.findOne(new ObjectId(washroomId));
      const newWashroomData = await washroomCollection.insertOne({
        title: washroomData.title,
        address: washroomData.address,
        longitude: washroomData.longitude,
        latitude: washroomData.latitude
      });
      res.json({
        response: "Washroom added succesfully.",
        insertedId: newWashroomData.insertedId,
      }); 
      const requestData = await requestCollection.deleteOne({
        _id: new ObjectId(washroomId),
      });

      if (newWashroomData.matchedCount === 0 || washroomData.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "Unable to find accepted washroom with given ID." });
      } 
      
      return res
    } else if (status === "DECLINED"){
      const requestData = await requestCollection.deleteOne({
        _id: new ObjectId(washroomId),
      });
      if (requestData.matchedCount === 0) {
        return res
          .status(404)
          .json({ error: "Unable to find declined washroom with given ID." });
      } 
    }

    res.json({ response: `Document with ID ${washroomId} patched.` });
  } catch (error) {
    res.status(500).json({error: error.message})
  } 
});