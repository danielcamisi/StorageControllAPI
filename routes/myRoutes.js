const express = require("express");
const carsController = require("../controllers/carControllers");
const userController = require("../controllers/userControllers");
const peaceController = require("../controllers/peaceControllers");
const PictureController = require("../controllers/pictureControllers");
const upload = require("../config/multer");
const router = express.Router();

//USER methods
router.put("/users/:id", userController.update);

router.post("/users", userController.login);

router.post("/users", userController.create);

router.get("/users", userController.searchUser);

//CARS methods

router.post("/cars", carsController.create);

router.get("/cars", carsController.getOne);

router.get("/cars/list", carsController.getAll);

router.put("/cars/:id", carsController.update);

//PEACE Methods

router.post("/peace", peaceController.create);

router.get("/peace/:id", peaceController.getOne);     

router.get("/peace", peaceController.getAll);

router.put("/peace/:id", peaceController.update);

//PICTURE Methods

router.post("/picture", upload.single("file"), PictureController.create);

router.get("/picture", PictureController.findAll);

router.delete("/picture/:id", PictureController.remove);

module.exports = router;
