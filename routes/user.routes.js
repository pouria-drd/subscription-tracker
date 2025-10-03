import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import allowRoles from "../middlewares/roles.middleware.js";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("", authorize, allowRoles("admin"), getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
	res.send({
		title: "CREATE new user",
	});
});

userRouter.put("/:id", (req, res) => {
	res.send({
		title: "UPDATE user",
	});
});

userRouter.delete("/:id", (req, res) => {
	res.send({
		title: "DELETE user",
	});
});

export default userRouter;
