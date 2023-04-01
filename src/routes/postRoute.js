const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { body } = require("express-validator");
const validatorError = require("../utils/funcs");

router.get("/", postController.post_list_all);
router.get("/:id", postController.post_list_by_id);
router.get("/user/:id", postController.post_list_by_user);
router.post(
  "/",
  body("title").notEmpty(),
  body("body").notEmpty(),
  validatorError.validationError,
  postController.post_create
);
router.put("/:id", postController.post_update);
router.delete("/:id", postController.post_delete);

module.exports = router;
