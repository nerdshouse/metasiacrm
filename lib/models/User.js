import { Schema, models, model } from "mongoose";
const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["Admin", "SalesPerson", "SalesManager", "PurchaseManager"],
		default: "SalesPerson",
	},
	status: {
		type: Boolean,
	},
});

export default models.User || model("User", schema);
