import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
	getSubscription,
	getSubscriptions,
	createSubscription,
	updateSubscription,
	getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", (req, res) => {
	res.send({
		title: "DELETE subscription",
	});
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
	res.send({
		title: "CANCEL subscription",
	});
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
	res.send({
		title: "GET upcoming renewals",
	});
});

export default subscriptionRouter;
