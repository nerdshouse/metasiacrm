import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SideBarItem({ text, icon, route, subMenuItems, className, isSubMenu }) {
	const router = useRouter();
	const isActive = route === router.route;
	const sideBarOpen = useSelector((state) => state.ui.sideBarOpen);
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(isActive);

	useEffect(() => {
		(async () => {
			subMenuItems &&
				subMenuItems.forEach((item) => {
					if (router.route.includes(item.route)) setIsSubMenuOpen(true);
				});
		})();
		return () => setIsSubMenuOpen(false);
	}, [router]);

	return (
		<Fragment>
			<Link href={route} passHref>
				<div
					className={`sidebar-item-container group ${
						isActive ? "sidebar-item-active" : isSubMenu ? "sub-menu-items" : ""
					} `}
				>
					<p className={`sidebar-item  ${className}`}>
						{icon}
						<span className="ml-2">{text}</span>
					</p>
					{!isActive && subMenuItems && <FloatingItems items={subMenuItems} sideBarOpen={sideBarOpen} />}
					{isSubMenu && !sideBarOpen && (
						<div className="floating-menu left-16">
							<span className="floating-menu-item mx-4 my-3">{text}</span>
						</div>
					)}
				</div>
			</Link>
			{isSubMenuOpen && subMenuItems && <SubMenu items={subMenuItems} />}
		</Fragment>
	);
}

export default SideBarItem;

const FloatingItems = ({ items, sideBarOpen }) => {
	return (
		<div className={`floating-menu ${sideBarOpen ? "left-64" : "left-16"}`}>
			{items.map(({ route, text, icon }, index) => (
				<Link href={route} passHref key={index.toString()}>
					<p className="floating-menu-item">
						{icon}
						<span className="mr-4">{text}</span>
					</p>
				</Link>
			))}
		</div>
	);
};

const SubMenu = ({ items }) => (
	<>
		{items.map(({ route, text, icon }, index) => (
			<SideBarItem route={route} icon={icon} text={text} key={index.toString()} className="scale-75" isSubMenu />
		))}
	</>
);
