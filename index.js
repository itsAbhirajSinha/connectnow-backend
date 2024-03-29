const dotenv = require('dotenv');
const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');

dotenv.config();

const createToken = (roomName, participantName) => {
  const at = new AccessToken(process.env.ENV_API_KEY, process.env.ENV_API_SECRET, {
    identity: participantName,
  });

  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
};

const app = express();
const port = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = ['https://connectnow-frontend.vercel.app'];

// Configure CORS options
const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Define route to generate token
app.get('/getToken', (req, res) => {
  const { roomName, participantName } = req.query;
  res.send(createToken(roomName, participantName));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
