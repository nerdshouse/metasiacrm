import { useState } from "react";
import FileUploader from "../components/Forms/FileUploader";

const upload = () => {
	const [images, setImages] = useState([]);
	return (
		<>
			<FileUploader type="MRAI" displayValues={images} setDisplayValues={setImages} />
		</>
	);
};

export default upload;
