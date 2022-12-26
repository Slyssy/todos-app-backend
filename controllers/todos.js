const pool = require('../sql/connection');

// # Controller to GET all todos
const list = (req, res) => {
  pool.query('SELECT * FROM todos', function (err, rows, fields) {
    res.json(rows);
  });
};

// # Controller to CREATE NEW USER
const create = (req, res) => {
  const { todo, user_id } = req.body;
  // ? Abstracting the variable values
  const params = [null, todo, user_id];
  pool.query(
    `INSERT INTO todos (id, todo, user_id) VALUES (?, ?, ?)`,
    params,
    (err, results, fields) => {
      res.json(results);
    }
  );
};

// # Controller to GET USER by ID
const show = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM todos WHERE id = ${id}`,
    function (err, rows, fields) {
      res.json(rows);
    }
  );
};

// # Controller to UPDATE USER by ID
const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE todos SET ? WHERE id = ?',
    [req.body, id],
    (err, row, fields) => {
      res.json(row);
    }
  );
};

// # Controller to DELETE USER by ID
const remove = (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM todos WHERE id = ?', [id], (err, row, fields) => {
    res.json(row);
  });
};

module.exports = {
  list,
  create,
  show,
  update,
  remove,
};
