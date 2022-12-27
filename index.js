// % Imports ..........................................................
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

//% Accessing express and set up server variables .....................
const app = express();

//% Accessing routes from the files inside the routes directory.
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');

// # Check .env file for port variables. If they exist, use those if not, use port 8000.
const PORT = process.env.PORT || 8000;

// % Middleware functions
function authenticateToken(req, res, next) {
  // ? Get meta information for request
  const authHeader = req.headers.authorization;
  console.log({ auth: req.headers.authorization });

  // ? Store the token in a variable
  const token = authHeader && authHeader.split(' ')[1];
  console.log({ token });

  // ? What if no token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'ilovenachos', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(req.user);
    next();
  });
}

// # Use cors to allow for cross page communication
app.use(cors());
app.use(function (req, res, next) {
  //? Website we wish to allow content
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  //? Request methods we will allow
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  //? RType of content we wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  //? Set to true if you need website to include cookies in the request sent to
  //? api (e.g. in case you use sessions).
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
// # Use express.json so we can unpack req.body (middleware)
app.use(express.json());

// % Defining Routes.................................
app.use('/signup', signupRoutes);

app.use('/signin', signinRoutes);

// # Users route needs authentication
app.use('/users', authenticateToken, userRoutes);

// # Todos route needs authentication
app.use('/todos', authenticateToken, todoRoutes);

// # Set up base route to make sure your app is working.
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

// // # Route to CREATE NEW USER
// app.post('/users', (req, res) => {
//   const { name, email, password } = req.body;
//   // ? Abstracting the variable values
//   const params = [null, name, email, password];
//   pool.query(
//     `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
//     params,
//     (err, results, fields) => {
//       res.json(results);
//     }
//   );
// });

// // # Route to GET ALL USERS
// app.get('/users', (req, res) => {
//   pool.query('SELECT * FROM users', function (err, rows, fields) {
//     res.json(rows);
//   });
// });

// // # Route to GET USER by id
// app.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   pool.query(
//     `SELECT * FROM users WHERE id = ${id}`,
//     function (err, rows, fields) {
//       res.json(rows);
//     }
//   );
// });
// // # Route to UPDATE USER by id
// app.put('/users/:id', (req, res) => {
//   const { id } = req.params;
//   pool.query(
//     'UPDATE users SET ? WHERE id = ?',
//     [req.body, id],
//     (err, row, fields) => {
//       res.json(row);
//     }
//   );
// });
// // # Route to DELETE USER by id
// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   pool.query('DELETE FROM users WHERE id = ?', [id], (err, row, fields) => {
//     res.json(row);
//   });
// });
// # Use app to listen to the port you defined.
app.listen(PORT, () => console.log(`Listening @ http://localhost:${PORT}`));
