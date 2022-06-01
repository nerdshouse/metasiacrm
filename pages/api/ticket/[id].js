import Ticket from "../../../lib/models/Ticket";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isEmptyArray } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "GET":
			return Ticket.findById(req.query.id)
				.populate("productImages")
				.then((ticket) => {
					return res.status(200).json({ ticket });
				})
				.catch((error) => {
					res.status(400).json({ message: "Ticket Not Found Or Something Else Is Wrong", error });
				});
		case "PATCH":
			const ticket = req.body;

			if (!ticket.isDeleted) {
				if (isEmpty(ticket.productName))
					return res.status(400).json({ message: "Please, Provide A Product Name" });

				if (isEmpty(ticket.origin)) return res.status(400).json({ message: "Please, Provide An Origin" });

				if (isEmpty(ticket.rate))
					return res.status(400).json({ message: "Please, Provide A Rate(Per Metric Tone)" });

				if (isEmpty(ticket.quantity)) return res.status(400).json({ message: "Please, Provide A Quantity" });

				if (isEmpty(ticket.containerSize))
					return res.status(400).json({ message: "Please, Provide A Container Size" });

				if (isEmptyArray(ticket.packing))
					return res.status(400).json({ message: "Please, Provide Packing Type" });

				if (isEmpty(ticket.ticketType))
					return res.status(400).json({ message: "Please, Select A Ticket Type" });

				// if (isEmpty(ticket.status)) return res.status(400).json({ message: "Please, Select A Status" });
			}

			return Ticket.findByIdAndUpdate(req.query.id, req.body, { new: true })
				.then((ticket) => {
					// console.log(ticket);
					if (ticket.isDeleted) {
						res.status(200).json({
							deleted: true,
							message: "Ticket Deleted.",
							ticket,
						});
					} else {
						res.status(200).json({
							success: true,
							message: "Ticket Updated successfuly.",
							ticket,
						});
					}
				})
				.catch((error) => {
					// console.log(error);
					return res.status(400).json({
						message: "Something wrong",
						error,
					});
				});

		// case "DELETE":
		// return Ticket.findByIdAndDelete(req.query.id, req.body)
		// 	.then((ticket) => {
		// 		res.status(200).json({
		// 			success: true,
		// 			message: "Ticket Deleted Successfully",
		// 			ticket,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		return res.status(404).json({
		// 			message: "Something Wrong",
		// 			error,
		// 		});
		// 	});
		default:
			return res.status(400).json({ message: `No ${req.method} action exist on this route` });
	}
}
