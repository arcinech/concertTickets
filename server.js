require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');

const seatsRouts = require('./routes/seats.routes');
const testimionalsRouts = require('./routes/testimionals.routes');
const concertsRoutes = require('./routes/concerts.routes');
const workshopRoutes = require('./routes/workshops.routes');
const socket = require('socket.io');
const Seat = require('./models/seat.model');

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') dbUri = 'process.env.MONGODB_URI';
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

// Port for listening of the server
const serv = app.listen(process.env.PORT || 8000);

// Socket for listening of the server -  cors origin set to any
const io = socket(serv, {
  cors: {
    origin: '*',
  },
});

app.use(helmet());
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
app.use('/api', workshopRoutes);

// Middleware for client on production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//Use .env file variables if exist else use default
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  if (NODE_ENV === 'production') {
    console.log('Connected to MongoDB');
  } else if (NODE_ENV === 'test') {
  } else {
    console.log('Connected to the database localhost:27017/NewWaveDB');
  }
});

db.on('error', err => console.log('Error ' + err));

io.on('connection', async socket => {
  try {
    console.log('a user connected');
    const seats = await Seat.find({}).lean();
    await socket.emit('seatsUpdated', seats);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = serv;
