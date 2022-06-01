import { Schema, models, model, Types } from "mongoose";

function validator(v) {
	return v.length > 0;
}

const schema = new Schema({
	companyName: {
		type: String,
		// required: true,
	},
	IECNumber: {
		type: String,
		// required: true,
	},
	indianPort: {
		type: [String],
		// required: true,
		minItem: 1,
	},
	address: {
		type: [
			{
				AddressLine: {
					type: String,
					// required: true,
				},
				City: {
					type: String,
					// required: true,
				},
				State: {
					type: String,
					// required: true,
				},
				Country: {
					type: String,
					// required: true,
				},
			},
		],
	},
	contactPersons: {
		type: [
			{
				contactPersonName: {
					type: String,
					// required: true,
				},
				contactPersonDesignation: {
					type: String,
					// required: true,
				},
				contactPersonPhoneNumber: {
					type: [String],
					// required: true,
				},
				contactPersonEmail: {
					type: [String],
					// required: true,
				},
			},
		],
	},
	countryOfOrigin: {
		type: [String],
		// required: true,
	},
	suppliers: {
		type: [String],
	},
	buyers: {
		type: [String],
	},
	owners: {
		type: [
			{
				ownerName: {
					type: String,
					// required: true,
				},
				ownerPhoneNumber: {
					type: [String],
					// required: true,
				},
				ownerEmail: {
					type: String,
					// required: true,
				},
			},
		],
	},
	products: {
		type: [String],
		// required: true,
	},
	MRAI: {
		type: [
			{
				MRAIName: {
					type: String,
				},
				MRAIPhoneNumber: {
					type: String,
				},
				MRAIEmail: {
					type: String,
				},
				MRAIsImages: {
					type: [Types.ObjectId],
					ref: "Images",
				},
			},
		],
	},
	BMRDelegates: {
		type: [
			{
				BMRDelegatesName: {
					type: String,
				},
				BMRDelegatesPhoneNumber: {
					type: String,
				},
				BMRDelegatesEmail: {
					type: String,
				},
				BMRDelegatesImages: {
					type: [Types.ObjectId],
					ref: "Images",
				},
			},
		],
	},
	BNMA: {
		type: [
			{
				BNMAName: {
					type: String,
				},
				BNMAPhoneNumber: {
					type: String,
				},
				BNMAEmail: {
					type: String,
				},
				BNMAsImages: {
					type: [Types.ObjectId],
					ref: "Images",
				},
			},
		],
	},
	noOfContainers: {
		type: Number,
		// required: true,
	},
	avgContainers: {
		type: Number,
		// required: true,
	},
	API: {
		type: Boolean,
	},
	companyType: {
		type: String,
		enum: ["SUPPLIER", "BUYER", "BOTH"],
		default: "BOTH",
	},
	salesPerson: [{ type: Types.ObjectId, ref: "User" }],
	bussinessCard: {
		type: Boolean,
	},
	bussinessCardImages: {
		type: [Types.ObjectId],
		ref: "Images",
	},
	metAsiaBuyer: {
		type: Boolean,
	},
	metAsiaSupplier: {
		type: Boolean,
	},
	comments: {
		type: String,
	},
	status: {
		type: Boolean,
	},
});

export default models.Company || model("Company", schema);
