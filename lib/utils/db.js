import { connect, connection } from "mongoose";
export const connectDB = () => {
	if (!connection.readyState)
		if (process.env.NODE_ENV === "production") return connect(process.env.MONGODB_URI);
		else
			return connect(process.env.MONGODB_URI_DEV, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
};
