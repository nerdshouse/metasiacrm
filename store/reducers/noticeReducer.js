const initialState = {
	title: null,
	description: null,
	type: null,
	duration: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "INFO_NOTICE":
			return {
				...action.payload,
				type: "info",
				duration: action.payload.duration || 5000,
			};
		case "ERROR_NOTICE":
			return {
				...action.payload,
				type: "error",
				duration: action.payload.duration || 5000,
			};
		case "SUCCESS_NOTICE":
			return {
				...action.payload,
				type: "success",
				duration: action.payload.duration || 5000,
			};
		case "WARNING_NOTICE":
			return {
				...action.payload,
				type: "warning",
				duration: action.payload.duration || 5000,
			};
		case "CLEAR_NOTICE":
			return {
				...initialState,
			};
		default:
			return state;
	}
};

export default reducer;
