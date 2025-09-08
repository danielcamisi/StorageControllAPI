const express = require("express");
const carsController = require("../controllers/carControllers");
const userController = require("../controllers/userControllers");
const peaceController = require("../controllers/peaceControllers");
const PictureController = require("../controllers/pictureControllers");
const verifyToken = require("../middlewares/tokenValid");
const upload = require("../config/multer");
const router = express.Router();

//USER methods

router.put("/users/:id", userController.update);

router.post("/users/login", userController.login);

router.post("/users/register", userController.create);

router.get("/users/:id", verifyToken, userController.searchUser);

//CARS methods

router.post("/cars", verifyToken,upload.single("img"), carsController.create);

router.get("/cars", carsController.getOne);

router.get("/cars/list", carsController.getAll);

router.put("/cars/:id", carsController.update);

router.delete("/cars/:id", carsController.delete)

router.get("/cars/myannounce/:id", carsController.getOneByUserID)

//PEACE Methods

router.post("/peace", verifyToken, peaceController.create);

router.get("/peace/:id", peaceController.getOne);     

router.get("/peace", peaceController.getAll);

router.put("/peace/:id", peaceController.update);

router.delete("/peace/:id", peaceController.delete);

router.get("/peace/myannounce/:id", peaceController.getOneByIdPeace)

//PICTURE Methods

router.post("/picture", upload.single("file"), PictureController.create);

router.get("/picture", PictureController.findAll);

router.delete("/picture/:id", PictureController.remove);

module.exports = router;
