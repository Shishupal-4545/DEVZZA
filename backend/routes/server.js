
// // 📁 File: backend/routes/server.js

// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve uploaded images publicly
// // This allows accessing uploaded pizza images via: http://localhost:3000/uploads/filename.jpg
// app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// // ✅ Connect MySQL
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// db.connect(err => {
//   if (err) console.error("❌ Database connection error:", err);
//   else console.log("✅ MySQL connected");
// });

// // 🔄 ADMIN ROUTES (Pizzas, Orders, Users, etc.)
// const adminRoutes = require("./adminRoutes");
// app.use("/api/admin", adminRoutes);

// // ====== 🍕 PUBLIC PIZZA MENU ======
// app.get("/api/pizzas", (req, res) => {
//   const q = "SELECT * FROM pizzas WHERE stock > 0 ORDER BY id DESC";
//   db.query(q, (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results);
//   });
// });

// // ====== 🛒 ORDER ROUTES ======

// // ✅ Place Order
// app.post("/api/order", (req, res) => {
//   const { phone, location, cart } = req.body;
//   if (!phone || !location || !cart || cart.length === 0)
//     return res.status(400).send("Missing order info");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     "INSERT INTO orders (phone, location, cart, status) VALUES (?, ?, ?, 'Pending')",
//     [normalizedPhone, location, JSON.stringify(cart)],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Order placed successfully!");
//     }
//   );
// });

// // ✅ Get Order Status
// app.get("/api/order/status", (req, res) => {
//   const phone = req.query.phone?.slice(-10);
//   if (!phone) return res.status(400).send("Phone is required");

//   db.query(
//     "SELECT * FROM orders WHERE phone = ? ORDER BY created_at DESC",
//     [phone],
//     (err, results) => {
//       if (err) return res.status(500).send("DB error");
//       res.json(results);
//     }
//   );
// });

// // ✅ Update Location
// app.post("/api/order/update-location", (req, res) => {
//   const { phone, location } = req.body;
//   if (!phone || !location) return res.status(400).send("Missing phone or location");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     "UPDATE orders SET location = ? WHERE phone = ? AND status = 'Pending'",
//     [location, normalizedPhone],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Location updated successfully");
//     }
//   );
// });

// // ✅ Cancel Order
// app.post("/api/order/cancel", (req, res) => {
//   const { orderId, phone } = req.body;
//   if (!orderId || !phone) return res.status(400).send("Missing orderId or phone");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     `UPDATE orders
//      SET status = 'Cancelled'
//      WHERE id = ? AND phone = ?
//        AND (status = 'Pending' OR status = 'Preparing')`,
//     [orderId, normalizedPhone],
//     (err, result) => {
//       if (err) return res.status(500).send("DB error");
//       if (result.affectedRows === 0)
//         return res.status(400).send("❌ Cannot cancel this order.");
//       res.send("✅ Order cancelled.");
//     }
//   );
// });

// // ====== 💬 CONTACT ROUTE ======
// app.post("/api/contact", (req, res) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) return res.status(400).send("Missing contact info");

//   db.query(
//     "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
//     [name, email, message],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Message received!");
//     }
//   );
// });

// // ====== 👤 USER PROFILE ======

// // ✅ Initialize User
// app.post("/api/user/init", (req, res) => {
//   const { phone } = req.body;
//   if (!phone) return res.status(400).send("Phone required");

//   db.query(
//     "INSERT IGNORE INTO users (phone) VALUES (?)",
//     [phone.slice(-10)],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ User initialized");
//     }
//   );
// });

// // ✅ Get Profile
// app.get("/api/user/profile", (req, res) => {
//   const phone = req.query.phone?.slice(-10);
//   if (!phone) return res.status(400).send("Phone is required");

//   db.query("SELECT name, email FROM users WHERE phone = ?", [phone], (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results[0] || {});
//   });
// });

// // ✅ Update Profile
// app.post("/api/user/update-profile", (req, res) => {
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) return res.status(400).send("Missing fields");

//   db.query(
//     `INSERT INTO users (phone, name, email)
//      VALUES (?, ?, ?)
//      ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email)`,
//     [phone.slice(-10), name, email],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Profile updated!");
//     }
//   );
// });

// // ====== STATIC FILES (Frontend) ======
// app.use(express.static(path.join(__dirname, "../../frontend")));
// app.use(express.static(path.join(__dirname, "../../public")));

// // ====== ROOT TEST ======
// app.get("/", (req, res) => res.send("Devzza Server Running ✅"));

// // ====== START SERVER ======
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });





// //with sms

// // 📁 backend/routes/server.js

// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// const path = require("path");
// const twilio = require("twilio");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Serve uploaded images publicly
// app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// // ✅ Static frontend and public files
// app.use(express.static(path.join(__dirname, "../../frontend")));
// app.use(express.static(path.join(__dirname, "../../public")));

// // ✅ MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// db.connect(err => {
//   if (err) console.error("❌ Database connection error:", err);
//   else console.log("✅ MySQL connected");
// });

// // ✅ Twilio Client
// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // ✅ Send SMS Function
// async function notifyAdmins(message) {
//   try {
//     const [rows] = await db.promise().query('SELECT phone FROM admin_phones');
//     for (const admin of rows) {
//       await twilioClient.messages.create({
//         body: message,
//         from: process.env.TWILIO_PHONE,
//         to: admin.phone,
//       });
//       console.log(`✅ SMS sent to admin ${admin.phone}`);
//     }
//   } catch (err) {
//     console.error("❌ SMS Error:", err.message);
//   }
// }

// // ✅ PIZZA CONTROLLER AND UPLOAD MIDDLEWARE
// const controller = require("../controllers/adminController");
// const upload = require("../middlewares/upload"); // Ensure this exists and uses multer

// // ✅ MOUNT adminRoutes.js
// const adminRoutes = require("./adminRoutes");
// app.use("/api/admin", adminRoutes);

// // ✅ USER SIDE: PUBLIC MENU ROUTE
// app.get("/api/pizzas", controller.listPizzas);
// app.get("/api/menu", controller.listPizzas);

// // ====== 📦 ORDER ROUTES ======
// app.post("/api/order", async (req, res) => {
//   const { phone, location, cart } = req.body;
//   if (!phone || !location || !cart || cart.length === 0)
//     return res.status(400).send("Missing order info");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     "INSERT INTO orders (phone, location, cart, status) VALUES (?, ?, ?, 'Pending')",
//     [normalizedPhone, location, JSON.stringify(cart)],
//     async (err, result) => {
//       if (err) return res.status(500).send("DB error");

//       // ✅ Notify admins
//       const message = `🍕 New order placed by ${normalizedPhone}`;
//       await notifyAdmins(message);

//       res.send("✅ Order placed successfully!");
//     }
//   );
// });

// app.get("/api/order/status", (req, res) => {
//   const phone = req.query.phone?.slice(-10);
//   if (!phone) return res.status(400).send("Phone is required");

//   db.query(
//     "SELECT * FROM orders WHERE phone = ? ORDER BY created_at DESC",
//     [phone],
//     (err, results) => {
//       if (err) return res.status(500).send("DB error");
//       res.json(results);
//     }
//   );
// });

// app.post("/api/order/update-location", (req, res) => {
//   const { phone, location } = req.body;
//   if (!phone || !location) return res.status(400).send("Missing phone or location");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     "UPDATE orders SET location = ? WHERE phone = ? AND status = 'Pending'",
//     [location, normalizedPhone],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Location updated successfully");
//     }
//   );
// });

// app.post("/api/order/cancel", (req, res) => {
//   const { orderId, phone } = req.body;
//   if (!orderId || !phone) return res.status(400).send("Missing orderId or phone");

//   const normalizedPhone = phone.slice(-10);
//   db.query(
//     `UPDATE orders
//      SET status = 'Cancelled'
//      WHERE id = ? AND phone = ?
//        AND (status = 'Pending' OR status = 'Preparing')`,
//     [orderId, normalizedPhone],
//     async (err, result) => {
//       if (err) return res.status(500).send("DB error");
//       if (result.affectedRows === 0)
//         return res.status(400).send("❌ Cannot cancel this order.");

//       // ✅ Notify admins
//       const message = `❌ Order #${orderId} cancelled by ${normalizedPhone}`;
//       await notifyAdmins(message);

//       res.send("✅ Order cancelled.");
//     }
//   );
// });

// // ====== 💬 CONTACT ROUTE ======
// app.post("/api/contact", (req, res) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) return res.status(400).send("Missing contact info");

//   db.query(
//     "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
//     [name, email, message],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Message received!");
//     }
//   );
// });

// // ====== 👤 USER PROFILE ROUTES ======
// app.post("/api/user/init", (req, res) => {
//   const { phone } = req.body;
//   if (!phone) return res.status(400).send("Phone required");

//   db.query(
//     "INSERT IGNORE INTO users (phone) VALUES (?)",
//     [phone.slice(-10)],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ User initialized");
//     }
//   );
// });

// app.get("/api/user/profile", (req, res) => {
//   const phone = req.query.phone?.slice(-10);
//   if (!phone) return res.status(400).send("Phone is required");

//   db.query("SELECT name, email FROM users WHERE phone = ?", [phone], (err, results) => {
//     if (err) return res.status(500).send("DB error");
//     res.json(results[0] || {});
//   });
// });

// app.post("/api/user/update-profile", (req, res) => {
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) return res.status(400).send("Missing fields");

//   db.query(
//     `INSERT INTO users (phone, name, email)
//      VALUES (?, ?, ?)
//      ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email)`,
//     [phone.slice(-10), name, email],
//     err => {
//       if (err) return res.status(500).send("DB error");
//       res.send("✅ Profile updated!");
//     }
//   );
// });

// // ====== ROOT TEST ======
// app.get("/", (req, res) => res.send("Devzza Server Running ✅"));

// // ====== START SERVER ======
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { sendSMS, getOrderPlacedMessage, getOrderCancelledMessage } = require("../services/smsService");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images publicly
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads')));

// ✅ Static frontend and public files
app.use(express.static(path.join(__dirname, "../../frontend")));
app.use(express.static(path.join(__dirname, "../../public")));

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(err => {
  if (err) console.error("❌ Database connection error:", err);
  else console.log("✅ MySQL connected");
});

// ✅ Admin Notifier
async function notifyAdmins(message) {
  try {
    const [rows] = await db.promise().query('SELECT phone FROM admin_phones');
    for (const admin of rows) {
      await sendSMS(admin.phone, message);
    }
  } catch (err) {
    console.error("❌ SMS Error:", err.message);
  }
}

// ✅ PIZZA CONTROLLER AND UPLOAD MIDDLEWARE
const controller = require("../controllers/adminController");
const upload = require("../middlewares/upload"); // Ensure this exists and uses multer

// ✅ MOUNT adminRoutes.js
const adminRoutes = require("./adminRoutes");
app.use("/api/admin", adminRoutes);

// ✅ USER SIDE: PUBLIC MENU ROUTE
app.get("/api/pizzas", controller.listPizzas);
app.get("/api/menu", controller.listPizzas);

// ====== 📦 ORDER ROUTES ======
app.post("/api/order", async (req, res) => {
  const { phone, location, cart } = req.body;
  if (!phone || !location || !cart || cart.length === 0)
    return res.status(400).send("Missing order info");

  const normalizedPhone = phone.slice(-10);
  db.query(
    "INSERT INTO orders (phone, location, cart, status) VALUES (?, ?, ?, 'Pending')",
    [normalizedPhone, location, JSON.stringify(cart)],
    async (err, result) => {
      if (err) return res.status(500).send("DB error");

      // ✅ Notify admins
      const message = getOrderPlacedMessage(normalizedPhone, location);
      await notifyAdmins(message);

      res.send("✅ Order placed successfully!");
    }
  );
});

app.get("/api/order/status", (req, res) => {
  const phone = req.query.phone?.slice(-10);
  if (!phone) return res.status(400).send("Phone is required");

  db.query(
    "SELECT * FROM orders WHERE phone = ? ORDER BY created_at DESC",
    [phone],
    (err, results) => {
      if (err) return res.status(500).send("DB error");
      res.json(results);
    }
  );
});

app.post("/api/order/update-location", (req, res) => {
  const { phone, location } = req.body;
  if (!phone || !location) return res.status(400).send("Missing phone or location");

  const normalizedPhone = phone.slice(-10);
  db.query(
    "UPDATE orders SET location = ? WHERE phone = ? AND status = 'Pending'",
    [location, normalizedPhone],
    err => {
      if (err) return res.status(500).send("DB error");
      res.send("✅ Location updated successfully");
    }
  );
});

app.post("/api/order/cancel", (req, res) => {
  const { orderId, phone } = req.body;
  if (!orderId || !phone) return res.status(400).send("Missing orderId or phone");

  const normalizedPhone = phone.slice(-10);
  db.query(
    `UPDATE orders
     SET status = 'Cancelled'
     WHERE id = ? AND phone = ?
       AND (status = 'Pending' OR status = 'Preparing')`,
    [orderId, normalizedPhone],
    async (err, result) => {
      if (err) return res.status(500).send("DB error");
      if (result.affectedRows === 0)
        return res.status(400).send("❌ Cannot cancel this order.");

      // ✅ Notify admins
      const message = getOrderCancelledMessage(orderId, normalizedPhone);
      await notifyAdmins(message);

      res.send("✅ Order cancelled.");
    }
  );
});

// ====== 💬 CONTACT ROUTE ======
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).send("Missing contact info");

  db.query(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    err => {
      if (err) return res.status(500).send("DB error");
      res.send("✅ Message received!");
    }
  );
});

// ====== 👤 USER PROFILE ROUTES ======
app.post("/api/user/init", (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).send("Phone required");

  db.query(
    "INSERT IGNORE INTO users (phone) VALUES (?)",
    [phone.slice(-10)],
    err => {
      if (err) return res.status(500).send("DB error");
      res.send("✅ User initialized");
    }
  );
});

app.get("/api/user/profile", (req, res) => {
  const phone = req.query.phone?.slice(-10);
  if (!phone) return res.status(400).send("Phone is required");

  db.query("SELECT name, email FROM users WHERE phone = ?", [phone], (err, results) => {
    if (err) return res.status(500).send("DB error");
    res.json(results[0] || {});
  });
});

app.post("/api/user/update-profile", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) return res.status(400).send("Missing fields");

  db.query(
    `INSERT INTO users (phone, name, email)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email)`,
    [phone.slice(-10), name, email],
    err => {
      if (err) return res.status(500).send("DB error");
      res.send("✅ Profile updated!");
    }
  );
});

// ====== ROOT TEST ======
app.get("/", (req, res) => res.send("Devzza Server Running ✅"));

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
