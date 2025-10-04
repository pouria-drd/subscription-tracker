import Subscription from "../models/subscription.model.js";

/**
 * Helper: Ownership check
 */
const isOwner = (subscriptionUserId, requesterId) => {
	if (!subscriptionUserId || !requesterId) return false;
	return subscriptionUserId.toString() === requesterId.toString();
};

/**
 * Get all subscriptions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next function
 */
export const getSubscriptions = async (req, res, next) => {
	try {
		const subscriptions = await Subscription.find();
		res.status(200).json({
			success: true,
			message: "Subscriptions retrieved successfully",
			data: subscriptions,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Get a single subscription
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next function
 */
export const getSubscription = async (req, res, next) => {
	try {
		// Check if the user is the same as the subscription's user
		const subscription = await Subscription.findById(req.params.id);

		if (!subscription) {
			return res
				.status(404)
				.json({ success: false, message: "Subscription not found" });
		}

		if (!isOwner(subscription.user, req.user.id)) {
			return res.status(403).json({
				success: false,
				message: "You are not the owner of this subscription",
			});
		}
		res.status(200).json({
			success: true,
			message: "Subscription retrieved successfully",
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Create a new subscription
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next function
 */
export const createSubscription = async (req, res, next) => {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});
		res.status(201).json({
			success: true,
			message: "Subscription created successfully",
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Update a subscription
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next function
 */
export const updateSubscription = async (req, res, next) => {
	try {
		// Check if the user is the same as the subscription's user
		const subscription = await Subscription.findById(req.params.id);

		if (!subscription) {
			return res
				.status(404)
				.json({ success: false, message: "Subscription not found" });
		}

		if (!isOwner(subscription.user, req.user.id)) {
			return res.status(403).json({
				success: false,
				message: "You are not the owner of this subscription",
			});
		}
		// Update the subscription
		Object.assign(subscription, req.body);
		await subscription.save();

		res.status(200).json({
			success: true,
			message: "Subscription updated successfully",
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Get all subscriptions for a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next function
 */
export const getUserSubscriptions = async (req, res, next) => {
	try {
		// Check if the user is the same as the subscription's user
		if (req.user.id !== req.params.id) {
			const error = new Error(
				"You are not the owner of this subscription",
			);
			error.status = 401;
			throw error;
		}
		// Get all subscriptions for the user
		const subscriptions = await Subscription.find({
			user: req.params.id,
		});
		res.status(200).json({
			success: true,
			message: "Subscriptions retrieved successfully",
			data: subscriptions,
		});
	} catch (error) {
		next(error);
	}
};
