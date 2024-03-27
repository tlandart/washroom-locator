const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

const SERVER_URL = "http://localhost:4000";
const {MongoClient, ObjectId} = require('mongodb');

describe('notes', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017");
    db = await connection.db("goHere");
  });

  afterAll(async () => {
    await connection.close();
  });

// const fakeData = {
//   washrooms: [
//     {
//       id: uuidv4(),
//       title: "Washroom 1",
//       address: "123 Main St",
//       longitude: -73.987,
//       latitude: 40.748,
//       sponsorlvl: 1
//     }
//     // Add more washrooms as needed
//   ],
//   users: [
//     {
//       id: uuidv4(),
//       firstName: "John",
//       lastName: "Doe",
//       healthCondition: "Healthy"
//     }
//     // Add more users as needed
//   ],
//   feedback: [
//     {
//       id: uuidv4(),
//       feedback: "Test feedback 1"
//     }
//     // Add more feedbacks as needed
//   ],
//   requested: [
//     {
//       id: uuidv4(),
//       title: "Requested Washroom 1",
//       address: "456 Elm St",
//       longitude: -74.123,
//       latitude: 41.234,
//       requestType: "REQUESTED"
//     }
//     // Add more requested washrooms as needed
//   ],
//   sponsors: [
//     {
//       id: uuidv4(),
//       title: "Sponsor 1",
//       sponsorlvl: 2
//     }
//     // Add more sponsors as needed
//   ]
// };

test("/postSponsor - Post a sponsor", async () => {
  const title = "SponsorTitleTest";
  const sponsorlvl = 2;

  const postSponsorRes = await fetch(`${SERVER_URL}/postSponsor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      sponsorlvl: sponsorlvl,
    }),
  });

  const postSponsorBody = await postSponsorRes.json();

  expect(postSponsorRes.status).toBe(200);
  expect(postSponsorBody.response).toBe("Sponsor added succesfully.");
});

test("/getAllSponsors - Get all sponsors", async () => {
  const getAllSponsorsRes = await fetch(`${SERVER_URL}/getAllSponsors`);
  const getAllSponsorsBody = await getAllSponsorsRes.json();

  const sponsors = db.collection("sponsors");
  await sponsors.deleteMany({});
  const mockSponsor = { _id: new ObjectId, title : "Test sponsor 1", sponsorlvl: 0};
  const mockSponsor2 = { _id: new ObjectId, title : "Test sponsor 2", sponsorlvl: 1};
  await sponsors.insertOne(mockSponsor);
  await sponsors.insertOne(mockSponsor2);

  expect(getAllSponsorsRes.status).toBe(200);
  expect(getAllSponsorsBody.response).toBeDefined();
});

test("/patchSponsorlvl/:sponsorId - Patch sponsor level", async () => {
  const sponsors = db.collection("sponsors");
  await sponsors.deleteMany({});
  const mockSponsor = { _id: new ObjectId, title : "Test sponsor 1", sponsorlvl: 0};
  await sponsors.insertOne(mockSponsor);

  const patchSponsorlvlRes = await fetch(`${SERVER_URL}/patchSponsorlvl/${mockSponsor._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        sponsorlvl: 3,
      }),
  });

  const patchSponsorlvlBody = await patchSponsorlvlRes.json();

  expect(patchSponsorlvlRes.status).toBe(200);
  expect(patchSponsorlvlBody.response).toBe(`Document with ID ${mockSponsor._id} patched.`);
});

test("/deleteSponsor/:sponsorId - Delete sponsor", async () => {
  const sponsors = db.collection("sponsors");
  await sponsors.deleteMany({});
  const mockSponsor = { _id: new ObjectId, title : "Test sponsor 1", sponsorlvl: 0};
  await sponsors.insertOne(mockSponsor);

  const deleteSponsorRes = await fetch(`${SERVER_URL}/deleteSponsor/${mockSponsor._id}`, {
    method: "DELETE",
  });

  const deleteSponsorBody = await deleteSponsorRes.json();

  expect(deleteSponsorRes.status).toBe(200);
  expect(deleteSponsorBody.response).toBe(`Document with ID ${mockSponsor._id} deleted.`);
});

test("/getAllWashrooms - Get all washrooms", async () => {
  const getAllWashroomsRes = await fetch(`${SERVER_URL}/getAllWashrooms`);
  const getAllWashroomsBody = await getAllWashroomsRes.json();

  const washrooms = db.collection("washrooms");
  await washrooms.deleteMany({});
  const mockWashroom1 = { _id: new ObjectId, title : "Test washroom 1", address: "123 st", latitude: 10, longitude: -10, sponsorlvl: 0};
  await washrooms.insertOne(mockWashroom1);

  expect(getAllWashroomsRes.status).toBe(200);
  expect(getAllWashroomsBody.response).toBeDefined();
});

test("/getWashroom/:washroomId - Get washroom by ID", async () => {
  const washrooms = db.collection("washrooms");
  await washrooms.deleteMany({});
  const mockWashroom1 = { _id: new ObjectId, title : "Test washroom 1", address: "123 st", latitude: 10, longitude: -10, sponsorlvl: 0};
  await washrooms.insertOne(mockWashroom1);

  const getWashroomRes = await fetch(`${SERVER_URL}/getWashroom/${mockWashroom1._id}`);
  const getWashroomBody = await getWashroomRes.json();

  expect(getWashroomRes.status).toBe(200);
  expect(getWashroomBody.response).toBeDefined();
});

test("/postWashroom - Post a new washroom", async () => {
  const title = "New Washroom";
  const address = "123 Main St";
  const longitude = -73.987;
  const latitude = 40.748;
  const sponsorlvl = 1;

  const postWashroomRes = await fetch(`${SERVER_URL}/postWashroom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      address: address,
      longitude: longitude,
      latitude: latitude,
      sponsorlvl: sponsorlvl,
    }),
  });

  const postWashroomBody = await postWashroomRes.json();

  expect(postWashroomRes.status).toBe(200);
  expect(postWashroomBody.response).toBe("Washroom added succesfully.");
});

test("/patchWashroom/:washroomId - Patch washroom by ID", async () => {
  const washrooms = db.collection("washrooms");
  await washrooms.deleteMany({});
  const mockWashroom1 = { _id: new ObjectId, title : "Test washroom 1", address: "123 st", latitude: 10, longitude: -10, sponsorlvl: 0 };
  await washrooms.insertOne(mockWashroom1);

  const patchWashroomRes = await fetch(`${SERVER_URL}/patchWashroom/${mockWashroom1._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Updated Washroom",
      sponsorlvl: 2,
    }),
  });

  const patchWashroomBody = await patchWashroomRes.json();

  expect(patchWashroomRes.status).toBe(200);
  expect(patchWashroomBody.response).toBe(`Document with ID ${mockWashroom1._id} patched.`);
});

test("/getUser/:userId - Get user by ID", async () => {
  const users = db.collection("users");
  await users.deleteMany({});
  const mockUser = { _id: new ObjectId, firstName : "Test user 1", lastName: "Last name 1", healthCondition: "test" };
  await users.insertOne(mockUser);

  const getUserRes = await fetch(`${SERVER_URL}/getUser/${mockUser._id}`);
  const getUserBody = await getUserRes.json();

  expect(getUserRes.status).toBe(200);
  expect(getUserBody.response).toBeDefined();
});

test("/postUser - Post a new user", async () => {
  const firstName = "John";
  const lastName = "Doe";
  const healthCondition = "Healthy";

  const postUserRes = await fetch(`${SERVER_URL}/postUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      healthCondition: healthCondition,
    }),
  });

  const postUserBody = await postUserRes.json();

  expect(postUserRes.status).toBe(200);
  expect(postUserBody.response).toBe("User added succesfully.");
});

test("/patchUser/:userId - Patch user by ID", async () => {
  const users = db.collection("users");
  await users.deleteMany({});
  const mockUser = { _id: new ObjectId, firstName : "Test user 1", lastName: "Last name 1", healthCondition: "test" };
  await users.insertOne(mockUser);

  const patchUserRes = await fetch(`${SERVER_URL}/patchUser/${mockUser._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastName: "Smith",
    }),
  });

  const patchUserBody = await patchUserRes.json();

  expect(patchUserRes.status).toBe(200);
  expect(patchUserBody.response).toBe(`Document with ID ${mockUser._id} patched.`);
});

test("/postFeedback - Post feedback", async () => {
  const feedback = "Test feedback";

  const postFeedbackRes = await fetch(`${SERVER_URL}/postFeedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      feedback: feedback,
    }),
  });

  const postFeedbackBody = await postFeedbackRes.json();

  expect(postFeedbackRes.status).toBe(200);
  expect(postFeedbackBody.response).toBe("Feedback added succesfully.");
});

test("/getAllRequested - Get all requested washrooms", async () => {
  const requests = db.collection("requested");
  await requests.deleteMany({});
  const mockRequest = { _id: new ObjectId, title: "Test request 1", address: "123 st", longitude: 10, latitude: -10, requestType: "USERCLOSURE" };
  await requests.insertOne(mockRequest);

  const getAllRequestedRes = await fetch(`${SERVER_URL}/getAllRequested`);
  const getAllRequestedBody = await getAllRequestedRes.json();

  expect(getAllRequestedRes.status).toBe(200);
  expect(getAllRequestedBody.response).toBeDefined();
});

test("/postWashroomRequest - Post a washroom request", async () => {
  const title = "Test Washroom";
  const address = "Test Address";
  const longitude = 123.456;
  const latitude = 78.910;
  const requestType = "USERREQUEST"; 

  const postWashroomRequestRes = await fetch(`${SERVER_URL}/postWashroomRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      address: address,
      longitude: longitude,
      latitude: latitude,
      requestType: requestType,
    }),
  });

  const postWashroomRequestBody = await postWashroomRequestRes.json();

  expect(postWashroomRequestRes.status).toBe(200);
  expect(postWashroomRequestBody.response).toBe("Washroom request added succesfully.");
});

test("/patchRequestStatus/:washroomId - Patch request status", async () => {
  const requests = db.collection("requested");
  await requests.deleteMany({});
  const mockRequest1 = { _id: new ObjectId, title: "Test request 1", address: "123 st", longitude: 10, latitude: -10, requestType: "USERREQUEST" };
  const mockRequest2 = { _id: new ObjectId, title: "Test request 1", address: "123 st", longitude: 10, latitude: -10, requestType: "BUSINESSREQUEST" };
  const mockRequest3 = { _id: new ObjectId, title: "Test request 1", address: "123 st", longitude: 10, latitude: -10, requestType: "USERCLOSURE" };
  await requests.insertOne(mockRequest1);
  await requests.insertOne(mockRequest2);
  await requests.insertOne(mockRequest3);

  const patchRequestStatusRes1 = await fetch(`${SERVER_URL}/patchRequestStatus/${mockRequest1._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "ACCEPTED",
    }),
  });

  const patchRequestStatusRes2 = await fetch(`${SERVER_URL}/patchRequestStatus/${mockRequest2._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "ACCEPTED",
    }),
  });

  const patchRequestStatusRes3 = await fetch(`${SERVER_URL}/patchRequestStatus/${mockRequest3._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "ACCEPTED",
    }),
  });

  const patchRequestStatusBody1 = await patchRequestStatusRes1.json();
  const patchRequestStatusBody2 = await patchRequestStatusRes2.json();
  const patchRequestStatusBody3 = await patchRequestStatusRes3.json();

  expect(patchRequestStatusRes1.status).toBe(200);
  expect(patchRequestStatusBody1.response).toBeDefined();
  expect(patchRequestStatusRes2.status).toBe(200);
  expect(patchRequestStatusBody2.response).toBeDefined();
  expect(patchRequestStatusRes3.status).toBe(200);
  expect(patchRequestStatusBody3.response).toBeDefined();
});

})