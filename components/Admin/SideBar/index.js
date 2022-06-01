import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiPower } from "react-icons/fi";

import useActions from "../../../store/";
import SideBarItem from "./SideBarItem";

const Sidebar = ({ sideBarOpen, sideBarItems }) => {
	const { toggleSidebar } = useActions();

	return (
		<div className={`sidebar ${!sideBarOpen ? "w-16" : "w-64"}`}>
			<div className="sidebar-inner">
				<div>
					<Link href="/dashboard/companies" passHref>
						<div className={`logo`}>
							<span className={`logo-container`}>
								<div className="logo-img">
									<Image src="/metasia.png" height="48" width="48" alt="logo" />
								</div>
								Met Asia Group
							</span>
						</div>
					</Link>
					{sideBarItems.map(({ text, icon, route, subMenuItems }, index) => (
						<SideBarItem
							text={text}
							icon={icon}
							route={route}
							subMenuItems={subMenuItems}
							key={index.toString()}
						/>
					))}
				</div>
				<div>
					<div className={`sidebar-chevron-container`} onClick={() => toggleSidebar()}>
						<div className={`sidebar-chevron ${!sideBarOpen ? "rotate-180" : ""}`}>
							<FiChevronLeft />
						</div>
					</div>
					{/* <div className={`sidebar-chevron-container`} onClick={() => signOut()}>
						<div className={`sidebar-chevron`}>
							<FiPower />
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
