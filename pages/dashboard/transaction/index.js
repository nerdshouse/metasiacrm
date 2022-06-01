import baseURL from "../../../lib/apis/Base";
import Table from "../../../components/Admin/Table";
import Link from "next/link";
import { useSession } from "next-auth/react";

function AllTransactions({ transactions }) {
	const { data } = useSession();

	transactions = transactions.map((transaction) => ({
		...transaction,
		transactionType: transaction.transactionType === "sales" ? "Sales" : "Purchase",
		// ticketNumber: transaction.ticketId.map((ticket) => ticket.ticketNumber),
		// 	var date = new Date(ComponentData.genratedOn);
		// var day = date.getDate();
		// var month = date.getMonth() + 1;
		// var year = date.getFullYear();

		// genratedOn:
		// 	transaction.genratedOn.getDate() +
		// 	"/" +
		// 	transaction.genratedOn.getMonth() +
		// 	1 +
		// 	"/" +
		// 	transaction.genratedOn.getFullYear(),
	}));
	// console.log(transactions);
	const Linkcolumns = [
		{
			Header: "Product Name",
			accessor: "productName",
			Cell: ({ row, value }) => (
				<div className="flex flex-col">
					{<h4>{row.original.productName}</h4>}
					{data.role === "Admin" ||
					data.role === "SalesPerson" ||
					(data.role === "SalesManager" && row.original.transactionType === "Sales") ||
					(data.role === "PurchaseManager" && row.original.transactionType === "Purchase") ? (
						<div className="ml-2">
							<div>
								<Link href={`/dashboard/transaction/${row.original._id}`} passHref>
									<span className="link text-xs mr-2">Edit</span>
								</Link>
							</div>
						</div>
					) : null}
				</div>
			),
		},
		// {
		// 	Header: "Date",
		// 	accessor: "genratedOn",
		// 	Cell: ({ row, value }) => <div className="flex items-center">{<h4>{
		// 		}</h4>}</div>,
		// },
		// {
		// 	Header: "Ticket Number",
		// 	accessor: "ticketNumber",
		// 	Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		// },
		{
			Header: "Transaction Type",
			accessor: "transactionType",
			Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
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
			Header: "Quantity Unit",
			accessor: "quantityUnit",
			Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		},
	];

	// console.log(transactions);

	return (
		<>
			<div>
				<h3 className="text-3xl mb-4">All Transactions</h3>
				<Table columns={Linkcolumns} data={transactions} />
			</div>
		</>
	);
}

export default AllTransactions;

export const getServerSideProps = () => {
	return baseURL
		.get("/transaction")
		.then((res) => {
			console.log(res.data.transaction);
			return {
				props: {
					transactions: res.data.transaction,
				},
			};
		})
		.catch((error) => {
			// console.log(error);
			return {
				props: { transactions: [] },
			};
		});
};
