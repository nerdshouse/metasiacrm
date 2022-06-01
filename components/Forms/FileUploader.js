import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "rc-progress";
import baseURL from "../../lib/apis/Base";

import UiFileInputButton from "./UiFileInputButton";
import DisplayImages from "./DisplayImages";

const IndexPage = ({ type, displayValues, setDisplayValues }) => {
	const [loader, setLoader] = useState(0);

	useEffect(() => {
		if (loader === 100) setLoader(0);
	}, [loader]);

	const onChange = async (formData) => {
		const config = {
			headers: { "content-type": "multipart/form-data" },
			onUploadProgress: (event) => {
				// console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
				setLoader(Math.round((event.loaded * 100) / event.total));
			},
		};

		try {
			const response = await axios.post("/api/uploads", formData, config);
			setDisplayValues([...response.data.images, ...displayValues]);
		} catch (e) {
			console.log({ e });
		}
	};

	const deleteImage = (id) => {
		baseURL
			.delete(`/images/${id}`)
			.then((res) => {
				setDisplayValues(displayValues.filter((item) => item._id !== id));
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<UiFileInputButton
				label="Upload Image"
				uploadFileName="image"
				type={type}
				onChange={onChange}
				allowMultipleFiles={true}
				// className="field-text inner-fields"
				// className="bg-primary-500 text-white p-2"
			/>
			{loader === 0 ? null : <Line percent={loader} strokeWidth={1} strokeColor="#144990" />}
			{displayValues.length === 0 ? null : <DisplayImages data={displayValues} onDelete={deleteImage} />}
		</>
	);
};

export default IndexPage;
