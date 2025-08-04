const express = require("express");
const controller = require("../controllers/userControllers")
const router = express.Router();
const { userSchema } = require("../validations/validations");

router.post("/", controller.create);

router.delete("/:id", controller.delete);

router.search("/:id", validate(userSchema), controller.search);

router.put("/:id", validate(userSchema), controller.update);

router.delete("/", controller.deleteByname)

module.exports = router;