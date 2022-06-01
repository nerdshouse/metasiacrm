import Image from "next/image";

function Loader({ show }) {
	return show ? <Image src="/svg/loader.svg" width="50" height="50" /> : null;
}

export default Loader;
