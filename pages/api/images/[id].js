import Images from "../../../lib/models/Images";
import { connectDB } from "../../../lib/utils/db";
import fs from "fs";

export default function handler(req, res) {
	connectDB();
	switch (req.method) {
		case "DELETE":
			return Images.findByIdAndDelete(req.query.id)
				.then((image) => {
					const path = "public/uploads/" + image.name;
					console.log(path);

					try {
						// fs.unlinkSync(path);
						fs.unlink(path, (err) => {
							console.log("deleted", err);
						});
						//file removed
					} catch (err) {
						console.error(err);
					}
					return res.status(200).json({ image });
				})
				.catch((error) =>
					res.status(400).json({
						message: "Image Deleted Successfully.",
						error,
					})
				);
		default:
			res.status(400).json({ message: `No ${req.method} action exist.` });
	}
}
