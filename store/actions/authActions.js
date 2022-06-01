import baseURL from "../../lib/apis/Base";
import { authFail } from "../../lib/utils/services";

export const signin = (user) => (dispatch) => {
	baseURL
		.post("/auth/signin", user)
		.then((res) => {
			const { token, user } = res.data;
			localStorage.setItem("UserInfo", JSON.stringify({ token, id: user._id }));
			dispatch({
				type: "SIGNIN",
				payload: {
					token,
					user: {
						_id: user._id,
						name: user.name,
						email: user.email,
						phoneNumber: user.phoneNumber,
						// role: user.role,
					},
				},
			});
		})
		.catch((error) => {
			const { data } = error.response;

			if (data.code === "INVALID_PASSWORD")
				dispatch({
					type: "ERROR_NOTICE",
					payload: {
						title: "Incorrect Password",
						description: "The Password Is Incorrect. Please, Try Again ",
					},
				});

			if (data.code === "NO_USER_FOUND")
				dispatch({
					type: "ERROR_NOTICE",
					payload: {
						title: "No User Found",
						description: "You Are Not Authenticate User.",
					},
				});

			authFail(error, dispatch);
		});
};

export const signout = () => (dispatch) => {
	localStorage.removeItem("UserInfo");
	dispatch({
		type: "SIGNOUT",
	});
};

export const signup = (user) => (dispatch) => {
	baseURL
		.post("/auth/signup", { user })
		.then((res) => {
			const { token, user } = res.data;
			localStorage.setItem("UserInfo", JSON.stringify({ token, id: user._id }));
			dispatch({
				type: "SIGNUP",
				payload: {
					token,
					user: { _id: user._id, email: user.email, name: user.name },
				},
			});
		})
		.catch((error) => authFail(error, dispatch));
};

export const localSignin = () => (dispatch) => {
	const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

	if (userInfo)
		baseURL
			.get(`/user/${userInfo.id}`, {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			.then((res) => {
				const { user } = res.data;
				dispatch({
					type: "LOCAL_SIGNIN",
					payload: {
						token: userInfo.token,
						// user: { _id: user._id, email: user.email, name: user.name },
						user: { _id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber },
					},
				});
				// console.log("user", user);
			})
			.catch((error) => authFail(error, dispatch));
};
