const fetch = require('node-fetch');
const SERVER_URL = "http://localhost:4000";

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
  
    expect(getAllSponsorsRes.status).toBe(200);
    expect(getAllSponsorsBody.response).toBeDefined(); // Assuming response contains sponsor data
  });

  test("/patchSponsorlvl/:sponsorId - Patch sponsor level", async () => {
    const sponsorId = "123456789012345678901234"; // Replace with a valid sponsor ID
    const newSponsorlvl = 3;
  
    const patchSponsorlvlRes = await fetch(`${SERVER_URL}/patchSponsorlvl/${sponsorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sponsorlvl: newSponsorlvl,
      }),
    });
  
    const patchSponsorlvlBody = await patchSponsorlvlRes.json();
  
    expect(patchSponsorlvlRes.status).toBe(200);
    expect(patchSponsorlvlBody.response).toBe(`Document with ID ${sponsorId} patched.`);
  });

  test("/deleteSponsor/:sponsorId - Delete sponsor", async () => {
    const sponsorId = "123456789012345678901234"; // Replace with a valid sponsor ID
  
    const deleteSponsorRes = await fetch(`${SERVER_URL}/deleteSponsor/${sponsorId}`, {
      method: "DELETE",
    });
  
    const deleteSponsorBody = await deleteSponsorRes.json();
  
    expect(deleteSponsorRes.status).toBe(200);
    expect(deleteSponsorBody.response).toBe(`Document with ID ${sponsorId} deleted.`);
  });

  test("/getAllWashrooms - Get all washrooms", async () => {
    const getAllWashroomsRes = await fetch(`${SERVER_URL}/getAllWashrooms`);
    const getAllWashroomsBody = await getAllWashroomsRes.json();
  
    expect(getAllWashroomsRes.status).toBe(200);
    expect(getAllWashroomsBody.response).toBeDefined(); // Assuming response contains washroom data
  });
  
  test("/getWashroom/:washroomId - Get washroom by ID", async () => {
    const washroomId = "123456789012345678901234"; // Replace with a valid washroom ID
  
    const getWashroomRes = await fetch(`${SERVER_URL}/getWashroom/${washroomId}`);
    const getWashroomBody = await getWashroomRes.json();
  
    expect(getWashroomRes.status).toBe(200);
    expect(getWashroomBody.response).toBeDefined(); // Assuming response contains washroom data
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
    const washroomId = "123456789012345678901234"; // Replace with a valid washroom ID
    const newTitle = "Updated Washroom";
  
    const patchWashroomRes = await fetch(`${SERVER_URL}/patchWashroom/${washroomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
      }),
    });
  
    const patchWashroomBody = await patchWashroomRes.json();
  
    expect(patchWashroomRes.status).toBe(200);
    expect(patchWashroomBody.response).toBe(`Document with ID ${washroomId} patched.`);
  });

  test("/getUser/:userId - Get user by ID", async () => {
    const userId = "123456789012345678901234"; // Replace with a valid user ID
  
    const getUserRes = await fetch(`${SERVER_URL}/getUser/${userId}`);
    const getUserBody = await getUserRes.json();
  
    expect(getUserRes.status).toBe(200);
    expect(getUserBody.response).toBeDefined(); // Assuming response contains user data
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
    const userId = "123456789012345678901234"; // Replace with a valid user ID
    const newLastName = "Smith";
  
    const patchUserRes = await fetch(`${SERVER_URL}/patchUser/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName: newLastName,
      }),
    });
  
    const patchUserBody = await patchUserRes.json();
  
    expect(patchUserRes.status).toBe(200);
    expect(patchUserBody.response).toBe(`Document with ID ${userId} patched.`);
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
    const getAllRequestedRes = await fetch(`${SERVER_URL}/getAllRequested`);
    const getAllRequestedBody = await getAllRequestedRes.json();
  
    expect(getAllRequestedRes.status).toBe(200);
    expect(getAllRequestedBody.response).toBeDefined(); // Assuming response contains requested washrooms data
  });
  
  test("/postWashroomRequest - Post a washroom request", async () => {
    const title = "Test Washroom";
    const address = "Test Address";
    const longitude = 123.456;
    const latitude = 78.910;
  
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
      }),
    });
  
    const postWashroomRequestBody = await postWashroomRequestRes.json();
  
    expect(postWashroomRequestRes.status).toBe(200);
    expect(postWashroomRequestBody.response).toBe("Washroom request added succesfully.");
  });
  
  test("/patchRequestStatus/:washroomId - Patch request status", async () => {
    const washroomId = "123456789012345678901234"; // Replace with a valid washroom request ID
    const status = "ACCEPTED";
  
    const patchRequestStatusRes = await fetch(`${SERVER_URL}/patchRequestStatus/${washroomId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });
  
    const patchRequestStatusBody = await patchRequestStatusRes.json();
  
    expect(patchRequestStatusRes.status).toBe(200);
    expect(patchRequestStatusBody.response).toBeDefined(); // Assuming response contains patched document message
  });