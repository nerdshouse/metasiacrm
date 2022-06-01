import React from "react";

const UiFileInputButton = (props) => {
	const fileInputRef = React.useRef(null);
	const formRef = React.useRef(null);

	const onClickHandler = () => {
		fileInputRef.current?.click();
	};

	const onChangeHandler = (event) => {
		if (!event.target.files?.length) {
			return;
		}

		const formData = new FormData();

		Array.from(event.target.files).forEach((file) => {
			formData.append(event.target.name, file);
		});

		formData.append("type", props.type);

		// console.log(formRef.current, event.target.type);
		props.onChange(formData);

		formRef.current?.reset();
	};

	return (
		<form ref={formRef}>
			<button type="button" className="btn btn-primary w-full mx-auto" onClick={onClickHandler}>
				{props.label}
			</button>
			<input
				accept={props.acceptedFileTypes}
				multiple={props.allowMultipleFiles}
				name={props.uploadFileName}
				onChange={onChangeHandler}
				ref={fileInputRef}
				style={{ display: "none" }}
				type="file"
			/>
			<input type="hidden" name="type" value={props.type} />
		</form>
	);
};

UiFileInputButton.defaultProps = {
	acceptedFileTypes: "",
	allowMultipleFiles: false,
};

export default UiFileInputButton;
