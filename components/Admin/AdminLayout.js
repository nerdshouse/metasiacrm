import { useSelector } from "react-redux";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegBuilding, FaUserTie, FaTicketAlt, FaRupeeSign } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { useRouter } from "next/router";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Card from "./Card";
import { useSession } from "next-auth/react";
import PageLoader from "../FormElements/PageLoader";

const AdminLayout = ({ children }) => {
	const sideBarOpen = useSelector((state) => state.ui.sideBarOpen);
	const { status } = useSession();
	const router = useRouter();
	const { data } = useSession();
	// console.log(data);

	if (status === "loading") return <PageLoader />;
	if (status === "unauthenticated") {
		router.push("/");
		return <PageLoader />;
	}

	return (
		<div className="relative h-screen w-screen">
			<SideBar
				sideBarOpen={sideBarOpen}
				sideBarItems={data.role === "Admin" ? AdminsideBarItems : OtherRolesideBarItems}
			/>
			<TopBar />
			<div
				className={`pt-16 w-full h-full transition-all ease-in-out duration-300 bg-[#e3eefc] ${
					!sideBarOpen ? "pl-16" : "pl-64"
				}`}
			>
				<div className="p-2 h-full">
					<Card className="h-full overflow-y-auto">{children}</Card>
				</div>
			</div>
		</div>
	);
};
export default AdminLayout;

const AdminsideBarItems = [
	{
		text: "Companies",
		icon: <FaRegBuilding className="sidebar-item-icon" />,
		route: "/dashboard/companies",
		subMenuItems: [
			{
				text: "Companies",
				icon: <FaRegBuilding className="sidebar-item-icon" />,
				route: "/dashboard/companies",
			},
			{
				text: "Add New Company",
				icon: <AiOutlinePlusCircle className="sidebar-item-icon" />,
				route: "/dashboard/companies/new",
			},
		],
	},
	{
		text: "Staff",
		icon: <FaUserTie className="sidebar-item-icon" />,
		route: "/dashboard/user",
		subMenuItems: [
			{
				text: "Staff",
				icon: <FaUserTie className="sidebar-item-icon" />,
				route: "/dashboard/user",
			},
			{
				text: "Add New Staff",
				icon: <AiOutlinePlusCircle className="sidebar-item-icon" />,
				route: "/dashboard/user/new",
			},
		],
	},
	{
		text: "Leads",
		icon: <FaTicketAlt className="sidebar-item-icon" />,
		route: "/dashboard/ticket",
		subMenuItems: [
			{
				text: "Leads",
				icon: <FaTicketAlt className="sidebar-item-icon" />,
				route: "/dashboard/ticket",
			},
			{
				text: "Add New Lead",
				icon: <AiOutlinePlusCircle className="sidebar-item-icon" />,
				route: "/dashboard/ticket/new",
			},
		],
	},
	{
		text: "Transactions",
		icon: <FaRupeeSign className="sidebar-item-icon" />,
		route: "/dashboard/transaction",
	},
	{
		text: "Reports",
		icon: <GoGraph className="sidebar-item-icon" />,
		route: "/dashboard/report/ticketReport",
		subMenuItems: [
			{
				text: "Ticket Report",
				icon: <FaTicketAlt className="sidebar-item-icon" />,
				route: "/dashboard/report/ticketReport",
			},
			{
				text: "Transaction Report",
				icon: <FaRupeeSign className="sidebar-item-icon" />,
				route: "/dashboard/report/transactionReport",
			},
		],
	},
];

const OtherRolesideBarItems = [
	{
		text: "Companies",
		icon: <FaRegBuilding className="sidebar-item-icon" />,
		route: "/dashboard/companies",
	},
	{
		text: "Tickets",
		icon: <FaTicketAlt className="sidebar-item-icon" />,
		route: "/dashboard/ticket",
		subMenuItems: [
			{
				text: "Tickets",
				icon: <FaTicketAlt className="sidebar-item-icon" />,
				route: "/dashboard/ticket",
			},
			{
				text: "Add New Ticket",
				icon: <AiOutlinePlusCircle className="sidebar-item-icon" />,
				route: "/dashboard/ticket/new",
			},
		],
	},
	{
		text: "Transactions",
		icon: <FaRupeeSign className="sidebar-item-icon" />,
		route: "/dashboard/transaction",
	},
	{
		text: "Reports",
		icon: <GoGraph className="sidebar-item-icon" />,
		route: "/dashboard/report/ticketReport",
		subMenuItems: [
			{
				text: "Ticket Report",
				icon: <FaTicketAlt className="sidebar-item-icon" />,
				route: "/dashboard/report/ticketReport",
			},
			{
				text: "Transaction Report",
				icon: <FaRupeeSign className="sidebar-item-icon" />,
				route: "/dashboard/report/transactionReport",
			},
		],
	},
];
