import { combineReducers } from "redux";
import authReducer from "./authReducer";
import uiReducer from "./uiReducer";
import noticeReducer from "./noticeReducer";
import companyReducer from "./companyReducer";
import userReducer from "./userReducer";
import ticketReducer from "./ticketReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
	ui: uiReducer,
	auth: authReducer,
	notice: noticeReducer,
	company: companyReducer,
	user: userReducer,
	ticket: ticketReducer,
	transaction: transactionReducer,
});
