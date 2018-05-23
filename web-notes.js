//adding morgan 
const morgan = require('morgan');

const express = require('express');
const app = express();

app.use(morgan('tiny'));

// app.get('/', (req, res) => res.send('Web Notes'))

// app.use('/', express.static('views'));

const notes = [
  'http is a protocol',
  'http requests have a url, method, header, and body',
  'note number 3'
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('notes', { notes: notes });
});

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});

app.delete('/notes/:id', (req, res) => {
  if(req.params.id < notes.length){
    notes.splice(req.params.id, 1);
    res.send('deleted');
  }else{
    res.send("Error! That index value is out of bounds and the note does not exist.")
  }
});

app.put('/notes/:id', (req, res) => {
  if(req.params.id < notes.length){
    notes[req.params.id] = req.body.note
  }else{
    res.send("404 Error");
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))