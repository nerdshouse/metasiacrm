import nextConnect from "next-connect";
import multer from "multer";
import { connectDB } from "../../lib/utils/db";

import Images from "../../lib/models/Images";

const upload = multer({
	storage: multer.diskStorage({
		destination: "./public/uploads",
		// filename: (req, file, cb) => cb(null, file.originalname),
		filename: function (req, file, cb) {
			const split = file.originalname.split(".");
			const ext = split[split.length - 1];
			cb(null, file.fieldname + "-" + Date.now() + "." + ext);
		},
	}),
});

const apiRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

apiRoute.use(upload.array("image"));

apiRoute.post((req, res) => {
	connectDB();
	console.log(req);
	const images = req.files.map((image) => ({ name: image.filename, type: req.body.type }));

	return Images.create(images)
		.then((images) => res.status(200).json({ images, success: true }))
		.catch((error) => res.status(400).json({ message: "Something went wronge!", error }));

	// res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
