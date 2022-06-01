import Ticket from "../../../lib/models/Ticket";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isEmptyNumber, isNotEmail, isEmptyArray } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();
	const { ticket } = req.body;
	// console.log("req", req.query);

	switch (req.method) {
		case "GET":
			const { fromDate, toDate, isDeleted, ticketType } = req.query;

			const filter = {};
			if (fromDate && toDate) {
				filter["genratedOn"] = {
					$gte: fromDate,
					$lt: toDate,
				};
			}

			if (isDeleted) {
				filter["isDeleted"] = isDeleted;
			}

			// if (ticketType) {
			filter["ticketType"] = ticketType;
			// }

			// console.log(filter);
			// return Ticket.find(req.query)
			return Ticket.find(filter)
				.populate("genratedBy")
				.populate("companyId")
				.then((ticket) =>
					res.status(200).json({
						ticket,
					})
				)
				.catch((error) =>
					res.status(400).json({
						message: "Something Went Wrong!",
						error,
					})
				);
		case "POST":
			if (isEmpty(ticket.productName)) return res.status(400).json({ message: "Please, Provide A Product Name" });

			if (isEmpty(ticket.origin)) return res.status(400).json({ message: "Please, Provide An Origin" });

			if (isEmpty(ticket.rate))
				return res.status(400).json({ message: "Please, Provide A Rate(Per Metric Tone)" });

			if (isEmpty(ticket.quantity)) return res.status(400).json({ message: "Please, Provide A Quantity" });

			if (isEmpty(ticket.containerSize))
				return res.status(400).json({ message: "Please, Provide A Container Size" });

			if (isEmptyArray(ticket.packing)) return res.status(400).json({ message: "Please, Provide Packing Type" });

			if (isEmpty(ticket.ticketType)) return res.status(400).json({ message: "Please, Select A Ticket Type" });

			return Ticket.count({}).then((count) =>
				Ticket.create({ ...ticket, ticketNumber: count + 1 })
					.then((ticket) =>
						res.status(200).json({
							success: true,
							message: "Ticket added successfully",
							ticket,
							_id: ticket._id,
						})
					)
					.catch((error) =>
						res.status(400).json({
							message: "Something Went Wrong",
							error,
						})
					)
			);
		default:
			res.status(400).json({ message: `No ${req.method} action exist.` });
	}
}
