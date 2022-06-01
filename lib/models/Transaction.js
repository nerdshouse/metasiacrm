import { Schema, models, model, Types } from "mongoose";
const schema = new Schema({
	ticketId: {
		type: Types.ObjectId,
		ref: "Ticket",
		required: true,
	},
	transactionType: {
		type: String,
		enum: ["sales", "purchase"],
		default: "sales",
	},
	productName: {
		type: String,
		required: true,
	},
	rate: {
		type: Number,
		// required: true,
	},
	quantity: {
		type: Number,
		// required: true,
	},
	quantityUnit: {
		type: String,
		// required: true, //like metric ton, kg , etc.
	},
	origin: {
		type: String,
		// required: true,
	},
	transactionWith: {
		type: Types.ObjectId,
		ref: "Company",
		// required: true,
	},
	salesPerson: {
		type: Types.ObjectId,
		ref: "User",
		// required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	metAsiaDeal: {
		type: Boolean,
	},
	genratedOn: {
		type: Date,
		default: () => new Date(),
	},
});

export default models.Transaction || model("Transaction", schema);
