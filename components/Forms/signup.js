import { useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { isEmpty, isEmail } from "../../lib/utils/services";
import useActions from "../../store";

function SignUp() {
	const auth = useSelector((state) => state.auth);
	const { signup, signout, warningNotice } = useActions();

	const router = useRouter();

	if (auth.token && auth.user) router.push("/");

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordVerifyRef = useRef();

	const formSubmitHandler = (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordVerify = passwordVerifyRef.current.value;

		if (isEmpty(name))
			return warningNotice({
				title: "Please Provide a Name",
				description: "You can not continue with out providing a name.",
			});

		if (isEmpty(email) || !isEmail(email))
			return warningNotice({
				title: "Please Provide a Valid Email",
				description: "You can not continue with out providing a valid email.",
			});

		if (isEmpty(password))
			return warningNotice({
				title: "Please Provide your Password",
				description: "You can not continue with out providing your password.",
			});

		if (isEmpty(passwordVerify))
			return warningNotice({
				title: "Please Verify your Password",
				description: "You can not continue with out verifying your password.",
			});

		if (password !== passwordVerify)
			return warningNotice({
				title: "Passwords Do not match",
				description: "Passwords you provided does not match please check you passwords and try again.",
			});

		signup({ name, email, password });
	};

	return (
		<div>
			<h2>SignIn</h2>
			<form onSubmit={formSubmitHandler}>
				<div>
					<label htmlFor="name">Name</label> <br />
					<input type="name" name="name" id="name" ref={nameRef} />
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<br />
					<input type="email" name="email" id="email" ref={emailRef} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<br />
					<input type="password" name="password" id="password" ref={passwordRef} />
				</div>
				<div>
					<label htmlFor="passwordVerify">Verify your Password</label>
					<br />
					<input type="password" name="passwordVerify" id="passwordVerify" ref={passwordVerifyRef} />
				</div>
				<div>
					<button type="submit">Sign Up</button>
				</div>
				{JSON.stringify(auth)}
			</form>
			<button type="button" onClick={signout}>
				Sign Out
			</button>
		</div>
	);
}
export default SignUp;
