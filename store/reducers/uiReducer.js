const initialState = {
	sideBarOpen: true,
};

export default function uiReducer(state = initialState, action) {
	switch (action.type) {
		case "TOGGLE_SIDEBAR":
			return { ...state, sideBarOpen: !state.sideBarOpen };
		case "GET_UI_CONFIG":
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
