const initialState = { companyData: null };

export default function companyReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_COMPANIES":
			return { ...action.payload, isAuthenticated: true };
		case "SUCCESS_NOTICE":
			return { ...action.payload };
		case "ERROR_NOTICE":
			return { ...action.payload };
		default:
			return state;
	}
}
