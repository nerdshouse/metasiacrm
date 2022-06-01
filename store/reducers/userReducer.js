const initialState = { userData: null };

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_USER":
			return { ...action.payload, isAuthenticated: true };
		case "SUCCESS_NOTICE":
			return { ...action.payload };
		case "ERROR_NOTICE":
			return { ...action.payload };
		default:
			return state;
	}
}
