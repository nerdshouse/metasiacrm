function Button({ label, name, id }) {
	return (
		<div className="flex flex-1 flex-col w-[90%] px-2 py-1 mx-auto my-2">
			<button className="btn btn-primary" name={name} id={id}>
				{label}
			</button>
		</div>
	);
}

export default Button;
