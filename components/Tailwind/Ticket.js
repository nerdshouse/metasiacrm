import { FaPen } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FaRupeeSign, FaDollarSign } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import useActions from "../../store";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "../../components/Tailwind/Modal";
import Separator from "./Separator";
import Toggle from "../../components/Admin/Toggle";
import { toTitleCase } from "../../lib/utils/services";

const Ticket = ({ type, ComponentData, CompaniesData, UsersData }) => {
	// console.log("ComponentData", ComponentData);
	const [userName, setUserName] = useState("");
	const { getUser, createTransaction, updateTicket } = useActions();
	const formattedPacking = ComponentData.packing.join(" | ");
	const { data } = useSession();
	// console.log(data);
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	getUser(ComponentData.genratedBy._id)
		.then((user) => {
			setUserName(user.user.name);
		})
		.catch((error) => console.log("err", error));

	function getTicket() {
		router.push(`/dashboard/ticket/${ComponentData._id}`);
	}

	var date = new Date(ComponentData.genratedOn);
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	var currentDate = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;

	const [ticketDate, setTicketDate] = useState(currentDate);
	const [ticketId, setTicketId] = useState(ComponentData._id);

	const [transactionType, setTransactionType] = useState(ComponentData.ticketType);
	const [productName, setProductName] = useState(ComponentData.productName || "");
	const [rate, setRate] = useState("");
	const [quantity, setQuantity] = useState("");
	const [quantityUnit, setQuantityUnit] = useState("");
	const [origin, setOrigin] = useState(ComponentData.origin || "");
	const [comment, setComment] = useState("");
	const [transactionWith, setTransactionWith] = useState("");
	const [salesPerson, setSalesPerson] = useState("");
	const [metAsiaDeal, setMetAsiaDeal] = useState(true);

	function deleteTicket() {
		const ticketDelete = {
			_id: ticketId,
			isDeleted: true,
		};
		updateTicket(ticketDelete)
			.then((ticket) => {
				setShowDeleteModal(false);
				if (ticket) {
					if (ticket.deleted) router.push(`/dashboard/ticket`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const modalSubmitHandler = (e) => {
		e.preventDefault();

		const transaction = {
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

		createTransaction(transaction)
			.then((transaction) => {
				if (transaction) {
					if (transaction.success) router.push(`/dashboard/transaction`);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		console.log("ticketId", ticketId);
		console.log("transactionType", transactionType);
		console.log("productName", productName);
		console.log("rate", rate);
		console.log("quantity", quantity);
		console.log("quantityUnit", quantityUnit);
		console.log("origin", origin);
		console.log("transactionWith", transactionWith);
		console.log("salesPerson", salesPerson);
		console.log("comment", comment);
		console.log("metAsiaDeal", metAsiaDeal);
	};
	return (
		<div className={type === "sales" ? "ticket-green" : "ticket-yellow"}>
			<div className={type === "sales" ? "ticket-header-green" : "ticket-header-yellow"}>
				<div className="flext flex-col">
					<h3 className="ticket-type">
						{ComponentData.ticketType === "sales" ? "Sales Offer" : "Requirement"}
					</h3>
					<p className="ticket-type text-base text-center font-bold">{ticketDate}</p>
				</div>
				<div className="flex flex-row justify-end">
					{data.role === "Admin" ? (
						<>
							<button
								className={type === "sales" ? "ticket-button-green" : "ticket-button-yellow"}
								onClick={() => setShowDeleteModal(true)}
							>
								<AiFillDelete />
							</button>
							<Modal
								visible={showDeleteModal}
								setVisible={setShowDeleteModal}
								className="w-2/6 h-2/6 relative"
							>
								<div className="absolute top-0 inset-x-0 px-6 pt-4 pb-0 bg-white">
									<div className="text-3xl flex justify-center items-center">
										<h2>Warning</h2>
									</div>

									<Separator className="my-2" />
								</div>
								<div className="flex flex-1 pt-12 max-h-full">
									<div className="w-full flex flex-wrap max-h-full overflow-auto items-center justify-center">
										<p className="text-xl text-center">
											Are You Sure You Really Want To Delete The Ticket!
										</p>
									</div>
								</div>
								<div className="flex flex-1 max-h-full">
									<div className="w-full flex flex-wrap max-h-full overflow-auto items-center justify-center">
										<button className="btn btn-primary px-10" onClick={() => deleteTicket()}>
											Yes
										</button>
										<button
											className="btn btn-primary px-10"
											onClick={() => setShowDeleteModal(false)}
										>
											No
										</button>
									</div>
								</div>
							</Modal>
						</>
					) : null}
					{data._id === ComponentData.genratedBy._id ||
					data.role === "Admin" ||
					(data.role === "SalesManager" && ComponentData.ticketType === "sales") ||
					(data.role === "PurchaseManager" && ComponentData.ticketType === "purchase") ? (
						<>
							<button
								className={type === "sales" ? "ticket-button-green" : "ticket-button-yellow"}
								onClick={() => getTicket()}
							>
								<FaPen />
							</button>
							<button
								className={type === "sales" ? "ticket-button-green" : "ticket-button-yellow"}
								onClick={() => setShowModal(true)}
							>
								{/* <FaRupeeSign /> */}
								<FaDollarSign />
							</button>
							<Modal visible={showModal} setVisible={setShowModal} className="w-4/6 h-5/6 relative">
								<div className="absolute top-0 inset-x-0 px-6 pt-4 pb-0 bg-white">
									<div className="text-3xl flex justify-between items-center">
										<h2>Add Transaction</h2>
										<button
											className={
												type === "sales" ? "ticket-button-green" : "ticket-button-yellow"
											}
											onClick={() => setShowModal(false)}
										>
											<GrClose />
										</button>
									</div>
									<Separator className="my-2" />
								</div>
								<div className="flex flex-1 pt-12 max-h-full">
									<div className="w-full flex flex-wrap max-h-full overflow-auto items-center justify-center">
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
													{/* <input
														className="field-text"
														type="text"
														name="quantityUnit"
														placeholder="Quantity Unit"
														value={quantityUnit}
														onChange={(e) => setQuantityUnit(e.target.value)}
													/> */}
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
														{CompaniesData.map((company, id) => {
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
														{UsersData.map((user, id) => {
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
									</div>
								</div>
							</Modal>
						</>
					) : null}
				</div>
			</div>
			<div className="ticket-body">
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Status:
					</span>{" "}
					{ComponentData.status === true ? "Active" : "In-active"}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Ticket Number:
					</span>{" "}
					{ComponentData.ticketNumber}
				</p>

				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Company:
					</span>{" "}
					{ComponentData.companyId.companyName}
				</p>

				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Product:
					</span>{" "}
					{ComponentData.productName}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Rate:
					</span>{" "}
					{ComponentData.rate}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Quantity:
					</span>{" "}
					{ComponentData.quantity}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Quantity Unit:
					</span>{" "}
					{ComponentData.quantityUnit}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Origin:
					</span>{" "}
					{ComponentData.origin}
				</p>
				{ComponentData.ticketType === "purchase" ? (
					<p className="ticket-data">
						<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
							Port:
						</span>{" "}
						{ComponentData.port}
					</p>
				) : null}
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Container Size:
					</span>{" "}
					{ComponentData.containerSize.join(" | ")}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Container Number:
					</span>{" "}
					{ComponentData.containerNumber}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Packing:
					</span>{" "}
					{formattedPacking}
				</p>
				<p className="ticket-data">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Genrated By:
					</span>{" "}
					{userName}
				</p>
				<p className="ticket-data pb-3">
					<span className={type === "sales" ? "ticket-data-title-green" : "ticket-data-title-yellow"}>
						Comments:
					</span>{" "}
					{ComponentData.comment}
				</p>
			</div>
		</div>
	);
};

export default Ticket;
