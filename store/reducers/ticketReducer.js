const initialState = { ticketData: null };

export default function ticketReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_TICKETS":
			return { ...action.payload };
		case "SUCCESS_NOTICE":
			return { ...action.payload };
		case "ERROR_NOTICE":
			return { ...action.payload };
		default:
			return state;
	}
}
