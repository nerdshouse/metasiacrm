import Link from "next/link";
import FilteringTable from "../../../components/Admin/FilteringTable";
import baseURL from "../../../lib/apis/Base";
import { ColumnFilter } from "../../../components/Admin/ColumnFilter";
import { useSession } from "next-auth/react";

function AllCompanies({ companies }) {
	const { data } = useSession();

	companies = companies.map((company) => {
		// console.log("sales", company.salesPerson?.map((salesPerson) => salesPerson.name).join(" | "));
		const suppliersForTable = companies
			.filter((Company) => {
				const indexOfCompany = company.suppliers.indexOf(Company._id);
				if (indexOfCompany >= 0) return true;
				return false;
			})
			.map((supplier) => ({ id: supplier._id, name: supplier.companyName }));
		const buyersForTable = companies
			.filter((Company) => {
				const indexOfCompany = company.buyers.indexOf(Company._id);
				if (indexOfCompany >= 0) return true;
				return false;
			})
			.map((buyer) => ({ id: buyer._id, name: buyer.companyName }));

		// const salesPersons = company.salesPerson.map((salesPerson) => salesPerson.name).join(" | ");
		return {
			...company,
			indianPort: company.indianPort.map((port) => port).join(" | "),
			Address: company.address[0] ? company.address[0].AddressLine : null,
			City: company.address[0] ? company.address[0].City : null,
			State: company.address[0] ? company.address[0].State : null,
			Country: company.address[0] ? company.address[0].Country : null,
			countryOfOrigin: company.countryOfOrigin.map((countryOfOrigin) => countryOfOrigin).join(" | "),
			products: company.products.map((products) => products).join(" | "),

			suppliers: suppliersForTable.map((supplier) => supplier.name).join(" | "),
			suppliersOriginal: suppliersForTable,

			buyers: buyersForTable.map((buyer) => buyer.name).join(" | "),
			buyersOriginal: buyersForTable,

			contactPersonName: company.contactPersons[0] ? company.contactPersons[0].contactPersonName : null,
			contactPersonDesignation: company.contactPersons[0]
				? company.contactPersons[0].contactPersonDesignation
				: null,
			contactPersonPhoneNumber: company.contactPersons[0]
				? company.contactPersons[0].contactPersonPhoneNumber[0]
				: null,
			contactPersonEmail: company.contactPersons[0] ? company.contactPersons[0].contactPersonEmail[0] : null,
			companyType: company.companyType === "BOTH" ? "BUYER | SUPPLIER" : company.companyType,
			API: company.API ? "Yes" : "No",
			bussinessCard: company.bussinessCard ? "Yes" : "No",
			metAsiaBuyer: company.metAsiaBuyer ? "Yes" : "No",
			metAsiaSupplier: company.metAsiaSupplier ? "Yes" : "No",

			salesPerson: company.salesPerson?.map((salesPerson) => salesPerson.name).join(" | "),
		};
	});
	return (
		<>
			<div>
				<h3 className="text-3xl mb-4">All Companies</h3>
				<FilteringTable columns={data.role === "Admin" ? Admincolumns : OtherRolecolumns} data={companies} />
			</div>
		</>
	);
}

export default AllCompanies;

const Admincolumns = [
	{
		Header: "Company Name",
		accessor: "companyName",
		Cell: ({ row, value }) => (
			<div className="flex flex-col">
				{<h4>{row.original.companyName}</h4>}
				<div className="ml-2">
					{/* <Link href={`/admin/posts/${row.original._id}`} passHref>
						<span className="link text-lg">{value}</span>
					</Link> */}
					<div className="flex flex-row items-center">
						{row.original.status ? (
							<div className="bg-green-600 h-3 w-3 mx-2 my-1 rounded-lg"></div>
						) : (
							<div className="bg-red-600 h-3 w-3 mx-2 my-1 rounded-lg"></div>
						)}

						<Link href={`/dashboard/companies/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Edit</span>
						</Link>
						{/* <Link href={`/blog/${row.original.slug}`} passHref>
							<span className="link text-xs mr-2">View</span>
						</Link> */}
						{/* <Link href={`/admin/posts/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Trash</span>
						</Link> */}
					</div>
				</div>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Name",
		accessor: "contactPersonName",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Contact Number",
		accessor: "contactPersonPhoneNumber",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Products",
		accessor: "products",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Sales Person",
		accessor: "salesPerson",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Country Of Origin",
		accessor: "countryOfOrigin",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "No Of Containers",
		accessor: "noOfContainers",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Average Containers",
		accessor: "avgContainers",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "IEC Number",
		accessor: "IECNumber",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Company Type",
		accessor: "companyType",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Suppliers",
		accessor: "suppliers",
		Cell: ({ row, value }) => (
			<div className="flex items-center">
				<h4>
					{row.original.suppliersOriginal.map((supplier) => (
						<Link href={`/dashboard/companies/${supplier.id}`} key={supplier.id} passHref>
							<p className="bg-primary-500 p-2 m-1 rounded-xl text-white w-fit hover:cursor-pointer">
								{supplier.name}
							</p>
						</Link>
					))}
				</h4>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Buyers",
		accessor: "buyers",
		Cell: ({ row, value }) => (
			<div className="flex items-center">
				<h4>
					{row.original.buyersOriginal.map((buyer) => (
						<Link href={`/dashboard/companies/${buyer.id}`} key={buyer.id} passHref>
							<p className="bg-primary-500 p-2 m-1 rounded-xl text-white w-fit hover:cursor-pointer">
								{buyer.name}
							</p>
						</Link>
					))}
				</h4>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Met Asia Buyer",
		accessor: "metAsiaBuyer",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Met Asia Supplier",
		accessor: "metAsiaSupplier",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Ports",
		accessor: "indianPort",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Address",
		accessor: "Address",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "City",
		accessor: "City",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "State",
		accessor: "State",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Country",
		accessor: "Country",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Email",
		accessor: "contactPersonEmail",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Designation",
		accessor: "contactPersonDesignation",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "API",
		accessor: "API",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Bussiness Card",
		accessor: "bussinessCard",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},

	// {
	// 	Header: "Visiblity",
	// 	accessor: "visible",
	// 	Cell: (cell) => {
	// 		const [visible, setVisible] = useState(cell.value === "Yes");
	// 		return (
	// 			<Toggle
	// 				checked={visible}
	// 				onChange={() => {
	// 					setVisible((state) => !state);
	// 					console.log(cell.row.original._id);
	// 					// update and change visiblity
	// 				}}
	// 			/>
	// 		);
	// 	},
	// },
];

const OtherRolecolumns = [
	{
		Header: "Company Name",
		accessor: "companyName",
		Cell: ({ row, value }) => (
			<div className="flex flex-col">
				{<h4>{row.original.companyName}</h4>}
				<div className="ml-2">
					{/* <Link href={`/admin/posts/${row.original._id}`} passHref>
						<span className="link text-lg">{value}</span>
					</Link> */}
					<div>
						{/* <Link href={`/dashboard/companies/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Edit</span>
						</Link> */}
						{/* <Link href={`/blog/${row.original.slug}`} passHref>
							<span className="link text-xs mr-2">View</span>
						</Link> */}
						{/* <Link href={`/admin/posts/${row.original._id}`} passHref>
							<span className="link text-xs mr-2">Trash</span>
						</Link> */}
					</div>
				</div>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Name",
		accessor: "contactPersonName",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Contact Number",
		accessor: "contactPersonPhoneNumber",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Products",
		accessor: "products",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	// {
	// 	Header: "Sales Person",
	// 	accessor: "salesPerson",
	// 	Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
	// 	Filter: ColumnFilter,
	// },
	{
		Header: "Country Of Origin",
		accessor: "countryOfOrigin",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "No Of Containers",
		accessor: "noOfContainers",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Average Containers",
		accessor: "avgContainers",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "IEC Number",
		accessor: "IECNumber",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Company Type",
		accessor: "companyType",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Suppliers",
		accessor: "suppliers",
		Cell: ({ row, value }) => (
			<div className="flex items-center">
				<h4>
					{row.original.suppliersOriginal.map((supplier) => (
						<Link href={`/dashboard/companies/${supplier.id}`} key={supplier.id} passHref>
							<p className="bg-primary-500 p-2 m-1 rounded-xl text-white w-fit hover:cursor-pointer">
								{supplier.name}
							</p>
						</Link>
					))}
				</h4>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Buyers",
		accessor: "buyers",
		Cell: ({ row, value }) => (
			<div className="flex items-center">
				<h4>
					{row.original.buyersOriginal.map((buyer) => (
						<Link href={`/dashboard/companies/${buyer.id}`} key={buyer.id} passHref>
							<p className="bg-primary-500 p-2 m-1 rounded-xl text-white w-fit hover:cursor-pointer">
								{buyer.name}
							</p>
						</Link>
					))}
				</h4>
			</div>
		),
		Filter: ColumnFilter,
	},
	{
		Header: "Met Asia Buyer",
		accessor: "metAsiaBuyer",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Met Asia Supplier",
		accessor: "metAsiaSupplier",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Ports",
		accessor: "indianPort",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Address",
		accessor: "Address",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "City",
		accessor: "City",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "State",
		accessor: "State",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Country",
		accessor: "Country",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Email",
		accessor: "contactPersonEmail",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Contact Person Designation",
		accessor: "contactPersonDesignation",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "API",
		accessor: "API",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},
	{
		Header: "Bussiness Card",
		accessor: "bussinessCard",
		Cell: ({ row, value }) => <div className="flex items-center">{<h4>{value}</h4>}</div>,
		Filter: ColumnFilter,
	},

	// {
	// 	Header: "Visiblity",
	// 	accessor: "visible",
	// 	Cell: (cell) => {
	// 		const [visible, setVisible] = useState(cell.value === "Yes");
	// 		return (
	// 			<Toggle
	// 				checked={visible}
	// 				onChange={() => {
	// 					setVisible((state) => !state);
	// 					console.log(cell.row.original._id);
	// 					// update and change visiblity
	// 				}}
	// 			/>
	// 		);
	// 	},
	// },
];

export const getServerSideProps = () => {
	return baseURL
		.get("/company")
		.then((res) => ({
			props: {
				companies: res.data.companies,
			},
		}))
		.catch((error) => {
			// console.log(error);
			return {
				props: { companies: [] },
			};
		});
};
