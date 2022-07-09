const express = require('express');
const cors = require('cors');
const seatsRouts = require('./routes/seats.routes');
const testimionalsRouts = require('./routes/testimionals.routes');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', seatsRouts);
app.use('/api', testimionalsRouts);
app.use('/api', concertsRoutes);

app.use((req, res) => {
  res.status(404).json({message: 'Not found...' });
});

app.listen(8000, function () {
  console.log('Web server started at port 8000');
});