export const toggleSidebar = () => (dispatch, getState) => {
	localStorage.setItem("UIConfig", JSON.stringify(getState().ui));
	dispatch({ type: "TOGGLE_SIDEBAR" });
};

export const getUiConfig = () => () => {
	const UIConfig = localStorage.getItem("UIConfig");
	dispatch({ type: "GET_UI_CONFIG", payload: JSON.parse(UIConfig) });
};
