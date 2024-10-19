import { Router } from "express";
import {createUser, messageUser, fetchMessages} from "../controllers/user.controllers.js";
const router = Router();


router.route("/test").get((req, res) => {
    res.send("Hello World!");
});

router.route("/user").post(createUser);
router.route("/user/:link").post(messageUser);
router.route("/user/:link/messages").get(fetchMessages);

export default router;  