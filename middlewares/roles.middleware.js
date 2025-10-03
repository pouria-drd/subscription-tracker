/**
 * Middleware to check if the user has the required role to access the requested route
 * @param {*} ...roles - Required roles
 * @returns {*} - Express response object
 */
const allowRoles = (...roles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
				error: "No user attached to request",
			});
		}

		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				success: false,
				message: "Forbidden",
				error: "You do not have permission to access this resource",
			});
		}

		next();
	};
};

export default allowRoles;
