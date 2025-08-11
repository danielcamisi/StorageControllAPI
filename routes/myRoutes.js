const express = require("express");
const carsController = require("../controllers/carControllers");
const userController = require("../controllers/userControllers");
const router = express.Router();

//USER methods
router.post("/users", userController.login);

router.post("/users", userController.create);

router.get("/users", userController.searchUser);

//CARS methods

router.post("/cars", carsController.create);

router.get("/cars", carsController.getOne);

router.get("/cars/list", carsController.getAll);

router.put("/cars/:id", carsController.update);

//PEACE Methods




module.exports = router;
