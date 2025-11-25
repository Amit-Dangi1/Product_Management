import express from "express";
import { create, login } from "../controller/user_controller.js";


let router   = express.Router();

router.post("/signup",create);
router.post("/login",login);

export default router;