import express from "express";
import { PORT } from "./config/env.js";
import coolieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";

const app = express();
// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(express.json()); // JSON middleware for parsing request body
app.use(express.urlencoded({ extended: false })); // URL encoded middleware for parsing request body
app.use(coolieParser()); // Cookie parser middleware for parsing cookies in request
app.use(errorMiddleware); // Error middleware for handling errors

app.get("/", (req, res) => {
	res.send("Welcome to Subscription Tracker API");
});

app.listen(PORT, async () => {
	console.log(
		`Subscription Tracker API is running on http://localhost:${PORT}`,
	);
	await connectToDatabase();
});

export default app;
