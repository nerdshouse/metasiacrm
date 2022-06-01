import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useActions from "../../store";
import Separator from "./Separator";

function Notice() {
	const [classes, setClasses] = useState("");
	const [inDom, setInDom] = useState(false);
	const notice = useSelector((state) => state.notice);

	const { clearNotice } = useActions();

	useEffect(() => {
		if (notice.type) {
			setInDom(true);
			setTimeout(() => setClasses(getClasses(notice.type)), 300);
		} else {
			setClasses(getClasses());
		}
	}, [notice, setInDom]);

	useEffect(() => {
		if (notice.type) {
			const cancleTimeOut = setTimeout(() => {
				clearNotice();
				setTimeout(() => {
					setInDom(false);
				}, 300);
			}, notice.duration);
			return () => {
				clearTimeout(cancleTimeOut);
			};
		}
	}, [clearNotice, notice]);

	return inDom ? (
		<div className={`notice ${classes}`}>
			<div className={`w-full text-2xl whitespace-nowrap font-semibold`}>{notice.title}</div>
			<Separator className="border-b-white/30 my-2" />
			{notice.description}
		</div>
	) : (
		<></>
	);
}
export default Notice;

const getClasses = (type) => {
	switch (type) {
		case "info":
			return "bg-cyan-500 translate-x-0 opacity-100";
		case "success":
			return "bg-green-500 translate-x-0 opacity-100";
		case "error":
			return "bg-red-600 translate-x-0 opacity-100";
		case "warning":
			return "bg-amber-400 translate-x-0 opacity-100";
		default:
			return "";
	}
};
