const pool = require('../sql/connection');
const bcrypt = require('bcrypt');

// # Controller to CREATE NEW USER
const create = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  // ? Abstracting the variable values
  const params = [null, name, email, hashedPassword];
  pool.query(
    `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
    params,
    (err, results, fields) => {
      res.json(results);
    }
  );
};

module.exports = { create };
