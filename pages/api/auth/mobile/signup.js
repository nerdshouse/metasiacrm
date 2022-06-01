import User from "../../../../lib/models/User";
import { connectDB } from "../../../../lib/utils/db";
import { isEmpty } from "../../../../lib/utils/services";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
	connectDB();

	switch (req.method) {
		case "POST":
			const { user } = req.body;

			if (!user)
				return res.status(400).json({
					message: "Provide User information to create a User. Body must contain a user Object",
				});

			if (isEmpty(user.name)) return res.status(400).json({ message: "Provide a name for the User" });

			if (isEmpty(user.email)) return res.status(400).json({ message: "Provide a email for the User" });

			if (isEmpty(user.password)) return res.status(400).json({ message: "Provide a password for the User" });

			user.password = bcrypt.hashSync(user.password, 10);

			return User.findOne({ email: user.email })
				.then((userDB) => {
					if (!userDB) {
						return User.create(user)
							.then((user) => {
								const token = jwt.sign(
									{
										name: user.name,
										email: user.email,
										_id: user._id,
										image: user.image,
										role: user.role,
									},
									process.env.ACCESS_TOKEN_SECRET
								);
								res.status(201).json({
									success: true,
									message: "User saved successfuly",
									user,
									_id: user._id,
									token,
								});
							})
							.catch((error) =>
								res.status(400).json({
									message: "Something went wrong! check the error object for more information",
									error,
								})
							);
					}
					return res.status(400).json({ message: "User alreday exist." });
				})
				.catch((error) => console.log(error));

		default:
			return res.status(400).json({ message: `No ${req.method} action exist on this route` });
	}
}
