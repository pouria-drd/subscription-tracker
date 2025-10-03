import User from "../models/user.model.js";

/**
 * Get all users
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		// const users = await User.find().select("-password");
		res.status(200).json({
			success: true,
			message: "Users retrieved successfully",
			data: users,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Get a single user
 * @param {Object} req.params
 * @param {Object} res
 * @param {Object} next
 */
export const getUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId).select("-password");

		if (!user) {
			const error = new Error("User not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: "User retrieved successfully",
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
