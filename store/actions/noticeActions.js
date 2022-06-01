export const clearNotice = () => (dispatch) => {
	dispatch({
		type: "CLEAR_NOTICE",
	});
};

export const infoNotice = (notice) => (dispatch) => {
	dispatch({
		type: "INFO_NOTICE",
		payload: notice,
	});
};

export const errorNotice = (notice) => (dispatch) => {
	dispatch({
		type: "ERROR_NOTICE",
		payload: notice,
	});
};

export const successNotice = (notice) => (dispatch) => {
	dispatch({
		type: "SUCCESS_NOTICE",
		payload: notice,
	});
};

export const warningNotice = (notice) => (dispatch) => {
	dispatch({
		type: "WARNING_NOTICE",
		payload: notice,
	});
};
