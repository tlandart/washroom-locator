const axios = require('axios');
const nock = require('nock');
const fetch = require('node-fetch');

const SERVER_URL = "http://localhost:4000";

// Configuring the base URL for Axios requests
const axiosAPIClient = axios.create({
  baseURL: 'http://localhost:4000', // Assuming your server runs on localhost:4000
  validateStatus: () => true, // Allows all status codes for testing purposes
});

describe(' Tests', () => {
  // Mocked value for PATCH /patchSponsorlvl/:sponsorId
  test('PATCH /patchSponsorlvl/:sponsorId - Mocked value', async () => {
    const sponsorId = 'some-sponsor-id'; // Assuming a valid sponsor ID
    const sponsorlvl = 2; // Mocked sponsorlvl value
    nock('http://localhost:4000')
      .patch(`/patchSponsorlvl/${sponsorId}`)
      .reply(200, { response: `Document with ID ${sponsorId} patched.` }); // Mocked response
    const response = await axiosAPIClient.patch(`/patchSponsorlvl/${sponsorId}`, { sponsorlvl });
    expect(response.status).toBe(200);
    expect(response.data.response).toBe(`Document with ID ${sponsorId} patched.`);
  });

  // Mocked value for DELETE /deleteSponsor/:sponsorId
  test('DELETE /deleteSponsor/:sponsorId - Mocked value', async () => {
    const sponsorId = 'some-sponsor-id'; // Assuming a valid sponsor ID
    nock('http://localhost:4000')
      .delete(`/deleteSponsor/${sponsorId}`)
      .reply(200, { response: `Document with ID ${sponsorId} deleted.` }); // Mocked response
    const response = await axiosAPIClient.delete(`/deleteSponsor/${sponsorId}`);
    expect(response.status).toBe(200);
    expect(response.data.response).toBe(`Document with ID ${sponsorId} deleted.`);
  });

  // Mocked value for GET /getWashroom/:washroomId
  test('GET /getWashroom/:washroomId - Mocked value', async () => {
    const washroomId = 'some-washroom-id'; // Assuming a valid washroom ID
    const mockedWashroomData = { title: 'Mocked Washroom', address: 'Mocked Address' }; // Mocked washroom data
    nock('http://localhost:4000')
      .get(`/getWashroom/${washroomId}`)
      .reply(200, { response: mockedWashroomData }); // Mocked response
    const response = await axiosAPIClient.get(`/getWashroom/${washroomId}`);
    expect(response.status).toBe(200);
    expect(response.data.response).toEqual(mockedWashroomData);
  });

  test('PATCH /patchWashroom/:washroomId - Mocked value', async () => {
    const washroomId = 'some-washroom-id'; // Assuming a valid washroom ID
    const updatedWashroomData = { title: 'Updated Washroom' }; // Mocked updated washroom data
    nock('http://localhost:4000')
      .patch(`/patchWashroom/${washroomId}`)
      .reply(200, { response: `Document with ID ${washroomId} patched.` }); // Mocked response
    const response = await axiosAPIClient.patch(`/patchWashroom/${washroomId}`, updatedWashroomData);
    expect(response.status).toBe(200);
    expect(response.data.response).toBe(`Document with ID ${washroomId} patched.`);
  });

  // Mocked value for GET /getUser/:userId
  test('GET /getUser/:userId - Mocked value', async () => {
    const userId = 'some-user-id'; // Assuming a valid user ID
    const mockedUserData = { firstName: 'Mocked', lastName: 'User' }; // Mocked user data
    nock('http://localhost:4000')
      .get(`/getUser/${userId}`)
      .reply(200, { response: mockedUserData }); // Mocked response
    const response = await axiosAPIClient.get(`/getUser/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data.response).toEqual(mockedUserData);
  });

  // Mocked value for PATCH /patchUser/:userId
  test('PATCH /patchUser/:userId - Mocked value', async () => {
    const userId = 'some-user-id'; // Assuming a valid user ID
    const updatedUserData = { firstName: 'Updated' }; // Mocked updated user data
    nock('http://localhost:4000')
      .patch(`/patchUser/${userId}`)
      .reply(200, { response: `Document with ID ${userId} patched.` }); // Mocked response
    const response = await axiosAPIClient.patch(`/patchUser/${userId}`, updatedUserData);
    expect(response.status).toBe(200);
    expect(response.data.response).toBe(`Document with ID ${userId} patched.`);
  });
  
  test('PATCH /patchRequestStatus/:washroomId - Mocked value', async () => {
    const washroomId = 'some-washroom-id'; // Assuming a valid washroom ID
    const status = 'ACCEPTED'; // Mocked status value
    nock('http://localhost:4000')
      .patch(`/patchRequestStatus/${washroomId}`)
      .reply(200, { response: `Document with ID ${washroomId} patched.` }); // Mocked response
    const response = await axiosAPIClient.patch(`/patchRequestStatus/${washroomId}`, { status });
    expect(response.status).toBe(200);
    expect(response.data.response).toBe(`Document with ID ${washroomId} patched.`);
  });

  test('/postSponsor - Post a sponsor', async () => {
    const title = "SponsorTitleTest";
    const sponsorlvl = 2;
  
    nock('http://localhost:4000')
      .post('/postSponsor')
      .reply(200, { response: "Sponsor added succesfully." });
  
    const response = await axiosAPIClient.post('/postSponsor', { title, sponsorlvl });
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBe("Sponsor added succesfully.");
  });
  
  test('/getAllSponsors - Get all sponsors', async () => {
    nock('http://localhost:4000')
      .get('/getAllSponsors')
      .reply(200, { response: {} });
  
    const response = await axiosAPIClient.get('/getAllSponsors');
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBeDefined();
  });
  
  test('/getAllWashrooms - Get all washrooms', async () => {
    nock('http://localhost:4000')
      .get('/getAllWashrooms')
      .reply(200, { response: {} });
  
    const response = await axiosAPIClient.get('/getAllWashrooms');
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBeDefined();
  });
  
  test('/postWashroom - Post a new washroom', async () => {
    const title = "New Washroom";
    const address = "123 Main St";
    const longitude = -73.987;
    const latitude = 40.748;
    const sponsorlvl = 1;
  
    nock('http://localhost:4000')
      .post('/postWashroom')
      .reply(200, { response: "Washroom added succesfully." });
  
    const response = await axiosAPIClient.post('/postWashroom', { title, address, longitude, latitude, sponsorlvl });
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBe("Washroom added succesfully.");
  });
  
  test('/postUser - Post a new user', async () => {
    const firstName = "John";
    const lastName = "Doe";
    const healthCondition = "Healthy";
  
    nock('http://localhost:4000')
      .post('/postUser')
      .reply(200, { response: "User added succesfully." });
  
    const response = await axiosAPIClient.post('/postUser', { firstName, lastName, healthCondition });
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBe("User added succesfully.");
  });
  
  test('/postFeedback - Post feedback', async () => {
    const feedback = "Test feedback";
  
    nock('http://localhost:4000')
      .post('/postFeedback')
      .reply(200, { response: "Feedback added succesfully." });
  
    const response = await axiosAPIClient.post('/postFeedback', { feedback });
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBe("Feedback added succesfully.");
  });
  
  test('/getAllRequested - Get all requested washrooms', async () => {
    nock('http://localhost:4000')
      .get('/getAllRequested')
      .reply(200, { response: {} });
  
    const response = await axiosAPIClient.get('/getAllRequested');
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBeDefined();
  });
  
  test('/postWashroomRequest - Post a washroom request', async () => {
    const title = "Test Washroom";
    const address = "Test Address";
    const longitude = 123.456;
    const latitude = 78.910;
    const requestType = "USERREQUEST";
  
    nock('http://localhost:4000')
      .post('/postWashroomRequest')
      .reply(200, { response: "Washroom request added succesfully." });
  
    const response = await axiosAPIClient.post('/postWashroomRequest', { title, address, longitude, latitude, requestType });
  
    expect(response.status).toBe(200);
    expect(response.data.response).toBe("Washroom request added succesfully.");
  });
});



