import { useState, useEffect } from "react";
import baseURL from "../../../lib/apis/Base";
import Table from "../../../components/Admin/Table";
import Link from "next/link";
import Separator from "../../../components/Tailwind/Separator";

function TicketReport() {
	var date = new Date();
	var currentDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(
		-2
	)}`;

	const [fromDate, setFromDate] = useState(currentDate);
	const [toDate, setToDate] = useState(currentDate);
	const [data, setData] = useState([]);

	useEffect(() => {
		//Call API
		if (fromDate && toDate)
			baseURL
				.get("/ticket", {
					params: {
						fromDate,
						toDate,
					},
				})
				.then((res) => setData(res.data.ticket))
				.catch((error) => console.log({ error }));
	}, [fromDate, toDate]);

	return (
		<>
			<h1 className="title-mb">Ticket Report</h1>
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
				<div>
					<h3 className="text-3xl mb-4 text-primary-500">All Tickets</h3>
					<Table columns={columns} data={data} />
				</div>
			</form>
		</>
	);
}

export default TicketReport;

const columns = [
	{
		Header: "Product Name",
		accessor: "productName",
		Cell: ({ row, value }) => (
			<div className="flex flex-col">
				{<h4>{row.original.productName}</h4>}
				{/* <div className="ml-2">
					<div>
						<Link href={`/dashboard/transaction/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Edit</span>
						</Link>
					</div>
				</div> */}
			</div>
		),
	},
	{
		Header: "Rate",
		accessor: "rate",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Quantity",
		accessor: "quantity",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Comment",
		accessor: "comment",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
	{
		Header: "Genrated By",
		accessor: "genratedBy",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value.name}</h4>}</div>,
	},
	// {
	// 	Header: "Role",
	// 	accessor: "genratedByRole",
	// 	Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value.role}</h4>}</div>,
	// },
	{
		Header: "Ticket Type",
		accessor: "ticketType",
		Cell: ({ row, value }) => (
			<div className="flex items-center">{<h4>{value === "sales" ? "Sales" : "Purchase"}</h4>}</div>
		),
	},
	{
		Header: "Status",
		accessor: "status",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	},
];
