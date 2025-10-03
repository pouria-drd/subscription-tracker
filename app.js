import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Custom Middlewares
app.use(errorMiddleware);
app.use(arcjetMiddleware);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to Subscription Tracker API");
});

// Start server only after DB connects
connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`✅ Subscription Tracker API is running on http://localhost:${PORT}`,
			);
		});
	})
	.catch((err) => {
		console.error("❌ Failed to connect to database", err);
		process.exit(1);
	});

export default app;
