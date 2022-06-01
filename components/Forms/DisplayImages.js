import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const DisplayImages = ({ data, onDelete }) => {
	return (
		<>
			{/* <h1>Display Images</h1> */}
			<div className="flex flex-row overflow-x-scroll">
				{data.map((item) => (
					<div key={item._id} className="relative min-w-fit mr-2">
						<a href={`/uploads/${item.name}`} download>
							<img className="object-fill w-auto h-52" src={`/uploads/${item.name}`} alt="" />
						</a>
						<AiFillCloseCircle className="image-delete" onClick={() => onDelete(item._id)} />
					</div>
				))}
			</div>
		</>
	);
};

export default DisplayImages;
