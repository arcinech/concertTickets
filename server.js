const express = require('express');
const cors = require('cors');
const path = require('path');
const seatsRouts = require('./routes/seats.routes');
const testimionalsRouts = require('./routes/testimionals.routes');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

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

// Port for listening of the server 
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});