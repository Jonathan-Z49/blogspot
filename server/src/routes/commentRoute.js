const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { body } = require("express-validator");
const validatorError = require("../utils/funcs");

router.get("/posts/:id", commentController.comment_list_by_blog);
router.post(
  "/posts/:id",
  body("body").notEmpty(),
  validatorError.validationError,
  commentController.comment_create
);
router.put(
  "/:id",
  body("body").notEmpty(),
  validatorError.validationError,
  commentController.comment_update
);
router.delete("/:id", commentController.comment_delete);

module.exports = router;
