import { useState, useEffect } from "react";
import Ticket from "../../../components/Tailwind/Ticket";
import baseURL from "../../../lib/apis/Base";
import Separator from "../../../components/Tailwind/Separator";

function AllTickets({ companies, users }) {
	// console.log("salesTickets", salesTickets);
	// console.log("purchaseTickets", purchaseTickets);

	var date = new Date();
	var currentDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(
		-2
	)}`;
	var currentDate1 = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
		"0" +
		(date.getDate() + 1)
	).slice(-2)}`;

	const [fromDate, setFromDate] = useState(currentDate);
	const [toDate, setToDate] = useState(currentDate1);
	const [salesTickets, setSalesTickets] = useState([]);
	const [purchaseTickets, setPurchaseTickets] = useState([]);

	useEffect(() => {
		//Call API
		if (fromDate && toDate)
			baseURL
				.get("/ticket", {
					params: {
						fromDate,
						toDate,
						ticketType: "sales",
						isDeleted: false,
					},
				})
				.then((res) => setSalesTickets(res.data.ticket))
				.catch((error) => console.log({ error }));

		baseURL
			.get("/ticket", {
				params: {
					fromDate,
					toDate,
					ticketType: "purchase",
					isDeleted: false,
				},
			})
			.then((res) => setPurchaseTickets(res.data.ticket))
			.catch((error) => console.log({ error }));
	}, [fromDate, toDate]);
	return (
		<>
			<h1 className="title-mb">All Tickets</h1>

			<form>
				<div className="group">
					<div className="form-group">
						<label htmlFor="fromDate" className="label">
							From Date
						</label>
						<input
							className="field-text"
							placeholder="From Date"
							type="date"
							name="fromDate"
							value={fromDate}
							onChange={(e) => setFromDate(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="toDate" className="label">
							To Date
						</label>
						<input
							className="field-text"
							placeholder="To Date"
							type="date"
							name="toDate"
							value={toDate}
							onChange={(e) => setToDate(e.target.value)}
						/>
					</div>
				</div>
				<Separator className="my-8 mx-12" />
			</form>
			<div className="all-ticket overflow-hidden">
				<div className="overflow-y-auto">
					{salesTickets.map((ticket) => {
						return (
							<Ticket
								type="sales"
								ComponentData={ticket}
								CompaniesData={companies}
								UsersData={users}
								key={ticket._id}
							/>
						);
					})}
				</div>
				<Separator vertical className="mx-2" />
				<div className="overflow-y-auto">
					{purchaseTickets.map((ticket) => {
						return (
							<Ticket
								type="purchase"
								ComponentData={ticket}
								CompaniesData={companies}
								UsersData={users}
								key={ticket._id}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default AllTickets;

export const getServerSideProps = async () => {
	try {
		const companies = await baseURL.get(`/company`).then((res) => res.data.companies);
		const users = await baseURL.get(`/user`, { params: { role: "SalesPerson" } }).then((res) => res.data.user);
		// const tickets = await baseURL.get(`/ticket`, { params: { isDeleted: false } }).then((res) => res.data.ticket);
		// const salesTickets = await baseURL
		// 	.get(`/ticket`, { params: { ticketType: "sales", isDeleted: false } })
		// 	.then((res) => res.data.ticket);
		// const purchaseTickets = await baseURL
		// 	.get(`/ticket`, { params: { ticketType: "purchase", isDeleted: false } })
		// 	.then((res) => res.data.ticket);
		return {
			props: {
				companies,
				users,
				// salesTickets,
				// purchaseTickets,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				companies: [],
				users: [],
				tickets: [],
				// salesTickets: [],
				// purchaseTickets: [],
			},
		};
	}
};
