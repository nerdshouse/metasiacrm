import { Schema, models, model } from "mongoose";
const schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ["BusinessCard", "MRAI", "BMRDelegates", "BNMA", "Ticket"],
		default: "BusinessCard",
	},
});

export default models.Images || model("Images", schema);
