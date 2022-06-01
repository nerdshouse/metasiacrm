export const isEmpty = (item) => {
	return !item || item === "";
};

export const isEmptyNumber = (item) => {
	return !item || item === "" || isNaN(item);
};

export const isPhoneNumber = (item) => {
	return item.length !== 10;
};

export const isEmptyArray = (items) => {
	return items && items.length === 0;
};

export const isEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const isNotEmail = (email) => {
	return !email.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const getToken = (req) => {
	const authorization = req.headers.get("authorization");

	if (authorization && authorization.startsWith("Bearer")) return authorization.split(" ")[1];

	return false;
};

export const authFail = (error, dispatch) => {
	localStorage.removeItem("UserInfo");
	dispatch({
		type: "AUTH_FAIL",
	});
};

export const randomPassword = (length = 10) => {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const toTitleCase = (str) => {
	const words = str.split(" ");
	const capitalWords = words.map((word) => {
		const letters = word.split("");
		if (letters.length > 0) letters[0] = letters[0].toUpperCase();
		return letters.join("");
	});
	return capitalWords.join(" ");
};
