import React from "react";

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;
	return (
		<span>
			<input
				className="column-filter"
				placeholder="Search"
				value={filterValue || ""}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</span>
	);
};
