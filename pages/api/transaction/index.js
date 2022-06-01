import Transaction from "../../../lib/models/Transaction";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isEmptyArray } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();

	const { transaction } = req.body;

	switch (req.method) {
		case "GET":
			// const { value } = req.body;
			const { fromDate, toDate } = req.query;

			const filter = {};
			if (fromDate && toDate) {
				filter["genratedOn"] = {
					$gte: fromDate,
					$lt: toDate,
				};
			}

			return Transaction.find(filter)
				.populate("ticketId")
				.populate("salesPerson")
				.populate("transactionWith")
				.then((transaction) =>
					res.status(200).json({
						transaction,
					})
				)
				.catch((error) =>
					res.status(400).json({
						message: "Something Went Wrong!",
						error,
					})
				);
		case "POST":
			// if (isEmpty(transaction.productName))
			// 	return res.status(400).json({ message: "Please, Provide A Product Name" });

			// if (isEmpty(transaction.comment)) return res.status(400).json({ message: "Please, Provide A Comment" });

			return Transaction.create(transaction)
				.then((transaction) =>
					res.status(200).json({
						success: true,
						message: "Transaction added successfully",
						transaction,
						_id: transaction._id,
					})
				)
				.catch((error) =>
					res.status(400).json({
						message: "Something Went Wrong",
						error,
					})
				);
		default:
			res.status(400).json({ message: `No ${req.method} action exist.` });
	}
}
