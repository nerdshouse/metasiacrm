import { useState, useEffect } from "react";
import baseURL from "../../../lib/apis/Base";
import useActions from "../../../store";
import { useRouter } from "next/router";
import { toTitleCase } from "../../../lib/utils/services";
import Toggle from "../../../components/Admin/Toggle";
import { useSession } from "next-auth/react";

function EditTicket({ transaction, companies, users }) {
	const { updateTransaction } = useActions();
	const router = useRouter();
	const { data } = useSession();

	useEffect(() => {
		if (
			(data.role === "SalesManager" && transaction.transactionType !== "sales") ||
			(data.role === "PurchaseManager" && transaction.transactionType !== "purchase")
		) {
			router.push(`/dashboard/transaction`);
		}
	}, []);
	const [transactionId, setTransactionId] = useState(transaction._id);
	const [ticketId, setticketId] = useState(transaction.ticketId);
	const [transactionType, setTransactionType] = useState(transaction.transactionType);
	const [productName, setProductName] = useState(transaction.productName);
	const [rate, setRate] = useState(transaction.rate);
	const [quantity, setQuantity] = useState(transaction.quantity);
	const [quantityUnit, setQuantityUnit] = useState(transaction.quantityUnit);
	const [origin, setOrigin] = useState(transaction.origin);
	const [comment, setComment] = useState(transaction.comment);
	const [transactionWith, setTransactionWith] = useState(transaction.transactionWith);
	const [salesPerson, setSalesPerson] = useState(transaction.salesPerson);
	const [metAsiaDeal, setMetAsiaDeal] = useState(transaction.metAsiaDeal);

	const modalSubmitHandler = (e) => {
		e.preventDefault();

		const transaction = {
			_id: transactionId,
			ticketId,
			transactionType,
			productName,
			rate,
			quantity,
			quantityUnit,
			origin,
			transactionWith,
			salesPerson,
			comment,
			metAsiaDeal,
		};

		updateTransaction(transaction)
			.then((transaction) => {
				if (transaction) {
					if (transaction.success) router.push(`/dashboard/transaction`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h1 className="title-mb">Update Transaction</h1>
			<form className="w-full" onSubmit={modalSubmitHandler}>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="productName">
							Product Name
						</label>
						<input
							className="field-text"
							type="text"
							name="productName"
							placeholder="Product Name"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="origin">
							Origin
						</label>
						<input
							className="field-text"
							type="text"
							name="origin"
							placeholder="Origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
						/>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="rate">
							Rate
						</label>
						<input
							className="field-text"
							type="text"
							name="rate"
							placeholder="Rate"
							value={rate}
							onChange={(e) => setRate(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="quantity">
							Quantity
						</label>
						<input
							className="field-text"
							type="text"
							name="quantity"
							placeholder="Quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="quantityUnit">
							Quantity Unit
						</label>
						<select
							className="field-text"
							name="quantityUnit"
							value={quantityUnit}
							onChange={(e) => setQuantityUnit(e.target.value)}
						>
							<option value="">Select The Quantity Unit</option>
							<option value="Metric Ton">Metric Ton</option>
							<option value="KG">KG</option>
						</select>
						{/* <input
							className="field-text"
							type="text"
							name="quantityUnit"
							placeholder="Quantity Unit"
							value={quantityUnit}
							onChange={(e) => setQuantityUnit(e.target.value)}
						/> */}
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="comment">
							Comment
						</label>
						<textarea
							className="field-text"
							name="comment"
							placeholder="Comment"
							value={comment}
							onChange={(e) => setComment(toTitleCase(e.target.value || ""))}
						/>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="transactionWith">
							Transaction With
						</label>
						<select
							className="field-text"
							name="transactionWith"
							value={transactionWith}
							onChange={(e) => setTransactionWith(e.target.value)}
						>
							<option value="">Select The Company</option>
							{companies.map((company, id) => {
								return (
									<option key={id} value={company._id}>
										{company.companyName}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="salesPerson">
							Sales Person
						</label>
						<select
							className="field-text"
							name="salesPerson"
							value={salesPerson}
							onChange={(e) => setSalesPerson(e.target.value)}
						>
							<option value="">Select The Sales Person</option>
							{users.map((user, id) => {
								return (
									<option key={id} value={user._id}>
										{user.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<Toggle
							checked={metAsiaDeal}
							onChange={setMetAsiaDeal}
							label={<span className="text-lg m-2">Met Asia Deal</span>}
						/>
					</div>
				</div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</>
	);
}

export default EditTicket;

// export const getServerSideProps = (ctx) => {
// 	const { id } = ctx.query;
// 	return baseURL
// 		.get(`/transaction/${id}`)
// 		.then((res) => ({
// 			props: {
// 				transaction: res.data.transaction,
// 			},
// 		}))
// 		.catch((error) => {
// 			return {
// 				props: {
// 					ticket: [],
// 				},
// 			};
// 		});
// };

export const getServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	try {
		const companies = await baseURL.get(`/company`).then((res) => res.data.companies);
		const users = await baseURL.get(`/user`, { params: { role: "SalesPerson" } }).then((res) => res.data.user);
		const transaction = await baseURL.get(`/transaction/${id}`).then((res) => res.data.transaction);
		return {
			props: {
				companies,
				users,
				transaction,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				companies: [],
				users: [],
				transaction: [],
			},
		};
	}
};
