import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  updateContact,
} from "../controllers/valueController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);
router.route("/data").post(createContact);
router
  .route("/data/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;
