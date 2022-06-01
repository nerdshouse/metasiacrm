import { useRef } from "react";
import Link from "next/link";
import Table from "../../../components/Admin/Table";
import baseURL from "../../../lib/apis/Base";
import { useState } from "react";
import Toggle from "../../../components/Admin/Toggle";
import useActions from "../../../store";
import useDidMountEffect from "../../../lib/hooks/useDidMountEffect";

function AllStaff({ user }) {
	// console.log(user);
	user = user.map((user) => ({
		...user,
		role:
			user.role === "SalesPerson"
				? "Sales Person (Executive)"
				: user.role === "SalesManager"
				? "Sales Manager"
				: "Purchase Manager",
	}));

	return (
		<>
			<div>
				<h3 className="text-3xl mb-4">All Staff</h3>
				<Table columns={columns} data={user} />
			</div>
		</>
	);
}

export default AllStaff;

const columns = [
	{
		Header: "Name",
		accessor: "name",
		Cell: ({ row, value }) => (
			<div className="flex flex-col">
				{<h4>{value}</h4>}
				<div className="ml-2">
					<div>
						<Link href={`/dashboard/user/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Edit</span>
						</Link>
					</div>
				</div>
			</div>
		),
	},
	{
		Header: "Email",
		accessor: "email",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Phone Number",
		accessor: "phoneNumber",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Role",
		accessor: "role",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: (cell) => {
			const [status, setStatus] = useState(cell.value === true);

			const { successNotice, errorNotice } = useActions();
			const mountRef = useRef(false);

			useDidMountEffect(() => {
				if (mountRef.current) {
					const reqBody = { status };
					// console.log("reqbody", reqBody);
					baseURL
						.patch(`/user/${cell.row.original._id}`, reqBody)
						.then((res) => {
							// console.log("res", res);
							successNotice({
								title: res.data.message,
								description: `Now This Employee Is ${
									res.data.user.status ? "Now Not Active." : "Now Active."
								}`,
							});
						})
						.catch((error) => {
							console.log("error", { error });
							errorNotice({
								title: "Something went wrong!",
								description: error.response.data,
							});
						});
					// console.log("didMount");
				} else {
					mountRef.current = true;
				}
			}, [status]);
			return <Toggle checked={status} onChange={() => setStatus((state) => !state)} />;
		},
	},
];

export const getServerSideProps = () => {
	return baseURL
		.get("/user")
		.then((res) => ({
			props: {
				user: res.data.user.filter((user) => user.role !== "Admin"),
			},
		}))
		.catch((error) => {
			console.log(error);
			return {
				props: { user: [] },
			};
		});
};
