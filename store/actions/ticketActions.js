import baseURL from "../../lib/apis/Base";

export const createTicket = (ticket) => (dispatch) => {
	return baseURL
		.post("/ticket", {
			ticket,
		})
		.then((res) => {
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: res.data.message,
					description: `For Product ${res.data.ticket.productName} Ticket is Genrated.`,
				},
			});
			return res.data;
		})
		.catch((error) => {
			// console.log(error.response.data);
			dispatch({
				type: "ERROR_NOTICE",
				payload: {
					title: "Something Went Wrong",
					description: error.response.data.message,
				},
			});
			return error.response.data;
		});
};

export const updateTicket = (ticket) => (dispatch) => {
	return baseURL
		.patch(`/ticket/${ticket._id}`, {
			...ticket,
		})
		.then((res) => {
			// console.log(res.data);
			if (res.data.deleted) {
				dispatch({
					type: "ERROR_NOTICE",
					payload: {
						title: res.data.message,
						description: `Ticket is Deleted Successfully.`,
					},
				});
			} else {
				dispatch({
					type: "SUCCESS_NOTICE",
					payload: {
						title: res.data.message,
						description: `Ticket is Updated.`,
					},
				});
			}
			return res.data;
		})
		.catch((error) => {
			// console.log(error.response.data);
			dispatch({
				type: "ERROR_NOTICE",
				payload: {
					title: "Something Went Wrong",
					description: error.response.data.message,
				},
			});
			return error.response.data;
		});
};

export const getAllTickets = () => (dispatch) => {
	return baseURL
		.get("/ticket")
		.then((res) => {
			dispatch({
				type: "GET_TICKETS",
				payload: res.data.ticket,
			});
		})
		.catch((error) => console.log(error));
};
