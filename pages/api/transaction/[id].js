import Transaction from "../../../lib/models/Transaction";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "GET":
			return Transaction.findById(req.query.id)
				.then((transaction) => {
					return res.status(200).json({ transaction });
				})
				.catch((error) => {
					res.status(400).json({ message: "Transaction Not Found Or Something Else Is Wrong", error });
				});
		case "PATCH":
			const transaction = req.body;

			if (isEmpty(transaction.productName))
				return res.status(400).json({ message: "Please, Provide A Product Name" });

			if (isEmpty(transaction.comment)) return res.status(400).json({ message: "Please, Provide A Comment" });

			return Transaction.findByIdAndUpdate(req.query.id, req.body)
				.then((transaction) => {
					res.status(200).json({
						success: true,
						message: "Ticket Updated Successfully",
						transaction,
					});
				})
				.catch((error) => {
					return res.status(404).json({
						message: "Something wrong",
						error,
					});
				});
		default:
			return res.status(400).json({ message: `No ${req.method} action exist on this route` });
	}
}
