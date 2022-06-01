import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Error from "../FormElements/Error";
import Button from "../FormElements/Button";
import TextInput from "../FormElements/TextInput";
import Loader from "../FormElements/Loader";

import Notice from "../Tailwind/Notice";
import useActions from "../../store/";
import { isEmpty, isEmail } from "../../lib/utils/services";
import { signIn } from "next-auth/react";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [loginError, setLoginError] = useState("");

	const auth = useSelector((state) => state.auth);
	const router = useRouter();
	if (auth.token && auth.user) router.push("/dashboard/companies");
	const { warningNotice } = useActions();

	const submitHandler = (e) => {
		e.preventDefault();

		setEmailError(false);
		setPasswordError(false);

		if (!email || !email.includes("@")) return setEmailError(true);
		if (!password || password.trim() === "") return setPasswordError(true);

		if (isEmpty(email) || !isEmail(email)) {
			return warningNotice({
				title: "Please, Provide an Email",
				description: "You can not continue without an email.",
			});
		}

		if (isEmpty(password)) {
			return warningNotice({
				title: "Please, Provide a Password",
				description: "You can not continue without an password.",
			});
		}

		setLoading(true);
		signIn("credentials", { email, password, redirect: false }).then((result) => {
			if (result.ok) return router.push("/dashboard/companies");
			setLoading(false);
			setLoginError("Invalid Credentials! Please check and try again.");
		});
	};
	return (
		<>
			<Notice />
			<form className="w-[100%]" onSubmit={submitHandler}>
				<div className="flex flex-1 flex-col w-[90%] px-2 mx-auto">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-bold py-3">Login</h3>
						<Loader show={loading} />
					</div>
					<p className="font-semibold mb-4 mt-2">Login in and make wonderful things happen.</p>
					<Error message={loginError} show={loginError} />
					<TextInput
						name="username"
						id="username"
						placeholder="Username"
						label="Username"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
					/>
					<Error message="Please, provide a valid email address" show={emailError} />
					<TextInput
						name="password"
						id="password"
						placeholder="Password"
						label="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
					<Error message="Please, provide a password" show={passwordError} />
				</div>
				<Button name="submit" id="submit" label="Login" />
				<div className="flex flex-1 flex-col w-[90%] px-2 py-1 mx-auto"></div>
				{/* {JSON.stringify(auth)} */}
			</form>
		</>
	);
}

export default LoginForm;
