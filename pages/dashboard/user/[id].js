import { useState } from "react";
import { toTitleCase } from "../../../lib/utils/services";
import baseURL from "../../../lib/apis/Base";
import useActions from "../../../store";
import { useRouter } from "next/router";

function StaffProfile({ user }) {
	const { updateUser } = useActions();
	const router = useRouter();
	// console.log("user", user);

	const [userID, setUserID] = useState(user._id);
	const [name, setName] = useState(user.name);
	const [role, setRole] = useState(user.role);
	const [email, setEmail] = useState(user.email);
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
	// const [password, setPassword] = useState(user.password);
	// const [rePassword, setRePassword] = useState(user.password);

	const submitHandler = (e) => {
		e.preventDefault();

		const user = {
			_id: userID,
			name,
			role,
			email,
			phoneNumber,
			// password,
			// rePassword,
		};

		updateUser(user)
			.then((user) => {
				if (user) {
					if (user.success) router.push(`/dashboard/user`);
				}
			})
			.catch((error) => console.log(error));

		// console.log("name", name);
		// console.log("role", role);
		// console.log("email", email);
		// console.log("phoneNumber", phoneNumber);
		// console.log("password", password);
	};
	return (
		<>
			<h1 className="title-mb">Edit Staff Details</h1>
			<form onSubmit={submitHandler}>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="name">
							Name
						</label>
						<input
							className="field-text"
							type="text"
							name="name"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(toTitleCase(e.target.value || ""))}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="role">
							Role
						</label>
						<select
							className="field-text"
							name="role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
						>
							<option value="">Select The Role</option>
							<option value="SalesPerson">Sales Person (Executive)</option>
							<option value="SalesManager">Sales Manager</option>
							<option value="PurchaseManager">Purchase Manager</option>
						</select>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="email">
							Email
						</label>
						<input
							className="field-text"
							disabled
							type="text"
							name="email"
							placeholder="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="phoneNumber">
							Phone Number
						</label>
						<input
							className="field-text"
							type="text"
							name="phoneNumber"
							placeholder="Phone Number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</div>
				</div>
				{/* <div className="group">
					<div className="form-group">
						<label className="label" htmlFor="password">
							Password
						</label>
						<input
							className="field-text"
							type="text"
							name="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="rePassword">
							Re-enter Password
						</label>
						<input
							className="field-text"
							type="text"
							name="rePassword"
							placeholder="Re-enter Password"
							value={rePassword}
							onChange={(e) => setRePassword(e.target.value)}
						/>
					</div>
				</div> */}
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}
export default StaffProfile;

export const getServerSideProps = (ctx) => {
	const { id } = ctx.query;

	return baseURL
		.get(`user/${id}`)
		.then((res) => ({
			props: {
				user: res.data.user,
			},
		}))
		.catch((error) => {
			return {
				props: {
					user: [],
				},
			};
		});
};
