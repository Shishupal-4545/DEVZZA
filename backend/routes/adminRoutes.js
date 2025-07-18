// // File: backend/routes/adminRoutes.js

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const admin = require("../controllers/adminController");

// // 📁 Setup Multer for Image Upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage });

// // ============================
// // 🍕 Pizza Routes
// // ============================

// // Get all pizzas
// router.get("/pizzas", admin.listPizzas);

// // Get a specific pizza by ID
// router.get("/pizzas/:id", admin.getPizzaById);

// // Create a new pizza (with image)
// router.post("/pizzas", upload.single("image"), admin.createPizza);

// // Update pizza (also with image; using POST instead of PUT for FormData)
// router.post("/pizzas/update/:id", upload.single("image"), admin.updatePizza);

// // Delete a pizza
// router.delete("/pizzas/:id", admin.deletePizza);

// // ============================
// // 📦 Order Routes
// // ============================
// router.get("/orders", admin.listOrders);
// router.post("/update-status", admin.updateOrderStatus);

// // ============================
// // 👥 User Routes
// // ============================
// router.get("/users", admin.listUsers);
// router.put("/customers/:id/block", admin.blockCustomer);

// // ============================
// // 💬 Contact Routes
// // ============================
// router.get("/contacts", admin.listContacts);

// // ============================
// // 🔧 Stub (Optional) Routes
// // ============================
// router.get("/categories", admin.listCategories);
// router.post("/categories", admin.createCategory);

// router.get("/toppings", admin.listToppings);
// router.post("/toppings", admin.createTopping);

// router.get("/inventory", admin.listStock);
// router.put("/inventory/:stockId", admin.updateStock);

// router.get("/coupons", admin.listCoupons);
// router.post("/coupons", admin.createCoupon);
// router.put("/coupons/:id", admin.updateCoupon);

// router.post("/notifications", admin.sendNotification);

// module.exports = router;


// File: backend/routes/adminRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const admin = require("../controllers/adminController");

// 📁 Multer config for uploading pizza images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists!
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ============================
// 🍕 Pizza Management Routes
// ============================

// Admin: Get all pizzas
router.get("/pizzas", admin.listPizzas);

// Admin: Get a pizza by ID (used in edit)
router.get("/pizzas/:id", admin.getPizzaById);

// Admin: Create new pizza
router.post("/pizzas", upload.single("image"), admin.createPizza);

// Admin: Update existing pizza
router.post("/pizzas/update/:id", upload.single("image"), admin.updatePizza);

// Admin: Delete pizza
router.delete("/pizzas/:id", admin.deletePizza);

// ============================
// 📦 Order Management
// ============================

router.get("/orders", admin.listOrders); // ✅ GET all orders for admin
router.post("/update-status", admin.updateOrderStatus); // ✅ Update order status

// ============================
// 👥 User Management
// ============================

router.get("/users", admin.listUsers); // ✅ GET all users for admin
router.put("/customers/:id/block", admin.blockCustomer); // ✅ Block/unblock user

// ============================
// 💬 Contact Management
// ============================

router.get("/contacts", admin.listContacts); // ✅ Contact form submissions

// ============================
// 🔧 Optional Stubs (not yet implemented)
// ============================

router.get("/categories", admin.listCategories);
router.post("/categories", admin.createCategory);

router.get("/toppings", admin.listToppings);
router.post("/toppings", admin.createTopping);

router.get("/inventory", admin.listStock);
router.put("/inventory/:stockId", admin.updateStock);

router.get("/coupons", admin.listCoupons);
router.post("/coupons", admin.createCoupon);
router.put("/coupons/:id", admin.updateCoupon);

router.post("/notifications", admin.sendNotification);

module.exports = router;
