// import dotenv from 'dotenv';
// import express from 'express';
// import { AccessToken } from 'livekit-server-sdk';
// import cors from 'cors'
const dotenv = require('dotenv');
const express = require('express')
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors')


dotenv.config();

const createToken = (roomName,participantName) => {

  const at = new AccessToken(process.env.ENV_API_KEY, process.env.ENV_API_SECRET, {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
}

const app = express();
const port = 3000;

const allowedOrigins = ['https://connectnow-frontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.get('/getToken', (req, res) => {
 
  const { roomName, participantName} = req.query;
  res.send(createToken(roomName,participantName));
});

app.get('/',(req,res)=>{
  return res.json({message:"testing this"})
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})