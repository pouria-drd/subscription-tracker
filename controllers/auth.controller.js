import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

/**
 * Sign up a new user
 * @param {Object} req.body
 * @param {Object} res
 * @param {Object} next
 */
export const signUp = async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// Get data from request
		const { username, email, password } = req.body;

		// Check if all fields are present
		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// check if user already exists (by username OR email)
		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser) {
			const error = new Error("User already exists");
			error.statusCode = 409;
			throw error;
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const newUsers = await User.create(
			[
				{
					username,
					email,
					password: hashedPassword,
				},
			],
			{ session },
		);

		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		await session.commitTransaction();
		session.endSession();

		res.status(201).json({
			success: true,
			message: "User created successfully",
			data: {
				token,
				user: newUsers[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

/**
 * Sign in a user
 * @param {Object} req.body
 * @param {Object} res
 * @param {Object} next
 */
export const signIn = async (req, res, next) => {
	try {
		// Get login credentials (could be username or email)
		const { identifier, password } = req.body;

		// Validate inputs
		if (!identifier || !password) {
			return res
				.status(400)
				.json({ message: "Username/Email and password are required" });
		}

		// Find user by username OR email
		const user = await User.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid username/email or password",
			});
		}

		// Compare password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid username/email or password",
			});
		}

		// Update last login
		user.lastLogin = new Date();
		await user.save();

		// Generate token
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});

		// Return response
		res.status(200).json({
			success: true,
			message: "Signed in successfully",
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Sign out a user
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const signOut = (req, res, next) => {};
