import aj from "../config/arcjet.js";

/**
 * Middleware to protect the app from common attacks
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const arcjetMiddleware = async (req, res, next) => {
	try {
		const decision = await aj.protect(req, {
			requested: 1,
		});

		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				return res
					.status(429)
					.json({ success: false, message: "Too many requests" });
			}
			if (decision.reason.isBot()) {
				return res.status(403).json({
					success: false,
					message: "Forbidden",
				});
			}
			return res
				.status(403)
				.json({ success: false, message: "Forbidden" });
		}

		next();
	} catch (error) {
		console.error("Arcjet middleware error", error);
		next(error);
	}
};

export default arcjetMiddleware;
