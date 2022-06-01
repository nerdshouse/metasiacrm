import baseURL from "../../lib/apis/Base";

export const createTransaction = (transaction) => (dispatch) => {
	return baseURL
		.post("/transaction", {
			transaction,
		})
		.then((res) => {
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: "Transaction is added",
					description: res.data.message,
				},
			});
			return res.data;
		})
		.catch((error) => {
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
export const updateTransaction = (transaction) => (dispatch) => {
	return baseURL
		.patch(`/transaction/${transaction._id}`, {
			...transaction,
		})
		.then((res) => {
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: res.data.message,
					description: "Transaction Updated Successfully",
				},
			});
			return res.data;
			// console.log(res.data);
		})
		.catch((error) => {
			dispatch({
				type: "ERROR_NOTICE",
				payload: {
					title: "Something Went Wrong",
					description: error.response.data.message,
				},
			});
			return error.response.data;
			// console.log(error.response.data.message);
		});
};
