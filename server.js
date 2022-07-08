const express = require('express');
const {v4: uuidv4} = require('uuid');
const db = require('./db.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/testimonials' , (req, res) => {
  console.log(req);
  res.json(db);
});

app.get('/testimonials/random' , (req, res) => {
    const random = Math.floor(Math.random()* db.length);
    res.json(db.testimonials[random]);
});

app.get('/testimonials/:id' , (req, res) => {
  res.json(db.testimonials.find(item => JSON.stringify(item.id) === req.params.id));
});


app.post('/testimonials' ,(req, res) => {
  req.body.id = uuidv4();
  const {author, text} = req.body;;
  if (author && text ) {
    console.log(req.body)
    res.json(req.body);
  } else {
    res.send('error');
  }
});

app.put('/testimonials/:id' , (req, res) => {
  res.send({message: 'OK'});
});

app.delete('/testimonials/:id' , (req, res) => {
  res.send({message: 'OK'});
});


app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 80')
})