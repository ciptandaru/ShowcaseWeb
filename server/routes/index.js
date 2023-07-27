const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");
const {authentication} = require("../middleware/authentication");
const errorHandling = require("../middleware/errorHandling");
const CustomerController = require("../controllers/customerController");

router.post("/admin/register", authentication, AdminController.register);
router.post("/admin/login", AdminController.login);
router.get("/admin/products", authentication, AdminController.fetchProduct);
router.get("/admin/images/:id", authentication, AdminController.fetchImage);
router.post("/admin/products", authentication, AdminController.addProduct);
router.delete(
  "/admin/products/:id",
  authentication,
  AdminController.deleteProduct
);
router.get("/admin/categories", authentication, AdminController.fetchCategory);
router.get(
  "/admin/categories/:id",
  authentication,
  AdminController.detailCategory
);
router.post(
  "/admin/categories",
  authentication,
  AdminController.createCategory
);
router.put(
  "/admin/categories/:id",
  authentication,
  AdminController.putCategory
);
router.delete(
  "/admin/categories/:id",
  authentication,
  AdminController.deleteCategory
);
router.get("/admin/:slug", authentication, AdminController.detailProduct);
router.put("/admin/:slug", authentication, AdminController.editProduct);

router.post("/register", CustomerController.cusRegister);
router.post("/login", CustomerController.cusLogin);
router.get("/products", CustomerController.fetchProductCus);
router.get("/products/:slug", CustomerController.detailProductCus);

router.use(errorHandling);

module.exports = router;
