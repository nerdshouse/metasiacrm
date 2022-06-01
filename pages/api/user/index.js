import User from "../../../lib/models/User";
import { connectDB } from "../../../lib/utils/db";
import { isEmpty, isEmptyNumber, isNotEmail } from "../../../lib/utils/services";
import bcrypt from "bcrypt";

export default function handler(req, res) {
	connectDB();
	const { user } = req.body;

	switch (req.method) {
		case "GET":
			// console.log({ query: req.query, params: req.params, body: req.body });
			return User.find(req.query || {})
				.then((user) =>
					res.status(200).json({
						user,
					})
				)
				.catch((error) =>
					res.status(400).json({
						message: "Something Went Wrong!",
						error,
					})
				);

		case "POST":
			return User.findOne({ email: user.email })
				.then((userDB) => {
					if (userDB) return res.status(400).json({ message: "A user with this email already exist!" });

					if (isEmpty(user.name)) return res.status(400).json({ message: "Please, Provide A Name" });

					if (isNotEmail(user.email)) return res.status(400).json({ message: "Please, Provide Valid Email" });
					if (isEmpty(user.email)) return res.status(400).json({ message: "Please, Provide A Email" });

					if (isEmpty(user.phoneNumber))
						return res.status(400).json({ message: "Please, Provide A Phone Number" });
					if (isEmptyNumber(user.phoneNumber))
						return res.status(400).json({ message: "Please, Provide Only Digit For Phone Number" });

					if (isEmpty(user.password)) return res.status(400).json({ message: "Please, Provide A Password" });

					if (isEmpty(user.rePassword))
						return res.status(400).json({ message: "Please, Re Enter Your Password" });

					if (user.password !== user.rePassword)
						return res.status(400).json({ message: "Both Passwords Are Not Matched" });

					user.password = bcrypt.hashSync(user.password, 10);

					if (isEmpty(user.role)) return res.status(400).json({ message: "Please, Select A Role" });

					return User.create(user)
						.then((user) =>
							res.status(200).json({
								success: true,
								message: "Staff added successfully!",
								user,
								_id: user._id,
							})
						)
						.catch((error) =>
							res.status(400).json({
								message: "Something Went Wrong",
								error,
							})
						);
				})
				.catch((error) =>
					res.status(400).json({
						message: "Something Went Wrong!",
						error,
					})
				);

		default:
			res.status(400).json({ message: `No ${req.method} action exist.` });
	}
}
