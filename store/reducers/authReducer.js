const initialState = { isAuthenticated: false, token: null, user: null };

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case "LOCAL_SIGNIN":
		case "SIGNUP":
		case "SIGNIN":
			return { ...action.payload, isAuthenticated: true };
		case "AUTH_FAIL":
		case "SIGNOUT":
			return { token: null, user: null, isAuthenticated: false };
		default:
			return state;
	}
}
