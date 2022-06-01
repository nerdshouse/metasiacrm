import User from "../../../lib/models/User";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isNotEmail, isEmptyNumber } from "../../../lib/utils/services";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "GET":
			return User.findById(req.query.id)
				.then((user) => {
					delete user._doc["password"];
					return res.status(200).json({ user });
				})
				.catch((error) => {
					res.status(404).json({ message: "User Not Fond Or Something Else Is Wrong", error });
				});
		case "PATCH":
			const user = req.body;

			// if (isEmpty(user.name)) return res.status(400).json({ message: "Please, Provide A Name" });

			// if (isNotEmail(user.email)) return res.status(400).json({ message: "Please, Provide Valid Email" });
			// if (isEmpty(user.email)) return res.status(400).json({ message: "Please, Provide A Email" });

			// if (isEmpty(user.phoneNumber)) return res.status(400).json({ message: "Please, Provide A Phone Number" });
			// if (isEmptyNumber(user.phoneNumber))
			// 	return res.status(400).json({ message: "Please, Provide Only Digit For Phone Number" });

			// if (isEmpty(user.password)) return res.status(400).json({ message: "Please, Provide An IEC Number" });

			// if (isEmpty(user.role)) return res.status(400).json({ message: "Please, Select A Role" });

			return User.findByIdAndUpdate(req.query.id, req.body)
				.then((user) => {
					console.log(user);
					return res.status(200).json({
						success: true,
						message: "Staff Updated successfuly.",
						user,
					});
				})
				.catch((error) => {
					console.log(error);
					return res.status(400).json({
						message: "Something wrong",
						error,
					});
				});
		default:
			return res.status(400).json({ message: `No ${req.method} action exist on this route` });
	}
}
