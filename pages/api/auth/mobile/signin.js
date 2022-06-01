import User from "../../../../lib/models/User";
import { connectDB } from "../../../../lib/utils/db";
import { isEmpty, isEmail } from "../../../../lib/utils/services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "POST":
			const { email, password } = req.body;

			if (isEmpty(email) && isEmail(email))
				return res.status(400).json({ message: "Please, Enter A Valid Email" });
			if (isEmpty(password))
				return res.status(400).json({ message: "Please, Provide Valid Password", code: "INVALID_PASSWORD" });

			return User.findOne({ email })
				.then((user) => {
					// console.log(user);
					if (!bcrypt.compareSync(password, user.password))
						return res.status(401).json({
							message: "Please, Check Your Password And Try Again",
							code: "INVALID_PASSWORD",
						});

					const token = jwt.sign(
						{
							_id: user._id,
							name: user.name,
							email: user.email,
							phoneNumber: user.phoneNumber,
							role: user.role,
						},
						process.env.ACCESS_TOKEN_SECRET
					);
					return res.status(200).json({ message: "Login Successfull", user, token });
				})
				.catch((error) => res.status(400).json({ message: "No user Found", error, code: "NO_USER_FOUND" }));
		default:
			return res.status(400).json({ message: `No ${req.method} action exist.` });
	}
}
