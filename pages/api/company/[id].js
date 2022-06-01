import Company from "../../../lib/models/Company";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isEmptyArray, isEmptyNumber, isPhoneNumber, isEmail, isNotEmail } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "GET":
			return Company.findById(req.query.id)
				.populate("salesPerson")
				.populate("bussinessCardImages")
				.populate("MRAI.MRAIsImages")
				.populate("BMRDelegates.BMRDelegatesImages")
				.populate("BNMA.BNMAsImages")
				.then((company) => res.status(200).json({ company }))
				.catch((error) =>
					res.status(400).json({
						message:
							"Company not found or something else went wrong check the error object for more information",
						error,
					})
				);

		case "PATCH":
			const company = req.body;

			// if (isEmpty(company.companyName))
			// 	return res.status(400).json({ message: "Please, Provide A Company Name" });

			// if (isEmpty(company.IECNumber)) return res.status(400).json({ message: "Please, Provide An IEC Number" });

			// if (isEmptyNumber(company.IECNumber))
			// 	return res.status(400).json({ message: "Please, Provide A Digit For IEC Number" });

			// if (isEmpty(company.noOfContainers))
			// 	return res.status(400).json({ message: "Please, Provide A No Of Container" });

			// if (isEmpty(company.avgContainers))
			// 	return res.status(400).json({ message: "Please, Provide An Average Container" });

			// if (isEmpty(company.companyType))
			// 	return res.status(400).json({ message: "Please, Provide A Company Type" });

			// if (isEmptyArray(company.address)) return res.status(400).json({ message: "Please, Provide An Address" });
			// else
			// 	company.address.forEach((add) => {
			// 		if (isEmpty(add.AddressLine))
			// 			return res.status(400).json({ message: "Please, Provide An Address Line" });
			// 		if (isEmpty(add.City)) return res.status(400).json({ message: "Please, Provide A City" });
			// 		if (isEmpty(add.State)) return res.status(400).json({ message: "Please, Provide A State" });
			// 		if (isEmpty(add.Country)) return res.status(400).json({ message: "Please, Provide A Country" });
			// 	});

			// if (isEmptyArray(company.contactPersons))
			// 	return res.status(400).json({ message: "Please, Provide A Contact Persons" });
			// else
			// 	company.contactPersons.forEach((contact) => {
			// 		if (isEmpty(contact.contactPersonName))
			// 			return res.status(400).json({ message: "Please, Provide A Contact Person Name" });

			// 		if (isEmpty(contact.contactPersonPhoneNumber[0]))
			// 			return res.status(400).json({ message: "Please, Provide A Contact Person Phone Number" });
			// 		if (isEmptyNumber(contact.contactPersonPhoneNumber[0]))
			// 			return res
			// 				.status(400)
			// 				.json({ message: "Please, Provide Only Digit For Contact Person Phone Number" });

			// 		if (isEmpty(contact.contactPersonEmail[0]))
			// 			return res.status(400).json({ message: "Please, Provide A Contact Person Email" });
			// 		if (isNotEmail(contact.contactPersonEmail[0]))
			// 			return res.status(400).json({ message: "Please, Provide Valid Contact Person Email" });
			// 	});

			// if (isEmptyArray(company.owners))
			// 	return res.status(400).json({ message: "Please, Provide An Owner Information" });
			// else
			// 	company.owners.forEach((owner) => {
			// 		if (isEmpty(owner.ownerName))
			// 			return res.status(400).json({ message: "Please, Provide An Owner Name" });

			// 		if (isEmpty(owner.ownerEmail))
			// 			return res.status(400).json({ message: "Please, Provide An Owner Email" });
			// 		if (isNotEmail(owner.ownerEmail))
			// 			return res.status(400).json({ message: "Please, Provide Valid Owner Email" });

			// 		if (isEmpty(owner.ownerPhoneNumber[0]))
			// 			return res.status(400).json({ message: "Please, Provide An Owner Phone Number" });
			// 		if (isEmptyNumber(owner.ownerPhoneNumber[0]))
			// 			return res.status(400).json({ message: "Please, Provide Only Digit For Owner Phone Number" });
			// 	});

			// if (isEmptyArray(company.countryOfOrigin))
			// 	return res.status(400).json({ message: "Please, Provide A Country Of Origin" });

			// if (isEmptyArray(company.indianPort)) return res.status(400).json({ message: "Please, Provide A Ports" });

			// if (isEmptyArray(company.products)) return res.status(400).json({ message: "Please, Provide A Products" });

			// if (!isEmpty(company.MRAI)) {
			// 	company.MRAI.forEach((obj) => {
			// 		if (!isEmpty(obj.MRAIPhoneNumber)) {
			// 			if (isEmptyNumber(obj.MRAIPhoneNumber))
			// 				return res
			// 					.status(400)
			// 					.json({ message: "Please, Provide Only Digit For MRAI Phone Number" });
			// 		}
			// 		if (!isEmpty(obj.MRAIEmail)) {
			// 			if (isNotEmail(obj.MRAIEmail))
			// 				return res.status(400).json({ message: "Please, Provide Valid MRAI Email" });
			// 		}
			// 	});
			// }

			// if (!isEmpty(company.BMRDelegates)) {
			// 	company.BMRDelegates.forEach((obj) => {
			// 		if (!isEmpty(obj.BMRDelegatesPhoneNumber)) {
			// 			if (isEmptyNumber(obj.BMRDelegatesPhoneNumber))
			// 				return res
			// 					.status(400)
			// 					.json({ message: "Please, Provide Only Digit For BMR Delegates Phone Number" });
			// 		}
			// 		if (!isEmpty(obj.BMRDelegatesEmail)) {
			// 			if (isNotEmail(obj.BMRDelegatesEmail))
			// 				return res.status(400).json({ message: "Please, Provide Valid BMR Delegates Email" });
			// 		}
			// 	});
			// }

			// if (!isEmpty(company.BNMA)) {
			// 	company.BNMA.forEach((obj) => {
			// 		if (!isEmpty(obj.BNMAPhoneNumber)) {
			// 			if (isEmptyNumber(obj.BNMAPhoneNumber))
			// 				return res
			// 					.status(400)
			// 					.json({ message: "Please, Provide Only Digit For BNMA Phone Number" });
			// 		}
			// 		if (!isEmpty(obj.BNMAEmail)) {
			// 			if (isNotEmail(obj.BNMAEmail))
			// 				return res.status(400).json({ message: "Please, Provide Valid BNMA Email" });
			// 		}
			// 	});
			// }

			return Company.findByIdAndUpdate(req.query.id, req.body)
				.then((company) =>
					res.status(200).json({
						success: true,
						message: "Company Updated successfuly.",
						company,
					})
				)
				.catch((error) => {
					// console.log(error);
					return res.status(400).json({
						message: "Something wrong",
						error,
					});
				});

		default:
			return res.status(400).json({ message: `No ${req.method} action exist on this route` });
	}
}
