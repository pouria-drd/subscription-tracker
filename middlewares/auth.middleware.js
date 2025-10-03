import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";

/**
 * Middleware to check if the user is authenticated and authorized to access the requested route
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next middleware function
 * @returns {*} - Express response object
 */
const authorize = async (req, res, next) => {
	try {
		let token;

		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
				error: "No token provided",
			});
		}

		const decoded = jwt.verify(token, JWT_SECRET);

		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
				error: "Invalid token",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: "Unauthorized",
			error: error.message,
		});
	}
};

export default authorize;
