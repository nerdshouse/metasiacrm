/* eslint-disable react/jsx-key */
import { useMemo, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination, useFilters } from "react-table";
import {
	BiChevronUp,
	BiChevronDown,
	BiChevronRight,
	BiChevronLeft,
	BiChevronsLeft,
	BiChevronsRight,
} from "react-icons/bi";
import * as XLSX from "xlsx";

const FilteringTable = ({ columns, data }) => {
	columns = useMemo(() => columns, [columns]);
	data = useMemo(() => data, [data]);

	const {
		getTableProps,
		getTableBodyProps,
		page,
		headerGroups,
		prepareRow,
		state,
		setGlobalFilter,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		filteredFlatRows,
		setAllFilters,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex } = state;
	// console.log("rows", filteredFlatRows);
	const exportExcel = () => {
		const fileName = "Filtered Data.xlsx";
		const ws = XLSX.utils.json_to_sheet(
			filteredFlatRows.map(
				(row) => row.values
				// row.values.salesPerson
				// 	? (row.values.salesPerson = row.values.salesPerson.map((user) => user.name).join(" | "))
				// 	: row.values
			)
		);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "output");
		XLSX.writeFile(wb, fileName);
	};

	return (
		<div className="-mt-12">
			<div className="flex justify-end px-4 mb-4">
				<div className="flex flex-col">
					<input
						type="text"
						name=""
						id=""
						className="text-input"
						placeholder="Search"
						value={globalFilter || ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
					/>
					<button className="btn btn-primary" onClick={() => setAllFilters([])}>
						Clear All
					</button>
				</div>
			</div>
			<div className="shadow-md rounded-xl overflow-hidden">
				<div className="overflow-x-auto">
					<table {...getTableProps()} className="w-full bg-white" id="filterdata">
						<thead className="bg-primary-500/10 shadow-md text-primary-500">
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((header) => (
										<th {...header.getHeaderProps(header.getSortByToggleProps())}>
											<div className="mx-4 my-2 text-center flex items-center justify-center">
												{header.render("Header")}
												<span>
													{header.isSorted ? (
														header.isSortedDesc ? (
															<BiChevronUp />
														) : (
															<BiChevronDown />
														)
													) : (
														""
													)}
												</span>
											</div>
											<div>{header.canFilter ? header.render("Filter") : null}</div>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								return (
									<tr
										{...row.getRowProps()}
										className="even:bg-primary-100/20 border-b-2 border-primary-100 last:border-b-0"
									>
										{row.cells.map((cell) => (
											<td
												{...cell.getCellProps()}
												className="border-r-2 last:border-0 border-primary-100 px-4 py-1"
											>
												{cell.render("Cell")}
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end px-4 py-2 text-2xl text-primary-500">
					<button className="btn btn-primary text-lg" onClick={() => exportExcel()}>
						Export Excel
					</button>
					<button
						className="p-1 rounded-full hover:bg-white transition-all duration-300 ease-in-out disabled:text-primary-500/50 disabled:hover:bg-transparent"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						<BiChevronsLeft />
					</button>
					<button
						className="p-1 rounded-full hover:bg-white transition-all duration-300 ease-in-out disabled:text-primary-500/50 disabled:hover:bg-transparent"
						onClick={previousPage}
						disabled={!canPreviousPage}
					>
						<BiChevronLeft />
					</button>
					<div className="flex items-center justify-center text-sm w-20">{`${pageIndex + 1} of ${
						pageOptions.length
					}`}</div>
					<button
						className="p-1 rounded-full hover:bg-white transition-all duration-300 ease-in-out disabled:text-primary-500/50 disabled:hover:bg-transparent"
						onClick={nextPage}
						disabled={!canNextPage}
					>
						<BiChevronRight />
					</button>
					<button
						className="p-1 rounded-full hover:bg-white transition-all duration-300 ease-in-out disabled:text-primary-500/50 disabled:hover:bg-transparent"
						onClick={() => gotoPage(pageOptions.length - 1)}
						disabled={!canNextPage}
					>
						<BiChevronsRight />
					</button>
				</div>
			</div>
		</div>
	);
};
export default FilteringTable;
