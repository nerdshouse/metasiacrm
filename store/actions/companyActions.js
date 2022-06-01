import baseURL from "../../lib/apis/Base";

export const createCompany = (company) => (dispatch) => {
	return baseURL
		.post("/company", {
			company,
		})
		.then((res) => {
			// console.log("response", res.data);

			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: res.data.message,
					description: `${res.data.company.companyName} is saved successfully`,
				},
			});
			return res.data;
		})
		.catch((error) => {
			// console.log("error", error.response.data);
			dispatch({
				type: "ERROR_NOTICE",
				payload: {
					title: "Something went wrong",
					description: error.response.data.message,
				},
			});
			return error.response.data;
		});
};

export const updateCompany = (company) => (dispatch) => {
	return baseURL
		.patch(`/company/${company._id}`, {
			...company,
		})
		.then((res) => {
			// console.log("response", res.data);
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: res.data.message,
					description: `Company is updated successfully`,
				},
			});
			return res.data;
		})
		.catch((error) => {
			// console.log("error", error.response.data);
			dispatch({
				type: "ERROR_NOTICE",
				payload: {
					title: "Something went wrong",
					description: error.response.data.message,
				},
			});
			return error.response.data.message;
		});
};
