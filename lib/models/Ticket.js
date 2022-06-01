import { Schema, models, model, Types } from "mongoose";
const schema = new Schema({
	ticketNumber: {
		type: Number,
		required: true,
	},
	companyId: {
		type: Types.ObjectId,
		ref: "Company",
		required: true,
	},
	port: {
		type: String,
	},
	productName: {
		type: String,
		required: true,
	},
	rate: {
		type: Number,
		required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
	quantityUnit: {
		type: String,
		required: true,
	},
	origin: {
		type: String,
		required: true,
	},
	comment: {
		type: String,
	},
	containerSize: {
		type: [Number],
		enum: [20, 40],
		default: 20,
	},
	containerNumber: {
		type: String,
	},
	packing: {
		type: [String],
	},
	ticketType: {
		type: String,
		enum: ["sales", "purchase"],
		default: "sales",
	},
	genratedBy: {
		type: Types.ObjectId,
		ref: "User",
		required: true,
	},
	genratedOn: {
		type: Date,
		default: () => new Date(),
	},
	productImages: {
		type: [Types.ObjectId],
		ref: "Images",
	},
	isDeleted: {
		type: Boolean,
	},
	status: {
		type: Boolean,
	},
});

export default models.Ticket || model("Ticket", schema);
