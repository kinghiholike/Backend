const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');



//Importing routes
const authRoutes = require('./routes/authRoutes'); // Import your authRoutes
const getRoutes = require('./routes/getRoutes');

const db = require('./db'); // Import the database connection

const app = express();
const port = process.env.PORT || 4000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route to render the index page
app.get('/', (req, res) => {
  res.render('index');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use CORS middleware before defining routes
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Use your authRoutes
app.use('/', authRoutes);
app.use('/',getRoutes);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.message);
  } else {
    console.log('Connected to MySQL database.');
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});