function Error({ show, message }) {
	return <p className="font-semibold text-right text-red-600">{show && message}&nbsp;</p>;
}

export default Error;
