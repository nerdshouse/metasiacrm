import baseURL from "../../../lib/apis/Base";
import { useRouter } from "next/router";
import { BsPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import useActions from "../../../store";
import Toggle from "../../../components/Admin/Toggle";
import { toTitleCase } from "../../../lib/utils/services";
import { useSession } from "next-auth/react";
import FileUploader from "../../../components/Forms/FileUploader";

function CompanyProfile({ company, companies, users }) {
	// console.log("company", company);
	const { data } = useSession();

	useEffect(() => {
		if (data.role !== "Admin") {
			router.push(`/dashboard/companies`);
		}
	}, []);

	const { updateCompany } = useActions();
	const router = useRouter();

	const supplierCompanies = companies.filter(
		(Company) =>
			Company.companyName !== company.companyName &&
			(Company.companyType === "SUPPLIER" || Company.companyType === "BOTH")
	);
	const [allSuppliers, setAllSuppliers] = useState(
		supplierCompanies.map((obj) => ({ id: obj._id, name: obj.companyName }))
	);

	const buyerCompanies = companies.filter(
		(Company) =>
			Company.companyName !== company.companyName &&
			(Company.companyType === "BUYER" || Company.companyType === "BOTH")
	);
	const [allBuyers, setAllBuyers] = useState(buyerCompanies.map((obj) => ({ id: obj._id, name: obj.companyName })));

	const [companyID, setCompanyID] = useState(company._id);
	const [companyName, setCompanyName] = useState(company.companyName);
	const [IECNumber, setIECNumber] = useState(company.IECNumber);
	const [noOfContainers, setNoOfContainers] = useState(company.noOfContainers);
	const [avgContainers, setAvgContainers] = useState(company.avgContainers);
	const [addresses, setAddresses] = useState(company.address);
	const [contactPersons, setContactPersons] = useState(company.contactPersons || []);
	const [owners, setOwners] = useState(company.owners);

	const [buyers, setBuyers] = useState(
		companies
			.filter((Company) => {
				const indexOfCompany = company.buyers.indexOf(Company._id);
				if (indexOfCompany >= 0) return true;
				return false;
			})
			.map((buyer) => ({ id: buyer._id, name: buyer.companyName })) || []
	);

	const [suppliers, setSuppliers] = useState(
		companies
			.filter((Company) => {
				const indexOfCompany = company.suppliers.indexOf(Company._id);
				if (indexOfCompany >= 0) return true;
				return false;
			})
			.map((supplier) => ({ id: supplier._id, name: supplier.companyName })) || []
	);

	const [countryOfOriginOptions, setCountryOfOriginOption] = useState([
		"ALBANIA",
		"ALGERIA",
		"ANGOLA",
		"ANTARCTICA",
		"ARGENTINA",
		"ARUBA",
		"AUSTRALIA",
		"AUSTRIA",
		"BAHAMAS",
		"BAHRAIN",
		"BANGLADESH",
		"BARBADOS",
		"BELGIUM",
		"BELIZE",
		"BENIN",
		"BOLIVIA",
		"BOLIVIA, PLURINATIONAL STATE OF",
		"BOTSWANA",
		"BRAZIL",
		"BULGARIA",
		"CAMBODIA",
		"CANADA",
		"CAPE VERDE ISLANDS",
		"CENTRAL AFRICAN REPUBLIC",
		"CHILE",
		"CHINA",
		"COLOMBIA",
		"COMOROS",
		"CONGO",
		"CONGO, THE DEMOCRATIC REPUBLIC OF THE",
		"COSTA RICA",
		"COTE D IVOIRE",
		"CROATIA",
		"CUBA",
		"CYPRUS",
		"CZECH REPUBLIC",
		"DENMARK",
		"DJIBOUTI",
		"DOMINICA",
		"DOMINICAN REPUBLIC",
		"ECUADOR",
		"EGYPT",
		"EL SALVADOR",
		"EQUATORIAL GUINEA",
		"ESTONIA",
		"ETHIOPIA",
		"FIJI",
		"FINLAND",
		"FRANCE",
		"GABON",
		"GAMBIA",
		"GAUTEMALA",
		"GEORGIA",
		"GERMANY",
		"GHANA",
		"GREECE",
		"GUAM",
		"GUATEMALA",
		"GUINEA",
		"GUINEA BISSAU",
		"GUYANA",
		"HAITI",
		"HONDURAS",
		"HONG KONG",
		"HUNGARY",
		"ICELAND",
		"INDIA",
		"INDONESIA",
		"IRELAND",
		"ISRAEL",
		"ITALY",
		"JAMAICA",
		"JAPAN",
		"JORDAN",
		"KENYA",
		"KOREA, REPUBLIC OF",
		"KOREA,DEMOCRATIC PEOPLE'S REPUBLIC OF",
		"KUWAIT",
		"LAO, PEOPLE`S DEMOCRATIC REPUBLIC",
		"LATVIA",
		"LEBANON",
		"LIBERIA",
		"LIBYAN ARAB REPUBLIC",
		"LITHUANIA",
		"LUXEMBOURG",
		"MADAGASCAR",
		"MALAWI",
		"MALAYSIA",
		"MALDIVES",
		"MALI",
		"MALTA",
		"MARSHALL ISLANDS",
		"MARTINIQUE",
		"MAURITANIA",
		"MAURITIUS",
		"MAYOTTE",
		"MEXICO",
		"MOROCCO",
		"MOZAMBIQUE",
		"MYANMAR",
		"NAMBIA",
		"NEPAL",
		"NETHERLANDS",
		"NETHERLANDS ANTILLES",
		"NEW CALEDONIA",
		"NEW ZEALAND",
		"NICARAGUA",
		"NIGERIA",
		"NORTHERN MARIANA ISLANDS",
		"NORWAY",
		"OMAN",
		"PANAMA",
		"PAPUA NEW GUINEA",
		"PARAGUAY",
		"PERU",
		"PHILIPPINES",
		"POLAND",
		"PORTUGAL",
		"PUERTO RICO",
		"QATAR",
		"REUNION",
		"ROMANIA",
		"RUSSIA",
		"RUSSIAN FEDERATION",
		"SAINT LUCIA",
		"SAUDI ARABIA",
		"SENEGAL",
		"SEYCHELLES",
		"SIERRA LEONE",
		"SINGAPORE",
		"SLOVAK REPUBLIC",
		"SLOVAKIA",
		"SLOVENIA",
		"SOLOMON ISLANDS",
		"SOMALIA",
		"SOUTH AFRICA",
		"SPAIN",
		"SRI LANKA",
		"ST LUCIA",
		"SUDAN",
		"SURINAME",
		"SWAZILAND",
		"SWEDEN",
		"SWITZERLAND",
		"TAIWAN",
		"TAIWAN, PROVINCE OF CHINA",
		"TANZANIA",
		"TANZANIA, UNITED REPUBLIC OF",
		"THAILAND",
		"TOGO",
		"TRINIDAD AND TOBAGO",
		"TUNISIA",
		"TURKEY",
		"UKRAINE",
		"UNITED ARAB EMIRATES",
		"UNITED KINGDOM",
		"UNITED STATES",
		"URUGUAY",
		"VENEZUELA",
		"VENEZUELA, BOLIVARIAN REPUBLIC OF",
		"VIETNAM, DEMOCRATIC REP. OF",
		"VIETNAM, DEMOCRATIC REPUBLIC OF",
		"YEMEN, DEMOCRATIC",
		"ZAMBIA",
	]);
	const [indianPorts, setIndianPort] = useState([
		"ACC Ahmedabad (INAMD4)",
		"ACC Amritsar (INATQ4)",
		"ACC Bangalore (INBLR4)",
		"ACC Calicut (INCCJ4)",
		"ACC Chennai (INMAA4)",
		"ACC Cochin (INCOK4)",
		"ACC Delhi (INDEL4)",
		"ACC Goa (INGOI4)",
		"ACC Hyderabad (INHYD4)",
		"ACC Indore (INIDR4)",
		"ACC Jaipur (INJAI4)",
		"ACC Janori (INJNR4)",
		"ACC KANNUR (INCNN4)",
		"ACC Kolkata (INCCU4)",
		"ACC Sahar (INBOM4)",
		"ACC Trivandrun (INTRV4)",
		"Alang (INALA1)",
		"AMRITSAR RAIL CARGO (INASR2)",
		"AZHIKKAL PORT (INAZK1)",
		"BAIRGANIA (INBGUB)",
		"BALASORE Concor ICD (INBLE6)",
		"BANKOT PORT (INBKT1)",
		"Bedi Port (INBED1)",
		"BEHRNI LCS (INBNYB)",
		"BEYPORE PORT (INBEY1)",
		"Bhavnagar Port (INBHU1)",
		"BHIMNAGAR (INBNRB)",
		"BHITAMORE (INBTMB)",
		"BHUBANESWAR AIR CARGO (INBBI4)",
		"BIRPARA (INDLOB)",
		"CFS Albatross Inland Ports Pvt. Ltd. Dadri (INAPL6)",
		"CFS Mulund (INMUL6)",
		"CFS STARTRACK DADARI (INSTT6)",
		"CGM DADARI (INCPL6)",
		"PORT Chennai (INMAA1)",
		"PORT Cochin (INCOK1)",
		"PORT Goa (INMRM1)",
		"PORT Kakinada (INKAK1)",
		"PORT Kandla (INIXY1)",
		"PORT Kolkata (INCCU1)",
		"PORT Mangalore (INNML1)",
		"PORT Mundra (INMUN1)",
		"PORT Tuticorin (INTUT1)",
		"CHAMURCHI (INCHMB)",
		"CHANGRABANDHA (INCBDB)",
		"CONCOR DADARI (INDER6)",
		"CONCOR ICD, JHARSUGUDA (INJSG6)",
		"CSF Nashik (INNSK6)",
		"CUDDALORE PORT (INCDL1)",
		"Custom House Pondicherry (INPNY1)",
		"DABGRAM ICD (INNJP6)",
		"DABHOL PORT (INDHP1)",
		"Dahej Port (INDAH1)",
		"DESUR ICD (INDRU6)",
		"DHAHANU PORT (INDHU1)",
		"DHAMRA Port (INDMA1)",
		"Dharmatar Port, Mumbai (INDMT1)",
		"DIGHI PORT (INDIG1)",
		"FULBARI (INFBRB)",
		"GALGALIA (INGALB)",
		"Gangavaram Port (INGGV1)",
		"GOPALPUR PORT (INGPR1)",
		"GUWAHATI AIR CARGO (INGAU4)",
		"HALDIBARI RAILWAY STATION (INHLD2)",
		"Hazira Port, Surat (INHZA1)",
		"HTPL ICD Kilaraipur (INQRH6)",
		"ICD (GRF)Sahnewal Ludhiana (INSGF6)",
		"ICD (PSW) Dhandari Kalan Ludhiana (INDDL6)",
		"ICD ACC Coimbatore, Sriperumbudur (INCJB4)",
		"ICD Agra (INBLJ6)",
		"ICD Amingaon (INAMG6)",
		"ICD Ankaleshwar (INAKV6)",
		"ICD Arakkanom (INAJJ6)",
		"ICD BADDI (INBDI6)",
		"ICD Ballagharh (INFBD6)",
		"ICD Banglore (INWFD6)",
		"ICD BARHI (INRUG6)",
		"ICD Bawal (INBAW6)",
		"ICD BHAMBOLI (INGRW6)",
		"ICD Bhilwara (INBHL6)",
		"ICD Bhiwadi (INBWD6)",
		"ICD Bhusswal (INBSL6)",
		"ICD Borkhedi (INBOK6)",
		"ICD BUTIBORI (INNGB6)",
		"ICD Chakeri, Kanpur (INCPC6)",
		"ICD CHAWAPAYAL (INCPR6)",
		"ICD Cheherta (INASR6)",
		"ICD Chettipalayam (Tirpu) (INCHE6)",
		"ICD Chinchwad, Pune (INCCH6)",
		"ICD concor Jodhpur (INBGK6)",
		"ICD Concor Kanakpura, Jaipur (INKKU6)",
		"ICD DAPPAR (INDPR6)",
		"ICD Dashrath, Badodra (INBRC6)",
		"ICD Dhandari Kalan, Ludhiana (INLDH6)",
		"ICD DHANNAD (INDHA6)",
		"ICD Dighi (INDIG6)",
		"ICD Durgapur (INDUR6)",
		"ICD Faridabad(Sec-2) (INBVC6)",
		"ICD Gari Harasaru (INGHR6)",
		"ICD HASSAN (INHAS6)",
		"ICD Hosur (INHSU6)",
		"ICD Hyderabad (INSNF6)",
		"ICD Irugur (INIGU6)",
		"ICD Irungattukottai, Sriperumbudur (INILP6)",
		"ICD Jaipur (INJAI6)",
		"ICD Jalandhar (INJUC6)",
		"ICD JAMSHEDPUR (INIXW6)",
		"ICD Janori (INJNR6)",
		"ICD Jattipur (INDWN6)",
		"ICD JRY Kanpur (INKNU6)",
		"ICD KALINGANAGAR (INSKD6)",
		"ICD karur (INKAR6)",
		"ICD Kashipur (INHPI6)",
		"ICD KHATUWAS (INCML6)",
		"ICD KHEDA (INKHD6)",
		"ICD Khurja (INAIK6)",
		"ICD Kota (INKTT6)",
		"ICD kottayam (INKYM6)",
		"ICD KRIBHCO, Surat (INKBC6)",
		"ICD Loni (INLON6)",
		"ICD MALANPUR (INMPR6)",
		"ICD Maliwada (INMWA6)",
		"ICD Mandideep (INMDD6)",
		"ICD Marripalaem(Leap International Ltd.) (INGNR6)",
		"ICD MIHAN (INKPK6)",
		"ICD Nagpur (INNGP6)",
		"ICD Pakwara, Moradabad (INMBD6)",
		"ICD Pali, Rewari (INPKR6)",
		"ICD Palwal (INPWL6)",
		"ICD Panipat (INPNP6)",
		"ICD Panki (INPNK6)",
		"ICD Pantnagar (INHDD6)",
		"ICD Patli (INPTL6)",
		"ICD Patparganj (INPPG6)",
		"ICD Pimpri (INPMP6)",
		"ICD Pitampur (ININD6)",
		"ICD Piyala (INBFR6)",
		"ICD Powarkheda (INPRK6)",
		"ICD PULICHAPALLAM (INPNY6)",
		"ICD Raipur (INRAI6)",
		"ICD RAJSICO Basni, Jodhpur (INJUX6)",
		"ICD Ratlam (INRTM6)",
		"ICD Rewari (INREA6)",
		"ICD Sabarmati, Ahmedabad (INSBI6)",
		"ICD SACHANA (INJKA6)",
		"ICD Sachin (INSAC6)",
		"ICD Singanallur (INSLL6)",
		"ICD Surat Hira Bourse (INHIR6)",
		"ICD Talegaon, Pune (INTLG6)",
		"ICD Tarapur (INBNG6)",
		"ICD Thar Dry Port, Jodhpur (INTHA6)",
		"ICD Thar Dry Port, sanand (INSAU6)",
		"ICD Thimmapur (INTMX6)",
		"ICD Thudiyalur (INTDE6)",
		"ICD Tirupur/Paakiyapalayam (INTUP6)",
		"ICD Tondiapet (INTVT6)",
		"ICD Tuglakabad (INTKD6)",
		"ICD TUMB (INSAJ6)",
		"ICD Tuticorin (INTUT6)",
		"ICD Vapi (INVPI6)",
		"ICD Veerappandi (INTHO6)",
		"ICD VIRAMGAM (INVGR6)",
		"ICD Waluj, Aurangabad (INWAL6)",
		"ICD Wardha (INCHJ6)",
		"Jaigarh Port (INJGD1)",
		"JAJPUR ICD (INJJK6)",
		"JAKHAU PORT (INJAK1)",
		"JAMNAGAR AIR CARGO (INJGA4)",
		"JAYANAGAR (INJAYB)",
		"JNCH (INNSA1)",
		"Kamarajar Port (INENR1)",
		"KAMARDWISA LCS (INPBLB)",
		"KANEPORTICD/SAHNEWAL (INSNI6)",
		"KARAIKAL PORT Port (INKRK1)",
		"KARWAR PORT (INKRW1)",
		"Kattupalli Port (INKAT1)",
		"KELSHI PORT (INKSH1)",
		"KILARAIPUR ADANI ICD (INQRP6)",
		"KODINAR PORT (INKDN1)",
		"Kollam Port (INKUK1)",
		"Krishnapatnam Port (INKRI1)",
		"KUNAULI (INKNLB)",
		"LAUKAHA (INLKQB)",
		"LCS AGARTALA (INAGTB)",
		"LCS Attari Road (INATRB)",
		"LCS BANBASA (INBSAB)",
		"LCS DARRANGA (INDRGB)",
		"LCS DHARCHULA (INDLAB)",
		"LCS GHOJADANGA (INGJXB)",
		"LCS HILLI (INHLIB)",
		"LCS Jaigaon (INJIGB)",
		"LCS JHULAGHAT (INJHOB)",
		"LCS Jogbani (INJBNB)",
		"LCS KARIMGANJ (INKGJ1)",
		"LCS LOKSAN (INCRXB)",
		"LCS MAHADIPUR (INMHDB)",
		"LCS MOREH (INMREB)",
		"LCS MUHURIGHAT (INMHGB)",
		"LCS Nepalgunj Road (INNGRB)",
		"LCS Pertapole (INPTPB)",
		"LCS Raiganj (INRGJ2)",
		"LCS Raxaul (INRXLB)",
		"LCS SRIMANTAPUR (INSMPB)",
		"LCS Thoothibari (INNTVB)",
		"LUCKNOW AIR CARGO (INLKO4)",
		"MADHOSINGH ICD (INMBS6)",
		"MADURAI AIR CARGO (INIXM4)",
		"MADURAI KERN ICD (INMDU6)",
		"Magdalla Port (INMDA1)",
		"MANGALORE AIR CARGO (INIXE4)",
		"MODINAGAR ICD (INMUZ6)",
		"Nagapattinam (INNPT1)",
		"NAGPUR AIR CARGO (INNAG4)",
		"Navlakhi Port (INNAV1)",
		"NAYA RAIPUR CONCOR ICD (INRML6)",
		"NPORTMumbai (INBOM1)",
		"Okha Port (INOKH1)",
		"OLD MANGALORE PORT (INIXE1)",
		"OLD MUNDRA PORT (INOMU1)",
		"PANAJI PORT (INPAN1)",
		"PANITANKI (NAXALBAR) (INPNTB)",
		"Paradeep Port (INPRT1)",
		"PCCCC, Bandra-Kurla Complex (INDPC4)",
		"Pipavav Port (INPAV1)",
		"PIPRAUN (INKJIB)",
		"Porbandar Port (INPBD1)",
		"PORT BLAIR (INIXZ1)",
		"PUNE AIR CARGO (INPNQ4)",
		"RADHIKAPUR RAILWAY STATION (INRDP2)",
		"RANAGHAT RAILWAY STATION, NADIA (INRNG2)",
		"RANPAR PORT (INRNR1)",
		"REDI PORT (INRED1)",
		"REVDANDA PORT (INRVD1)",
		"SALAYA PORT, GUJRAT (INSAL1)",
		"SATTVA BENGALURU ICD (INKQZ6)",
		"SIKKA PORT (INSIK1)",
		"SINGHABAD RAILWAY STATION, MALDA (INSNG2)",
		"SONABARSA (INSNBB)",
		"SONAULI LCS (INSNLB)",
		"Sonepat ICD (INBDM6)",
		"SRINAGAR AIR CARGO (INSXR4)",
		"T.T SHED KIDDERPORE (INTTS1)",
		"Thrissur ICD (INTCR6)",
		"TIKONIA LCS (INTKNB)",
		"TIRUCHIRAPALLI AIR CARGO (INTRZ4)",
		"TRIDENT - DADARI (INTTP6)",
		"TUNA PORT (INTUN1)",
		"VADINAR PORT (INVAD1)",
		"VARANASI AIR CARGO (INVNS4)",
		"VERNA ICD (INMDG6)",
		"VIJAYDURG PORT (INVYD1)",
		"Vishakhapatnam Air Cargo (INVTZ4)",
		"Vizag Port (INVTZ1)",
		"VIZHINJAM PORT (INVZJ1)",
	]);
	const [products, setProduct] = useState([
		"AL FOIL",
		"AL FOIL TETRA",
		"AL ZORBA",
		"ALL",
		"ALL ALU",
		"ALL ALU CLEAN",
		"ALL LEAD",
		"ALLOY STEEL",
		"ALLOY TURNING",
		"ANELLO RASCHIATORE",
		"BRASS",
		"BRASS DRINK-IVORY",
		"BRASS EBONY",
		"BRASS HONEY",
		"BRASS LABEL",
		"BRASS NOMAD",
		"BRASS OCEAN",
		"BRASS PALLU",
		"BRASS SCRAP",
		"BRASS SCRAP PALES",
		"BRASS SCRAP PALLU",
		"BRASS SHREDDED",
		"BROKEN GLASS",
		"BUSHELLING STEEL",
		"CAKE SCRAP",
		"CAST IRON SCRAP",
		"CASTING SCRAPPER",
		"COPPER",
		"COPPER BARLEY",
		"COPPER BERRY-CANDY",
		"COPPER BIRCH-CLIFF",
		"COPPER CLOVE",
		"COPPER COBRA",
		"COPPER DREAM",
		"COPPER DRUID",
		"COPPER MILL BERRY",
		"COPPER NICKEL MIXED",
		"COPPER SCRAP",
		"CUPRO NICKEL",
		"DELETE",
		"DOUGH SCRAP",
		"ELECTRIC SCRAP",
		"FESTIVAL",
		"FOOT SCRAPER",
		"HMS",
		"INGOT",
		"IRON SCRAP",
		"IRON STEEL MIXED",
		"LEAD ACID BATTERY",
		"LEAD RACKS",
		"LEAD RADIO",
		"LEAD RAILS",
		"LEAD RAINS",
		"LEAD RELAY-CABLE",
		"LEAD ROPES",
		"LEAD SCRAP",
		"LMS",
		"LMS BUNDLE SCRAP",
		"LMS SCRAP",
		"MANGANESE STEEL",
		"MIL FINISHED",
		"MILD STEEL TURNING",
		"MIXED METAL SCRAP",
		"MOTOR",
		"MS SCRAP",
		"MS SHEET CUTTING",
		"MS STEEL",
		"MS TURNING",
		"NICKEL SCRAP",
		"OIL SCRAPPER RING",
		"OTHER SCRAP",
		"PART OF MACHINERY",
		"PLASTIC SCRAP",
		"PRECIOUS METAL",
		"REJECTED SCRAP ROLL",
		"RE-ROLLABLE STEEL",
		"SCRAPER BLADE",
		"SCRAPERS",
		"SHREDDED STEEL",
		"SILICON ELEC. STEEL",
		"SOAP SCRAP",
		"SS 200",
		"SS 201",
		"SS 202",
		"SS 204",
		"SS 206",
		"SS 2205",
		"SS 222",
		"SS 2304",
		"SS 2507",
		"SS 254",
		"SS 302",
		"SS 304",
		"SS 309",
		"SS 320",
		"SS 322",
		"SS 326",
		"SS 330",
		"SS 347",
		"SS 400",
		"SS 404",
		"SS 409",
		"SS 420",
		"SS 430",
		"SS 446",
		"SS 450",
		"SS 625",
		"SS 904",
		"SS A 286",
		"SS MELTING",
		"SS SCRAP",
		"SS ZURIC & SHREDDED STEEL",
		"STAFF",
		"TABLET",
		"TALIC",
		"TALK",
		"TALLY",
		"TALON",
		"TARRY",
		"TASSEL",
		"TASTE",
		"TATA",
		"TELIC",
		"TENSE",
		"TERSE",
		"TESLA",
		"THROB",
		"TITANIUM",
		"TOOTH",
		"TOTO",
		"TOUGH TABOO",
		"TREAD",
		"TROMA",
		"TRUMP",
		"TT",
		"TURNING & BORING",
		"TURNING MILLINGS",
		"TWANG",
		"TWITCH",
		"UBC",
		"UBC - TALCRED",
		"UBC - TALDORK",
		"USED RUBBER TYRE",
		"UTENCIL",
		"VERIFIED",
		"WASTE PAPER CRAFT",
		"WINDOW SCRAP",
		"WOODEN SCRAPER",
		"ZINC & DIE CAST",
		"ZINC SCRAP",
	]);
	const [MRAIs, setMRAI] = useState(
		company.MRAI || [{ MRAIName: "", MRAIPhoneNumber: "", MRAIEmail: "", MRAIsImages: [] }]
	);
	const [BMRDelegates, setBMRDelegate] = useState(
		company.BMRDelegates || [
			{ BMRDelegatesName: "", BMRDelegatesPhoneNumber: "", BMRDelegatesEmail: "", BMRDelegatesImages: [] },
		]
	);
	const [BNMAs, setBNMA] = useState(
		company.BNMA || [{ BNMAName: "", BNMAPhoneNumber: "", BNMAEmail: "", BNMAsImages: [] }]
	);

	const [selectedCountryOfOrigin, setSelectedCountryOfOrigin] = useState(company.countryOfOrigin);
	const [selectedIndianPort, setSelectedIndianPort] = useState(company.indianPort);
	const [selectedProduct, setSelectedProduct] = useState(company.products);

	const [APIVisible, setAPIVisible] = useState(company.API);
	const [SuppliersVisible, setSuppliersVisible] = useState(
		company.companyType === "SUPPLIER" || company.companyType === "BOTH"
	);
	const [BuyersVisible, setBuyersVisible] = useState(
		company.companyType === "BUYER" || company.companyType === "BOTH"
	);

	const [bussinessCard, setBussinessCard] = useState(company.bussinessCard);
	const [bussinessCardImages, setBussinessCardImages] = useState(company.bussinessCardImages || []);
	const [metAsiaBuyer, setMetAsiaBuyer] = useState(company.metAsiaBuyer);
	const [metAsiaSupplier, setMetAsiaSupplier] = useState(company.metAsiaSupplier);
	const [comments, setComments] = useState(company.comments);

	const [salesPersonOptions, setSalesPersonOptions] = useState(users);

	const [salesPerson, setSalesPerson] = useState(company.salesPerson || []);

	const [selectedSalesPerson, setSelectedSalesPerson] = useState([]);

	const [status, setStatus] = useState(company.status);

	useEffect(() => {
		setSelectedSalesPerson(salesPerson.map((person) => person._id));
	}, [salesPerson]);

	useEffect(() => {
		if (!SuppliersVisible || !BuyersVisible) {
			if (SuppliersVisible || !BuyersVisible) {
				setSuppliers([]);
			} else if (BuyersVisible || !SuppliersVisible) {
				setBuyers([]);
			}
		}
	}, [SuppliersVisible, BuyersVisible]);

	const updateHandler = (e) => {
		e.preventDefault();

		MRAIs.map((mrai) => {
			mrai.MRAIsImages = mrai.MRAIsImages.map((image) => image._id);
		});

		BMRDelegates.map((bmr) => {
			bmr.BMRDelegatesImages = bmr.BMRDelegatesImages.map((image) => image._id);
		});

		BNMAs.map((bnma) => {
			bnma.BNMAsImages = bnma.BNMAsImages.map((image) => image._id);
		});

		const companyType = "";
		if (SuppliersVisible && BuyersVisible) {
			companyType = "BOTH";
		} else if (SuppliersVisible) {
			companyType = "SUPPLIER";
		} else if (BuyersVisible) {
			companyType = "BUYER";
		}

		const updatedCompany = {
			_id: companyID,
			companyName,
			IECNumber,
			noOfContainers,
			avgContainers,
			salesPerson: selectedSalesPerson,
			companyType: companyType,
			API: APIVisible,
			bussinessCard,
			bussinessCardImages: bussinessCard === true ? bussinessCardImages.map((image) => image._id) : [],
			metAsiaBuyer,
			metAsiaSupplier,
			comments,
			address: addresses,
			contactPersons,
			owners,
			buyers: buyers.map((buyers) => buyers.id),
			suppliers: suppliers.map((supplier) => supplier.id),
			countryOfOrigin: selectedCountryOfOrigin,
			indianPort: selectedIndianPort,
			products: selectedProduct,
			MRAI: MRAIs,
			BMRDelegates,
			BNMA: BNMAs,
			status,
		};

		updateCompany(updatedCompany)
			.then((company) => {
				if (company) {
					if (company.success) router.push(`/dashboard/companies`);
				}
			})
			.catch((error) => console.log(error));

		// console.log("companyID", companyID);
		// console.log("companyName", companyName);
		// console.log("IECNumber", IECNumber);
		// console.log("noOfContainers", noOfContainers);
		// console.log("avgContainers", avgContainers);
		// console.log("salesPerson submit", selectedSalesPerson);
		// console.log("API", APIVisible);
		// console.log("bussinessCard", bussinessCard);
		// console.log("metAsiaBuyer", metAsiaBuyer);
		// console.log("metAsiaSupplier", metAsiaSupplier);
		// console.log("companyType", companyType);
		// console.log("Address", addresses);
		// console.log("contact Persons", contactPersons);
		// console.log("owners", owners);
		// console.log("buyers", buyers);
		// console.log("suppliers", suppliers);
		// console.log("origins", selectedCountryOfOrigin);
		// console.log("port", selectedIndianPort);
		// console.log("product", selectedProduct);
		// console.log("MRAI", MRAIs);
		// console.log("BMRDelegates", BMRDelegates);
		// console.log("BNMA", BNMAs);
	};
	//Input Handlers
	const handleAddressChangeInput = (index, event) => {
		const addressValues = [...addresses];
		addressValues[index][event.target.name] = toTitleCase(event.target.value || "");
		setAddresses(addressValues);
	};
	const handleContactPersonChangeInput = (index, event) => {
		const contactPersonValues = [...contactPersons];
		contactPersonValues[index][event.target.name] =
			event.target.name === "contactPersonName" || event.target.name === "contactPersonDesignation"
				? toTitleCase(event.target.value || "")
				: event.target.value;
		setContactPersons(contactPersonValues);
	};
	const handleContactPersonPhoneNumberChangeInput = (contactPersonIndex, phoneNumberIndex, event) => {
		// console.log(contactPersonIndex, event.target.name);
		const contactPersonValues = [...contactPersons];
		contactPersonValues[contactPersonIndex][event.target.name][phoneNumberIndex] = event.target.value; // console.log(contactPersonValues);
		setContactPersons([...contactPersonValues]);
		// console.log(contactPersons);
	};
	const handleContactPersonEmailChangeInput = (contactPersonIndex, emailIndex, event) => {
		// console.log(index, event.target.name);
		const contactPersonValues = [...contactPersons];
		contactPersonValues[contactPersonIndex][event.target.name][emailIndex] = event.target.value; // console.log(contactPersonValues);
		setContactPersons([...contactPersonValues]);
		// console.log(contactPersons);
	};
	const handleOwnerChangeInput = (index, event) => {
		const ownerValues = [...owners];
		ownerValues[index][event.target.name] = event.target.value =
			event.target.name === "ownerName" ? toTitleCase(event.target.value || "") : event.target.value;
		setOwners(ownerValues);
	};
	const handleOwnerPhoneNumberChangeInput = (ownerIndex, phoneNumberIndex, event) => {
		// console.log(contactPersonIndex, event.target.name);
		const ownerValues = [...owners];
		ownerValues[ownerIndex][event.target.name][phoneNumberIndex] = event.target.value; // console.log(contactPersonValues);
		setOwners([...ownerValues]);
		// console.log(owners);
	};
	const handleMRAIChangeInput = (index, event) => {
		const MRAIValues = [...MRAIs];
		MRAIValues[index][event.target.name] =
			event.target.name === "MRAIName" ? toTitleCase(event.target.value || "") : event.target.value;
		setMRAI(MRAIValues);
	};
	const handleMRAIImagesChangeInput = (MRAIIndex, value) => {
		const MRAIValues = [...MRAIs];
		MRAIValues[MRAIIndex]["MRAIsImages"] = value;
		setMRAI(MRAIValues);
		// console.log({ MRAIIndex, value });
	};

	const handleBMRDelegatesChangeInput = (index, event) => {
		const BMRDelegatesValues = [...BMRDelegates];
		BMRDelegatesValues[index][event.target.name] =
			event.target.name === "BMRDelegatesName" ? toTitleCase(event.target.value || "") : event.target.value;
		setBMRDelegate(BMRDelegatesValues);
	};
	const handleBMRDelegatesImagesChangeInput = (BMRDelegatesIndex, value) => {
		const BMRDelegatesValues = [...BMRDelegates];
		BMRDelegatesValues[BMRDelegatesIndex]["BMRDelegatesImages"] = value;
		setBMRDelegate(BMRDelegatesValues);
		// console.log({ BMRDelegatesIndex, value });
	};

	const handleBNMAChangeInput = (index, event) => {
		const BNMAValues = [...BNMAs];
		BNMAValues[index][event.target.name] =
			event.target.name === "BNMAName" ? toTitleCase(event.target.value || "") : event.target.value;
		setBNMA(BNMAValues);
	};
	const handleBNMAImagesChangeInput = (BNMAIndex, value) => {
		const BNMAValues = [...BNMAs];
		BNMAValues[BNMAIndex]["BNMAsImages"] = value;
		setBNMA(BNMAValues);
		// console.log({ BMRDelegatesIndex, value });
	};

	//Add Layout Methods
	const handleAddressAddFields = () => {
		setAddresses([...addresses, { AddressLine: "", City: "", State: "", Country: "" }]);
	};
	const handleContactPersonAddFields = () => {
		setContactPersons([
			...contactPersons,
			{
				contactPersonName: "",
				contactPersonDesignation: "",
				contactPersonPhoneNumber: [""],
				contactPersonEmail: [""],
			},
		]);
	};
	const handleContactPersonPhoneNumberAddFields = (index) => {
		contactPersons[index].contactPersonPhoneNumber.push("");
		setContactPersons([...contactPersons]);
	};
	const handleContactPersonEmailAddFields = (index) => {
		contactPersons[index].contactPersonEmail.push("");
		setContactPersons([...contactPersons]);
	};
	const handleOwnerAddFields = () => {
		setOwners([...owners, { ownerName: "", ownerEmail: "", ownerPhoneNumber: [""] }]);
	};
	const handleOwnerPhoneNumberAddFields = (index) => {
		owners[index].ownerPhoneNumber.push("");
		setOwners([...owners]);
	};
	const handleMRAIAddFields = () => {
		setMRAI([...MRAIs, { MRAIName: "", MRAIPhoneNumber: "", MRAIEmail: "", MRAIsImages: [] }]);
	};
	const handleBMRDelegatesAddFields = () => {
		setBMRDelegate([
			...BMRDelegates,
			{ BMRDelegatesName: "", BMRDelegatesPhoneNumber: "", BMRDelegatesEmail: "", BMRDelegatesImages: [] },
		]);
	};
	const handleBNMAAddFields = () => {
		setBNMA([...BNMAs, { BNMAName: "", BNMAPhoneNumber: "", BNMAEmail: "", BNMAsImages: [] }]);
	};

	//Remove Layout Methods
	const handleAddressRemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const addressValues = [...addresses];
			addressValues.splice(index, 1);
			setAddresses(addressValues);
		}
	};
	const handleContactPersonRemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const contactPersonValues = [...contactPersons];
			contactPersonValues.splice(index, 1);
			setContactPersons(contactPersonValues);
		}
	};
	const handleContactPersonPhoneNumberRemoveFields = (contactPersonIndex, phoneNumberIndex) => {
		// console.log(index);
		if (phoneNumberIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			contactPersons[contactPersonIndex].contactPersonPhoneNumber.splice(phoneNumberIndex, 1);
			setContactPersons([...contactPersons]);
		}
	};
	const handleContactPersonEmailRemoveFields = (contactPersonIndex, emailIndex) => {
		// console.log(index);
		if (emailIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			contactPersons[contactPersonIndex].contactPersonEmail.splice(emailIndex, 1);
			setContactPersons([...contactPersons]);
		}
	};
	const handleOwnerRemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const ownerValues = [...owners];
			ownerValues.splice(index, 1);
			setOwners(ownerValues);
		}
	};
	const handleOwnerPhoneNumberRemoveFields = (ownerIndex, phoneNumberIndex) => {
		// console.log(index);
		if (phoneNumberIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			owners[ownerIndex].ownerPhoneNumber.splice(phoneNumberIndex, 1);
			setOwners([...owners]);
		}
	};
	const handleMRAIRemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const MRAIValues = [...MRAIs];
			MRAIValues.splice(index, 1);
			setMRAI(MRAIValues);
		}
	};
	const handleBMRDelegatesRemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const BMRDelegatesValues = [...BMRDelegates];
			BMRDelegatesValues.splice(index, 1);
			setBMRDelegate(BMRDelegatesValues);
		}
	};
	const handleBNMARemoveFields = (index) => {
		// console.log(index);
		if (index !== 0) {
			const BNMAValues = [...BNMAs];
			BNMAValues.splice(index, 1);
			setBNMA(BNMAValues);
		}
	};

	//dropdown selection Methods
	const onOriginSelect = (selectedValue) => {
		setSelectedCountryOfOrigin(selectedValue);
	};
	const onOriginRemove = (selectedValue) => {
		setSelectedCountryOfOrigin(selectedValue);
	};
	const onPortSelect = (selectedValue) => {
		setSelectedIndianPort(selectedValue);
	};
	const onPortRemove = (selectedValue) => {
		setSelectedIndianPort(selectedValue);
	};
	const onProductSelect = (selectedValue) => {
		setSelectedProduct(selectedValue);
	};
	const onProductRemove = (selectedValue) => {
		setSelectedProduct(selectedValue);
	};
	const onBuyersSelect = (selectedValue) => {
		setBuyers(selectedValue);
	};
	const onBuyersRemove = (selectedValue) => {
		setBuyers(selectedValue);
	};
	const onSuppliersSelect = (selectedValue) => {
		setSuppliers(selectedValue);
	};
	const onSuppliersRemove = (selectedValue) => {
		setSuppliers(selectedValue);
	};
	const onSalesPersonSelect = (selectedValue) => {
		setSalesPerson(selectedValue);
	};
	const onSalesPersonRemove = (selectedValue) => {
		setSalesPerson(selectedValue);
	};
	return (
		<>
			<h1 className="title-mb">Update Company Details</h1>
			<form onSubmit={updateHandler}>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="companyName">
							Company Name
						</label>
						<input
							className="field-text"
							type="text"
							name="companyName"
							placeholder="Company Name"
							value={companyName}
							onChange={(e) => setCompanyName(toTitleCase(e.target.value || ""))}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="IECNumber">
							IEC Number
						</label>
						<input
							className="field-text"
							typr="text"
							name="IECNumber"
							placeholder="IEC Number"
							value={IECNumber}
							onChange={(e) => setIECNumber(e.target.value)}
						/>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="noOfContainers">
							No Of Containers
						</label>
						<input
							className="field-text"
							typr="text"
							name="noOfContainers"
							placeholder="No Of Containers"
							value={noOfContainers}
							onChange={(e) => setNoOfContainers(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="avgContainers">
							Avg Containers
						</label>
						<input
							className="field-text"
							typr="text"
							name="avgContainers"
							placeholder="Avg Containers"
							value={avgContainers}
							onChange={(e) => setAvgContainers(e.target.value)}
						/>
					</div>
				</div>
				<div className="group">
					<div className="w-full px-2">
						<label className="label" htmlFor="salesPerson">
							Sales Person
						</label>
						<Multiselect
							// isObject={false}
							className="field-text input_card"
							options={salesPersonOptions} // Options to display in the dropdown
							selectedValues={salesPerson}
							onSelect={(value) => onSalesPersonSelect(value)} // Function will trigger on select event
							onRemove={(value) => onSalesPersonRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="salesPerson"
						/>
						{/* <input
							className="field-text"
							typr="text"
							name="salesPerson"
							placeholder="Sales Person"
							value={salesPerson}
							onChange={(e) => setSalesPerson(toTitleCase(e.target.value || ""))}
						/> */}
					</div>
					<div className="form-group">
						<label className="label" htmlFor="companyType">
							Company Type
						</label>
						<div className="flex flex-row m-2">
							<Toggle
								checked={SuppliersVisible}
								onChange={setSuppliersVisible}
								label={<span className="text-lg m-2">Supplier</span>}
							/>
							<Toggle
								checked={BuyersVisible}
								onChange={setBuyersVisible}
								label={<span className="text-lg m-2">Buyer</span>}
							/>
						</div>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="API">
							API
						</label>
						<div className="flex flex-row m-2">
							<Toggle checked={APIVisible} onChange={setAPIVisible} />
						</div>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="metAsiaBuyer">
							Met Asia Buyer
						</label>
						<div className="flex flex-row m-2">
							<Toggle checked={metAsiaBuyer} onChange={setMetAsiaBuyer} />
						</div>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="metAsiaSupplier">
							Met Asia Supplier
						</label>
						<div className="flex flex-row m-2">
							<Toggle checked={metAsiaSupplier} onChange={setMetAsiaSupplier} />
						</div>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="bussinessCard">
							Bussiness Card
						</label>
						<div className="flex flex-row m-2">
							<Toggle checked={bussinessCard} onChange={setBussinessCard} />
						</div>
						{bussinessCard ? (
							<FileUploader
								type="BusinessCard"
								displayValues={bussinessCardImages}
								setDisplayValues={setBussinessCardImages}
							/>
						) : null}
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="comments">
							Comments
						</label>
						<textarea
							className="field-text"
							name="comments"
							placeholder="Comments"
							value={comments}
							onChange={(e) => setComments(toTitleCase(e.target.value || ""))}
						/>
					</div>
				</div>
				<div className="group">
					<div className="form-group w-full">
						<div className="label-section">
							<label className="label" htmlFor="address">
								Address
							</label>
						</div>
						{addresses.map((address, index) => (
							<div key={index.toString()} className="w-full">
								<div className="input_card">
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleAddressRemoveFields(index)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleAddressAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="AddressLine"
										placeholder="Address Line"
										value={address.AddressLine}
										onChange={(event) => handleAddressChangeInput(index, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="City"
										placeholder="City"
										value={address.City}
										onChange={(event) => handleAddressChangeInput(index, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="State"
										placeholder="State"
										value={address.State}
										onChange={(event) => handleAddressChangeInput(index, event)}
									/>
									<select
										className="field-text inner-fields"
										name="Country"
										value={address.Country}
										// onChange={(e) => setQuantityUnit(e.target.value)}
										onChange={(event) => handleAddressChangeInput(index, event)}
									>
										<option value="">Select The Country</option>
										{countryOfOriginOptions.map((country) => (
											<option key={country} value={country}>
												{country}
											</option>
										))}
									</select>
									{/* <input
										className="field-text inner-fields"
										typr="text"
										name="Country"
										placeholder="Country"
										value={address.Country}
										onChange={(event) => handleAddressChangeInput(index, event)}
									/> */}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="group">
					<div className="form-group w-full">
						<label className="label" htmlFor="contactPersons">
							Contact Persons
						</label>
						{contactPersons.map((contactPerson, contactPersonIndex) => (
							<div key={contactPersonIndex} className="w-full">
								<div className="input_card">
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleContactPersonRemoveFields(contactPersonIndex)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleContactPersonAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="contactPersonName"
										placeholder="Name"
										value={contactPerson.contactPersonName}
										onChange={(event) => handleContactPersonChangeInput(contactPersonIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="contactPersonDesignation"
										placeholder="Designation"
										value={contactPerson.contactPersonDesignation}
										onChange={(event) => handleContactPersonChangeInput(contactPersonIndex, event)}
									/>
									{contactPerson.contactPersonPhoneNumber.map((phoneNumber, phoneNumberIndex) => (
										<div
											className="flex flex-row justify-center items-center"
											key={phoneNumberIndex.toString()}
										>
											<input
												className="field-text inner-fields"
												typr="text"
												name="contactPersonPhoneNumber"
												placeholder="Phone Number"
												value={phoneNumber}
												onChange={(event) =>
													handleContactPersonPhoneNumberChangeInput(
														contactPersonIndex,
														phoneNumberIndex,
														event
													)
												}
											/>
											<div
												onClick={() =>
													handleContactPersonPhoneNumberRemoveFields(
														contactPersonIndex,
														phoneNumberIndex
													)
												}
											>
												<BsFillDashCircleFill size={24} color="red" className="m-1" />
											</div>
											<div
												onClick={() =>
													handleContactPersonPhoneNumberAddFields(
														contactPersonIndex,
														phoneNumberIndex
													)
												}
											>
												<BsPlusCircleFill size={24} color="green" className="m-1" />
											</div>
										</div>
									))}
									{contactPerson.contactPersonEmail.map((email, emailIndex) => (
										<div className="flex flex-row justify-center items-center" key={emailIndex}>
											<input
												className="field-text inner-fields"
												typr="text"
												name="contactPersonEmail"
												placeholder="Email"
												value={email}
												onChange={(event) =>
													handleContactPersonEmailChangeInput(
														contactPersonIndex,
														emailIndex,
														event
													)
												}
											/>
											<div
												onClick={() =>
													handleContactPersonEmailRemoveFields(contactPersonIndex, emailIndex)
												}
											>
												<BsFillDashCircleFill size={24} color="red" className="m-1" />
											</div>
											<div
												onClick={() =>
													handleContactPersonEmailAddFields(contactPersonIndex, emailIndex)
												}
											>
												<BsPlusCircleFill size={24} color="green" className="m-1" />
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="group">
					<div className="form-group w-full">
						<label className="label" htmlFor="owners">
							Owners
						</label>
						{owners.map((owner, ownerIndex) => (
							<div key={ownerIndex} className="w-full">
								<div className="input_card">
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleOwnerRemoveFields(ownerIndex)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleOwnerAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="ownerName"
										placeholder="Name"
										value={owner.ownerName}
										onChange={(event) => handleOwnerChangeInput(ownerIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="ownerEmail"
										placeholder="Email"
										value={owner.ownerEmail}
										onChange={(event) => handleOwnerChangeInput(ownerIndex, event)}
									/>
									{owner.ownerPhoneNumber.map((phoneNumber, phoneNumberIndex) => (
										<div
											className="flex flex-row justify-center items-center"
											key={phoneNumberIndex.toString()}
										>
											<input
												className="field-text inner-fields"
												typr="text"
												name="ownerPhoneNumber"
												placeholder="Phone Number"
												value={phoneNumber}
												onChange={(event) =>
													handleOwnerPhoneNumberChangeInput(
														ownerIndex,
														phoneNumberIndex,
														event
													)
												}
											/>
											<div
												onClick={() =>
													handleOwnerPhoneNumberRemoveFields(ownerIndex, phoneNumberIndex)
												}
											>
												<BsFillDashCircleFill size={24} color="red" className="m-1" />
											</div>
											<div
												onClick={() =>
													handleOwnerPhoneNumberAddFields(ownerIndex, phoneNumberIndex)
												}
											>
												<BsPlusCircleFill size={24} color="green" className="m-1" />
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="group mb-2">
					{SuppliersVisible ? (
						<div className="w-full px-2">
							<label className="label" htmlFor="buyers">
								Buyers
							</label>
							<Multiselect
								// isObject={false}
								className="field-text input_card"
								selectedValues={buyers}
								options={allBuyers} // Options to display in the dropdowns
								onSelect={(value) => onBuyersSelect(value)} // Function will trigger on select event
								onRemove={(value) => onBuyersRemove(value)} // Function will trigger on remove event
								displayValue="name" // Property name to display in the dropdown options
								name="buyers"
							/>
						</div>
					) : null}
					{BuyersVisible ? (
						<div className="w-full px-2">
							<label className="label" htmlFor="suppliers">
								Suppliers
							</label>
							<Multiselect
								// isObject={false}
								className="field-text input_card"
								selectedValues={suppliers}
								options={allSuppliers} // Options to display in the dropdown
								onSelect={(value) => onSuppliersSelect(value)} // Function will trigger on select event
								onRemove={(value) => onSuppliersRemove(value)} // Function will trigger on remove event
								displayValue="name" // Property name to display in the dropdown options
								name="suppliers"
							/>
						</div>
					) : null}
				</div>
				<div className="group">
					<div className="w-full px-2">
						<label className="label" htmlFor="countryOfOrigin">
							Country Of Origin
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							selectedValues={selectedCountryOfOrigin}
							options={countryOfOriginOptions} // Options to display in the dropdown
							onSelect={(value) => onOriginSelect(value)} // Function will trigger on select event
							onRemove={(value) => onOriginRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="countryOfOrigin"
						/>
					</div>
					<div className="w-full px-2">
						<label className="label" htmlFor="indianPort">
							Port
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							selectedValues={selectedIndianPort}
							options={indianPorts} // Options to display in the dropdown
							onSelect={(value) => onPortSelect(value)} // Function will trigger on select event
							onRemove={(value) => onPortRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="indianPort"
						/>
					</div>
					<div className="w-full px-2">
						<label className="label" htmlFor="products">
							Product(s)
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							selectedValues={selectedProduct}
							options={products} // Options to display in the dropdown
							onSelect={(value) => onProductSelect(value)} // Function will trigger on select event
							onRemove={(value) => onProductRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="products"
						/>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="MRAI">
							MRAI
						</label>
						{MRAIs.map((MRAI, MRAIIndex) => (
							<>
								<div className="input_card" key={MRAIIndex}>
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleMRAIRemoveFields(MRAIIndex)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleMRAIAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="MRAIName"
										placeholder="MRAI Name"
										value={MRAI.MRAIName}
										onChange={(event) => handleMRAIChangeInput(MRAIIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="MRAIPhoneNumber"
										placeholder="MRAI Phone Number"
										value={MRAI.MRAIPhoneNumber}
										onChange={(event) => handleMRAIChangeInput(MRAIIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="MRAIEmail"
										placeholder="MRAI Email"
										value={MRAI.MRAIEmail}
										onChange={(event) => handleMRAIChangeInput(MRAIIndex, event)}
									/>
									<FileUploader
										type="MRAI"
										displayValues={MRAI.MRAIsImages}
										setDisplayValues={(value) => handleMRAIImagesChangeInput(MRAIIndex, value)}
									/>
								</div>
							</>
						))}
					</div>

					<div className="form-group">
						<label className="label" htmlFor="BMRDelegates">
							BMR Delegates
						</label>
						{BMRDelegates.map((BMRDelegate, BMRDelegatesIndex) => (
							<>
								<div className="input_card" key={BMRDelegatesIndex}>
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleBMRDelegatesRemoveFields(BMRDelegatesIndex)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleBMRDelegatesAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BMRDelegatesName"
										placeholder="BMR Delegate Name"
										value={BMRDelegate.BMRDelegatesName}
										onChange={(event) => handleBMRDelegatesChangeInput(BMRDelegatesIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BMRDelegatesPhoneNumber"
										placeholder="BMR Delegate Phone Number"
										value={BMRDelegate.BMRDelegatesPhoneNumber}
										onChange={(event) => handleBMRDelegatesChangeInput(BMRDelegatesIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BMRDelegatesEmail"
										placeholder="BMR Delegate Email"
										value={BMRDelegate.BMRDelegatesEmail}
										onChange={(event) => handleBMRDelegatesChangeInput(BMRDelegatesIndex, event)}
									/>
									<FileUploader
										type="BMRDelegates"
										displayValues={BMRDelegate.BMRDelegatesImages}
										setDisplayValues={(value) =>
											handleBMRDelegatesImagesChangeInput(BMRDelegatesIndex, value)
										}
									/>
								</div>
							</>
						))}
					</div>
					<div className="form-group">
						<label className="label" htmlFor="BNMA">
							BNMA
						</label>
						{BNMAs.map((BNMA, BNMAIndex) => (
							<>
								<div className="input_card" key={BNMAIndex}>
									<div className="flex flex-row w-full items-end justify-end">
										<div onClick={() => handleBNMARemoveFields(BNMAIndex)}>
											<BsFillDashCircleFill size={24} color="red" className="m-1" />
										</div>
										<div onClick={() => handleBNMAAddFields()}>
											<BsPlusCircleFill size={24} color="green" className="m-1" />
										</div>
									</div>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BNMAName"
										placeholder="BNMA Name"
										value={BNMA.BNMAName}
										onChange={(event) => handleBNMAChangeInput(BNMAIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BNMAPhoneNumber"
										placeholder="BNMA Phone Number"
										value={BNMA.BNMAPhoneNumber}
										onChange={(event) => handleBNMAChangeInput(BNMAIndex, event)}
									/>
									<input
										className="field-text inner-fields"
										typr="text"
										name="BNMAEmail"
										placeholder="BNMA Email"
										value={BNMA.BNMAEmail}
										onChange={(event) => handleBNMAChangeInput(BNMAIndex, event)}
									/>
									<FileUploader
										type="BNMA"
										displayValues={BNMA.BNMAsImages}
										setDisplayValues={(value) => handleBNMAImagesChangeInput(BNMAIndex, value)}
									/>
								</div>
							</>
						))}
						{/* <input
							className="field-text"
							typr="text"
							name="BNMA"
							placeholder="BNMA"
							value={BNMA}
							onChange={(e) => setBNMA(e.target.value)}
						/> */}
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="status">
							Status
						</label>
						<div className="flex flex-row m-2">
							<Toggle checked={status} onChange={setStatus} />
						</div>
					</div>
				</div>
				<button className="btn btn-primary" type="submit" onClick={updateHandler}>
					Submit
				</button>
			</form>
		</>
	);
}

export default CompanyProfile;

export const getServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	try {
		const company = await baseURL.get(`/company/${id}`).then((res) => res.data.company);
		const companies = await baseURL.get(`/company`).then((res) => res.data.companies);
		const users = await baseURL
			.get(`/user`, { params: { role: "SalesPerson", status: true } })
			.then((res) => res.data.user);
		return {
			props: {
				company,
				companies,
				users,
			},
		};
	} catch (error) {
		console.log(error);
		return { props: {} };
	}
};
