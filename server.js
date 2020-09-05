const express =         require('express');
const bodyParser =      require('body-parser');
const app =             express();
const dbConfig =        require('./config/dbConfig.js');
const mongoose =        require('mongoose');
const methodOverride = require('method-override');



app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.set('views', './app/views');
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Succesfully connected to the database');
}).catch(err => {
  console.log('Could not connect to the database, Exiting now...', err);
  process.exit();
})

// app.get('/', (req, res) => {
//   res.redirect("/notes")
// })


// app.get('/new', (req, res) => {
//   res.render('newNote');
// })

require('./app/routes/note.routes.js')(app);

app.listen(process.env.PORT, () => {
  console.log('The scouter says the server is over 9000!');
})
