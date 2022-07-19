const express = require('express');
const cors = require('cors');
const path = require('path');
const seatsRouts = require('./routes/seats.routes');
const testimionalsRouts = require('./routes/testimionals.routes');
const concertsRoutes = require('./routes/concerts.routes');
const socket = require('socket.io');
const db = require('./db');

const app = express();
// Port for listening of the server 
const serv =  app.listen(process.env.PORT || 8000);

const origin = process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:8000';
// Socket for listening of the server
const io = socket(serv, {
  cors: {
    origin: origin,
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('seatsUpdated', db.seats);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
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

app.use((req, res) => {
  res.status(404).json({message: 'Not found...' });
});
