function TextInput({ name, id, onChange, value, placeholder, label, type }) {
	return (
		<div className="flex flex-1 flex-col ">
			<label htmlFor={name} className="m-1 font-semibold text-sm">
				{label}
			</label>
			<input
				type={type}
				className="bg-slate-800 text-white p-3 rounded-lg font-semibold"
				name={name}
				id={id}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default TextInput;
