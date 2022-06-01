import baseURL from "../../lib/apis/Base";

export const createUser = (user) => (dispatch) => {
	return baseURL
		.post("/user", { user })
		.then((res) => {
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: "Success",
					description: `${res.data.user.name} Profile is saved successfully`,
				},
			});
			return res.data;
		})
		.catch((error) => {
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

export const updateUser = (user) => (dispatch) => {
	return baseURL
		.patch(`/user/${user._id}`, { ...user })
		.then((res) => {
			dispatch({
				type: "SUCCESS_NOTICE",
				payload: {
					title: res.data.message,
					description: `Staff is updated successfully`,
				},
			});
			return res.data;
		})
		.catch((error) => {
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

export const getUser = (userId) => (dispatch) => {
	return baseURL
		.get(`/user/${userId}`)
		.then((res) => {
			dispatch({
				type: "GET_USER",
				payload: res.data.user,
			});
			// console.log(res);
			return res.data;
		})
		.catch((error) => console.log(error));
};
