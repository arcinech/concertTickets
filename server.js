require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const seatsRouts = require('./routes/seats.routes');
const testimionalsRouts = require('./routes/testimionals.routes');
const concertsRoutes = require('./routes/concerts.routes');

const socket = require('socket.io');
const Seat = require('./models/seat.model');


const app = express();

if(NODE_ENV === 'production') dbUri = 'process.env.MONGODB_URI';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/companyDBtest';
else dbUri = 'mongodb://localhost:27017/companyDB';

// Port for listening of the server 
const serv =  app.listen(process.env.PORT || 8000);

// Socket for listening of the server -  cors origin set to any
const io = socket(serv, {
  cors: {
    origin: '*',
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Routes middleware
app.use('/api', seatsRouts);
app.use('/api', testimionalsRouts);
app.use('/api', concertsRoutes);

// Middleware for client on production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//Use .env file variables if exist else use default
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

io.on('connection', async (socket) => {
  try { 
    console.log('a user connected');
    const seats = await Seat.find({}).lean();
    await socket.emit('seatsUpdated', seats);
    socket.on('disconnect', () => {
      console.log('user disconnected');
  });
  }
  catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).json({message: 'Not found...' });
});

module.exports = serv;