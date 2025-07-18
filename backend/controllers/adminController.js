// const mysql = require("mysql2");
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// const path = require("path");

// // ==========================
// // 🍕 PIZZAS
// // ==========================

// // ✅ List all pizzas
// exports.listPizzas = (req, res) => {
//   db.query("SELECT * FROM pizzas ORDER BY id DESC", (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results);
//   });
// };

// // ✅ Create new pizza with image upload
// exports.createPizza = (req, res) => {
//   const { name, price, discount, category, stock, description } = req.body;

//   // Get uploaded image path
//   const image_url = req.file ? `/uploads/${req.file.filename}` : null;

//   const q = `
//     INSERT INTO pizzas (name, price, discount, category, stock, description, image_url)
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `;
//   db.query(q, [name, price, discount, category, stock, description, image_url], (err) => {
//     if (err) {
//       console.error("❌ Error creating pizza:", err); // ✅ Improved error logging
//       return res.status(500).send("DB error");
//     }
//     res.send("✅ Pizza created");
//   });

// };

// // ✅ Update pizza (with optional image change)
// exports.updatePizza = (req, res) => {
//   const { id } = req.params;

//   // ✅ Validate ID
//   if (!id || isNaN(id)) {
//     return res.status(400).send("Invalid ID"); // ✅ Prevent broken update
//   }

//   const { name, price, discount, category, stock, description } = req.body;

//   // 🖼️ Conditionally use uploaded image or retain old one
//   let image_sql = '';
//   let params = [name, price, discount, category, stock, description];

//   if (req.file) {
//     image_sql = ', image_url = ?';
//     params.push(`/uploads/${req.file.filename}`);
//   }

//   params.push(id); // For WHERE clause

//   const q = `
//     UPDATE pizzas
//     SET name = ?, price = ?, discount = ?, category = ?, stock = ?, description = ?
//     ${image_sql}
//     WHERE id = ?
//   `;

//   db.query(q, params, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("DB error during update");
//     }
//     res.send("✅ Pizza updated");
//   });
// };

// // ✅ Delete pizza
// exports.deletePizza = (req, res) => {
//   db.query("DELETE FROM pizzas WHERE id=?", [req.params.id], (err) => {
//     if (err) return res.status(500).send("DB error");
//     res.send("✅ Pizza deleted");
//   });
// };

// // ✅ Get pizza by ID
// exports.getPizzaById = (req, res) => {
//   db.query("SELECT * FROM pizzas WHERE id=?", [req.params.id], (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     if (results.length === 0) return res.status(404).send("Pizza not found");
//     res.json(results[0]); // ✅ Send a single pizza object, not array
//   });
// };

// // ==========================
// // 📦 ORDERS
// // ==========================
// exports.listOrders = (req, res) => {
//   db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results);
//   });
// };

// exports.updateOrderStatus = (req, res) => {
//   const { orderId, status } = req.body;
//   if (!orderId || !status) return res.status(400).send("Missing info");

//   db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], err => {
//     if (err) return res.status(500).send("DB error");
//     res.send("✅ Order status updated");
//   });
// };

// // ==========================
// // 👥 USERS
// // ==========================
// exports.listUsers = (req, res) => {
//   db.query(
//     "SELECT id, phone, name, email, blocked FROM users ORDER BY name",
//     (err, results) => {
//       if (err) {
//         console.error("🔥 MySQL error in listUsers:", err);
//         return res.status(500).send("DB error");
//       }
//       res.json(results);
//     }
//   );
// };

// exports.blockCustomer = (req, res) => {
//   const { id } = req.params;
//   const { block } = req.body;
//   db.query("UPDATE users SET blocked=? WHERE id=?", [block ? 1 : 0, id], err => {
//     if (err) return res.status(500).send("DB error");
//     res.send(`✅ User ${block ? 'blocked' : 'unblocked'}`);
//   });
// };

// // ==========================
// // 💬 CONTACTS
// // ==========================
// exports.listContacts = (req, res) => {
//   db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results);
//   });
// };

// // ==========================
// // 🔧 STUBS (Optional)
// // ==========================
// exports.listCategories = (req, res) => res.status(501).send("Not implemented");
// exports.createCategory = (req, res) => res.status(501).send("Not implemented");
// exports.listToppings = (req, res) => res.status(501).send("Not implemented");
// exports.createTopping = (req, res) => res.status(501).send("Not implemented");
// exports.listStock = (req, res) => res.status(501).send("Not implemented");
// exports.updateStock = (req, res) => res.status(501).send("Not implemented");
// exports.listCoupons = (req, res) => res.status(501).send("Not implemented");
// exports.createCoupon = (req, res) => res.status(501).send("Not implemented");
// exports.updateCoupon = (req, res) => res.status(501).send("Not implemented");
// exports.sendNotification = (req, res) => res.status(501).send("Not implemented");




// File: backend/controllers/adminController.js

const mysql = require("mysql2");
const path = require("path");

// ⚙️ Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ==========================
// 🍕 PIZZAS
// ==========================

exports.listPizzas = (req, res) => {
  db.query("SELECT * FROM pizzas ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
};

exports.getPizzaById = (req, res) => {
  db.query("SELECT * FROM pizzas WHERE id=?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send("DB error");
    if (results.length === 0) return res.status(404).send("Pizza not found");
    res.json(results[0]);
  });
};

exports.createPizza = (req, res) => {
  const { name, price, discount, category, stock, description } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  const q = `
    INSERT INTO pizzas (name, price, discount, category, stock, description, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(q, [name, price, discount, category, stock, description, image_url], (err) => {
    if (err) {
      console.error("❌ Error creating pizza:", err);
      return res.status(500).send("DB error");
    }
    res.send("✅ Pizza created");
  });
};

exports.updatePizza = (req, res) => {
  const { id } = req.params;
  const { name, price, discount, category, stock, description } = req.body;

  let image_sql = '';
  let params = [name, price, discount, category, stock, description];

  if (req.file) {
    image_sql = ', image_url = ?';
    params.push(`/uploads/${req.file.filename}`);
  }

  params.push(id);

  const q = `
    UPDATE pizzas
    SET name = ?, price = ?, discount = ?, category = ?, stock = ?, description = ?
    ${image_sql}
    WHERE id = ?
  `;

  db.query(q, params, (err) => {
    if (err) {
      console.error("❌ Error updating pizza:", err);
      return res.status(500).send("DB error during update");
    }
    res.send("✅ Pizza updated");
  });
};

exports.deletePizza = (req, res) => {
  db.query("DELETE FROM pizzas WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send("DB error");
    res.send("✅ Pizza deleted");
  });
};

// ==========================
// 📦 ORDERS
// ==========================

exports.listOrders = (req, res) => {
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
};

exports.updateOrderStatus = (req, res) => {
  const { orderId, status } = req.body;
  if (!orderId || !status) return res.status(400).send("Missing info");

  db.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId], err => {
    if (err) return res.status(500).send("DB error");
    res.send("✅ Order status updated");
  });
};

// ==========================
// 👥 USERS
// ==========================

exports.listUsers = (req, res) => {
  db.query("SELECT id, phone, name, email, blocked FROM users ORDER BY name", (err, results) => {
    if (err) {
      console.error("🔥 MySQL error in listUsers:", err);
      return res.status(500).send("DB error");
    }
    res.json(results);
  });
};

exports.blockCustomer = (req, res) => {
  const { id } = req.params;
  const { block } = req.body;
  db.query("UPDATE users SET blocked=? WHERE id=?", [block ? 1 : 0, id], err => {
    if (err) return res.status(500).send("DB error");
    res.send(`✅ User ${block ? 'blocked' : 'unblocked'}`);
  });
};

// ==========================
// 💬 CONTACTS
// ==========================

exports.listContacts = (req, res) => {
  db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results);
  });
};

// ==========================
// 🔧 STUBS (Not implemented)
// ==========================

exports.listCategories = (req, res) => res.status(501).send("Not implemented");
exports.createCategory = (req, res) => res.status(501).send("Not implemented");
exports.listToppings = (req, res) => res.status(501).send("Not implemented");
exports.createTopping = (req, res) => res.status(501).send("Not implemented");
exports.listStock = (req, res) => res.status(501).send("Not implemented");
exports.updateStock = (req, res) => res.status(501).send("Not implemented");
exports.listCoupons = (req, res) => res.status(501).send("Not implemented");
exports.createCoupon = (req, res) => res.status(501).send("Not implemented");
exports.updateCoupon = (req, res) => res.status(501).send("Not implemented");
exports.sendNotification = (req, res) => res.status(501).send("Not implemented");
