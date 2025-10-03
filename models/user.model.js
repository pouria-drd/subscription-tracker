import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
			unique: true,
			lowercase: true,
			required: [true, "Username is required"],
			minLength: [3, "Username must be at least 3 characters"],
			maxLength: [20, "Username cannot exceed 20 characters"],
			match: [
				/^[a-z][a-z0-9_]{2,19}$/,
				"Username must start with a letter, contain only lowercase letters, numbers, or underscores, and be between 3 to 20 characters",
			],
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			lowercase: true,
			required: [true, "Email is required"],
			minLength: [5, "Email must be at least 5 characters"],
			maxLength: [255, "Email cannot exceed 255 characters"],
			match: [
				/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
				"Please enter a valid email address",
			],
		},
		firstName: {
			type: String,
			trim: true,
			required: false,
			minLength: [2, "First name must be at least 2 characters"],
			maxLength: [50, "First name cannot exceed 50 characters"],
		},
		lastName: {
			type: String,
			trim: true,
			required: false,
			minLength: [2, "Last name must be at least 2 characters"],
			maxLength: [50, "Last name cannot exceed 50 characters"],
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		lastLogin: {
			type: Date,
		},
		status: {
			type: String,
			enum: ["active", "inactive", "banned", "deleted"],
			default: "active",
		},
		password: {
			type: String,
			required: true,
			minLength: [8, "Password must be at least 8 characters"],
		},
	},
	{ timestamps: true }, // adds createdAt and updatedAt automatically
);

const User = mongoose.model("User", userSchema);

export default User;
