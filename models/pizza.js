// models/pizza.js
const db = require('./db.js');

const Pizza = {
  getAll: callback => {
    db.query('SELECT * FROM pizzas ORDER BY id DESC', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM pizzas WHERE id = ?', [id], (err, results) => {
      callback(err, results[0]);
    });
  },

  create: (data, callback) => {
    const { name, price, discount, category, stock, description, image_url } = data;
    const q = `
      INSERT INTO pizzas (name, price, discount, category, stock, description, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(q, [name, price, discount, category, stock, description, image_url], callback);
  },

  update: (id, data, callback) => {
    const { name, price, discount, category, stock, description, image_url } = data;
    const q = `
      UPDATE pizzas SET name=?, price=?, discount=?, category=?, stock=?, description=?, image_url=?
      WHERE id = ?
    `;
    db.query(q, [name, price, discount, category, stock, description, image_url, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM pizzas WHERE id = ?', [id], callback);
  }
};

module.exports = Pizza;
