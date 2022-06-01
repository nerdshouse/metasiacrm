import { FiPower } from "react-icons/fi";
import { useState } from "react";
import Modal from "../Tailwind/Modal";
import Separator from "../Tailwind/Separator";
import { signOut } from "next-auth/react";

const TopBar = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="topbar">
				<div className="topbar-items">
					<div className={`sidebar-chevron-container`} onClick={() => setShowModal(true)}>
						<div className={`sidebar-chevron`}>
							<FiPower />
						</div>
					</div>
				</div>
			</div>
			<Modal visible={showModal} setVisible={setShowModal} className="w-2/6 h-2/6 relative">
				<div className="absolute top-0 inset-x-0 px-6 pt-4 pb-0 bg-white">
					<div className="text-3xl flex justify-center items-center">
						<h2>Warning</h2>
					</div>

					<Separator className="my-2" />
				</div>
				<div className="flex flex-1 pt-12 max-h-full">
					<div className="w-full flex flex-wrap max-h-full overflow-auto items-center justify-center">
						<p className="text-xl text-center">Are You Sure You Really Want To Logout!</p>
					</div>
				</div>
				<div className="flex flex-1 max-h-full">
					<div className="w-full flex flex-wrap max-h-full overflow-auto items-center justify-center">
						<button className="btn btn-primary px-10" onClick={signOut}>
							Yes
						</button>
						<button className="btn btn-primary px-10" onClick={() => setShowModal(false)}>
							No
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};
export default TopBar;
