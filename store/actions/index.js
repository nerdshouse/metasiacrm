import * as uiActions from "./uiActions";
import * as authActions from "./authActions";
import * as noticeActions from "./noticeActions";
import * as companyActions from "./companyActions";
import * as userActions from "./userActions";
import * as ticketActions from "./ticketActions";
import * as transactionActions from "./transactionActions";

const actionCreators = {
	...uiActions,
	...authActions,
	...noticeActions,
	...companyActions,
	...userActions,
	...ticketActions,
	...transactionActions,
};

export default actionCreators;
