const initialState = { transactionData: null };

export default function transactionReducer(state = initialState, action = null) {
	switch (action.type) {
		case "SUCCESS_NOTICE":
			return { ...action.payload };
		case "ERROR_NOTICE":
			return { ...action.payload };
		default:
			return state;
	}
}
