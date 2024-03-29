# c01w24-project-team-apple
Our updated project code is in dev. main is not updated.

# Instructions to run our project:
We have a setup similar to the labs, using Expo Go to run our app on a mobile device.
Note: The phone/mobile device and laptop/computer must be on the same network.

Set up and run database: (equivalent to how it is done in the labs)
- in the backend directory, run
- mkdir data
- cd data
- mkdir db
- cd ..
- cd ..
- "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath=.\data\db
    - or your equivalent version of the above
 
Run the backend:
- in the backend directory, run
- npm install
- npm run start

Set up localtunnel to communicate between 2 seperate devices (i.e. phone and laptop)
- in any directorty of the project, such as the root, run
- npx localtunnel --port 4000
- take the link provided and replace it with the existing value of variable devLink in DevLink.ts, located in the constants directory
    - this is the link that the frontend ran on a mobile device will use to contact the backend ran on a computer

Run the frontend: (equivalent to how it is done in the labs)
- in the go-here directory, run
- npm install
- npm run start
- use the QR code to open the app on a mobile device with Expo Go
