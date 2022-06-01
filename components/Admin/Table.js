/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import {
	BiChevronUp,
	BiChevronDown,
	BiChevronRight,
	BiChevronLeft,
	BiChevronsLeft,
	BiChevronsRight,
} from "react-icons/bi";

const Table = ({ columns, data }) => {
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
	} = useTable(
		{
			columns,
			data,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex } = state;
	return (
		<div className="-mt-12">
			<div className="flex justify-end px-4 mb-4">
				<input
					type="text"
					name=""
					id=""
					className="text-input"
					placeholder="Search"
					value={globalFilter || ""}
					onChange={(e) => setGlobalFilter(e.target.value)}
				/>
			</div>
			<div className="shadow-md rounded-xl overflow-hidden bg-primary-500/10">
				<div className="overflow-x-auto">
					<table {...getTableProps()} className="w-full bg-white">
						<thead className="bg-primary-500/10 shadow-md text-primary-500">
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((header) => (
										<th {...header.getHeaderProps(header.getSortByToggleProps())}>
											<div className="mx-4 my-2 text-left flex items-center">
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
export default Table;
