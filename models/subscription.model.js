import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Subscription name is required"],
			minLength: [2, "Name must be at least 2 characters"],
			maxLength: [100, "Name cannot exceed 100 characters"],
		},
		price: {
			type: Number,
			required: [true, "Subscription price is required"],
			min: [0, "Price must be greater than 0"],
		},
		currency: {
			type: String,
			enum: ["USD", "EUR", "GBP"],
			default: "USD",
		},
		frequency: {
			type: String,
			enum: ["daily", "weekly", "monthly", "yearly"],
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: [
				"sports",
				"music",
				"gaming",
				"software",
				"lifestyle",
				"food",
				"travel",
				"education",
				"business",
				"health",
				"technology",
				"personal",
				"finance",
				"career",
				"other",
				"entertainment",
			],
		},
		paymentMethod: {
			type: String,
			trim: true,
			required: [true, "Payment method is required"],
		},
		status: {
			type: String,
			enum: ["active", "cancelled", "expired"],
			default: "active",
		},
		startDate: {
			type: Date,
			required: [true, "Start date is required"],
			validate: {
				validator: (value) => {
					return value <= new Date();
				},
				message: "Start date must be in the past",
			},
		},
		renewalDate: {
			type: Date,
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: "Renewal date must be after the start date",
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
			index: true,
		},
	},
	{ timestamps: true },
);

// Auto-calculate the renewal date if missing
subscriptionSchema.pre("save", function (next) {
	if (!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(
			this.renewalDate.getDate() + renewalPeriods[this.frequency],
		);
	}
	// Auto-update the status if renewal has passed
	if (this.renewalDate < new Date()) {
		this.status = "expired";
	}
	next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
