const errorMiddleware = (err, req, res, next) => {
	console.error("Error Middleware:", err);

	// Use the original error status/message if available
	const statusCode = err.statusCode || err.status || 500;
	const message = err.message || "Something went wrong";

	// Handle specific Mongoose errors
	if (err.name === "CastError") {
		return res.status(404).json({
			success: false,
			message: "Resource not found",
		});
	}

	if (err.code === 11000) {
		return res.status(400).json({
			success: false,
			message: "Duplicate field value entered",
		});
	}

	if (err.name === "ValidationError") {
		const messages = Object.values(err.errors).map((val) => val.message);
		return res.status(400).json({
			success: false,
			message: messages.join(", "),
		});
	}

	// Default response
	res.status(statusCode).json({
		success: false,
		message,
	});
};

export default errorMiddleware;
