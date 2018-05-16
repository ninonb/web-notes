const express = require('express')
const app = express()

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

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});

// app.delete('/notes/:id', (req, res) => {
//   notes.splice(req.params.id, 1);
//   res.send('deleted');
// });

app.delete('/notes/1', (req, res) => {
  notes.splice(1, 1);
  res.send('deleted');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))