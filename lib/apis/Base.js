import axios from "axios";

export default axios.create({
	baseURL:
		process.env.NODE_ENV === "production" ? "https://met-asia-crm.vercel.app/api" : "http://localhost:3000/api",
});
