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
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		// check if user already exists (by username OR email)
		const existingUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser) {
			const error = new Error("User already exists");
			error.status = 409;
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

export const signIn = (req, res, next) => {};

export const signOut = (req, res, next) => {};
