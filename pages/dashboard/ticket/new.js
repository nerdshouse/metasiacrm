import { useState } from "react";
import { toTitleCase } from "../../../lib/utils/services";
import Multiselect from "multiselect-react-dropdown";
import { useRouter } from "next/router";
import useActions from "../../../store";
import { useSession } from "next-auth/react";
import baseURL from "../../../lib/apis/Base";
import FileUploader from "../../../components/Forms/FileUploader";

function NewTicket({ buyerCompanies, supplierCompanies, bothCompanies }) {
	// console.log("buyerCompanies", buyerCompanies);
	// console.log("supplierCompanies", supplierCompanies);
	// console.log("bothCompanies", bothCompanies);
	const { createTicket } = useActions();
	const router = useRouter();
	const { data } = useSession();
	// console.log(data);

	const [tempRole, setRole] = useState(data.role);
	// console.log("tempRole", tempRole);
	const [companyId, setCompanyId] = useState("");
	const [port, setPort] = useState("");
	const [productName, setProductName] = useState("");
	const [rate, setRate] = useState("");
	const [quantity, setQuantity] = useState("");
	const [quantityUnit, setQuantityUnit] = useState("");
	const [origin, setOrigin] = useState("");
	const [comment, setComment] = useState("");
	const [containerSizeOptions, setcontainerSizeOptions] = useState([20, 40]);
	const [containerSize, setContainerSize] = useState("");
	const [containerNumber, setContainerNumber] = useState("");
	const [packingOptions, setPackingOptions] = useState([
		"LOOSE",
		"BRIQUETTED",
		"BALES",
		"SOFT BALES",
		"JUMBO BAGS",
		"PALLETS",
		"LOOSE IN BAGS",
		"LOT",
		"PACKAGES",
		"HRB BALES",
	]);
	const [packing, setPacking] = useState([]);
	const [ticketType, setTicketType] = useState(
		tempRole === "SalesManager" ? "sales" : tempRole === "PurchaseManager" ? "purchase" : ""
	);
	const [genratedBy, setGenratedBy] = useState(data._id);
	const [isDeleted, setIsDelete] = useState(false);

	const [productOptions, setProductOptions] = useState([
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
	const [countryOfOriginOptions, setCountryOfOriginOption] = useState([
		"AFGHANISTAN",
		"ALBANIA",
		"ALGERIA",
		"ANDORRA",
		"ANGOLA",
		"ANTIGUA AND BARBUDA",
		"ARGENTINA",
		"ARMENIA",
		"AUSTRALIA",
		"AUSTRIA",
		"AZERBAIJAN",
		"BAHAMAS",
		"BAHRAIN",
		"BANGLADESH",
		"BARBADOS",
		"BELARUS",
		"BELGIUM",
		"BELIZE",
		"BENIN",
		"BHUTAN",
		"BOLIVIA",
		"BOSNIA AND HERZEGOVINA",
		"BOTSWANA",
		"BRAZIL",
		"BRUNEI",
		"BULGARIA",
		"BURKINA FASO",
		"BURUNDI",
		"CÔTE D'IVOIRE",
		"CABO VERDE",
		"CAMBODIA",
		"CAMEROON",
		"CANADA",
		"CENTRAL AFRICAN REPUBLIC",
		"CHAD",
		"CHILE",
		"CHINA",
		"COLOMBIA",
		"COMOROS",
		"CONGO",
		"COSTA RICA",
		"CROATIA",
		"CUBA",
		"CYPRUS",
		"CZECHIA",
		"DEMOCRATIC REPUBLIC OF THE CONGO",
		"DENMARK",
		"DJIBOUTI",
		"DOMINICA",
		"DOMINICAN REPUBLIC",
		"ECUADOR",
		"EGYPT",
		"EL SALVADOR",
		"EQUATORIAL GUINEA",
		"ERITREA",
		"ESTONIA",
		"ESWATINI",
		"ETHIOPIA",
		"FIJI",
		"FINLAND",
		"FRANCE",
		"GABON",
		"GAMBIA",
		"GEORGIA",
		"GERMANY",
		"GHANA",
		"GREECE",
		"GRENADA",
		"GUATEMALA",
		"GUINEA",
		"GUINEA-BISSAU",
		"GUYANA",
		"HAITI",
		"HOLY SEE",
		"HONDURAS",
		"HUNGARY",
		"ICELAND",
		"INDIA",
		"INDONESIA",
		"IRAN",
		"IRAQ",
		"IRELAND",
		"ISRAEL",
		"ITALY",
		"JAMAICA",
		"JAPAN",
		"JORDAN",
		"KAZAKHSTAN",
		"KENYA",
		"KIRIBATI",
		"KUWAIT",
		"KYRGYZSTAN",
		"LAOS",
		"LATVIA",
		"LEBANON",
		"LESOTHO",
		"LIBERIA",
		"LIBYA",
		"LIECHTENSTEIN",
		"LITHUANIA",
		"LUXEMBOURG",
		"MADAGASCAR",
		"MALAWI",
		"MALAYSIA",
		"MALDIVES",
		"MALI",
		"MALTA",
		"MARSHALL ISLANDS",
		"MAURITANIA",
		"MAURITIUS",
		"MEXICO",
		"MICRONESIA",
		"MOLDOVA",
		"MONACO",
		"MONGOLIA",
		"MONTENEGRO",
		"MOROCCO",
		"MOZAMBIQUE",
		"MYANMAR",
		"NAMIBIA",
		"NAURU",
		"NEPAL",
		"NETHERLANDS",
		"NEW ZEALAND",
		"NICARAGUA",
		"NIGER",
		"NIGERIA",
		"NORTH KOREA",
		"NORTH MACEDONIA",
		"NORWAY",
		"OMAN",
		"PAKISTAN",
		"PALAU",
		"PALESTINE STATE",
		"PANAMA",
		"PAPUA NEW GUINEA",
		"PARAGUAY",
		"PERU",
		"PHILIPPINES",
		"PHILIPPINES",
		"PORTUGAL",
		"QATAR",
		"ROMANIA",
		"RUSSIA",
		"RWANDA",
		"SAINT KITTS AND NEVIS",
		"SAINT LUCIA",
		"SAINT VINCENT AND THE GRENADINES",
		"SAMOA",
		"SAN MARINO",
		"SAO TOME AND PRINCIPE",
		"SAUDI ARABIA",
		"SENEGAL",
		"SERBIA",
		"SEYCHELLES",
		"SIERRA LEONE",
		"SINGAPORE",
		"SLOVAKIA",
		"SLOVENIA",
		"SOLOMON ISLANDS",
		"SOMALIA",
		"SOUTH AFRICA",
		"SOUTH KOREA",
		"SOUTH SUDAN",
		"SPAIN",
		"SRI LANKA",
		"SUDAN",
		"SURINAME",
		"SWEDEN",
		"SWITZERLAND",
		"SYRIA",
		"TAJIKISTAN",
		"TANZANIA",
		"THAILAND",
		"TIMOR-LESTE",
		"TOGO",
		"TONGA",
		"TRINIDAD AND TOBAGO",
		"TUNISIA",
		"TURKEY",
		"TURKMENISTAN",
		"TUVALU",
		"UGANDA",
		"UKRAINE",
		"UNITED ARAB EMIRATES",
		"UNITED KINGDOM",
		"UNITED STATES OF AMERICA",
		"URUGUAY",
		"UZBEKISTAN",
		"VANUATU",
		"VENEZUELA",
		"VIETNAM",
		"YEMEN",
		"ZAMBIA",
		"ZIMBABWE",
	]);
	const [portOptions, setPortOptions] = useState([
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
	const [status, setStatus] = useState(true);
	const [productImages, setProductImages] = useState([]);

	const submitHandler = (e) => {
		e.preventDefault();

		const ticket = {
			productName,
			rate,
			quantity,
			quantityUnit,
			origin,
			comment,
			containerSize,
			containerNumber,
			packing,
			ticketType,
			genratedBy,
			isDeleted,
			companyId,
			port,
			status,
			productImages: productImages.map((image) => image._id),
		};

		createTicket(ticket)
			.then((ticket) => {
				if (ticket) {
					if (ticket.success) router.push(`/dashboard/ticket`);
				}
			})
			.catch((error) => {
				console.log(error);
			});

		console.log("productName", productName);
		console.log("rate", rate);
		console.log("quantity", quantity);
		console.log("quantityUnit", quantityUnit);
		console.log("origin", origin);
		console.log("comment", comment);
		console.log("containerSize", containerSize);
		console.log("packing", packing);
		console.log("ticketType", ticketType);
		console.log("genratedBy", genratedBy);
		console.log("isDeleted", isDeleted);
		console.log("companyId", companyId);
		console.log("port", port);
	};

	const onPackingSelect = (selectedValue) => {
		setPacking(selectedValue);
	};
	const onPackingRemove = (selectedValue) => {
		setPacking(selectedValue);
	};
	const onContainerSizeSelect = (selectedValue) => {
		setContainerSize(selectedValue);
	};
	const onContainerSizeRemove = (selectedValue) => {
		setContainerSize(selectedValue);
	};

	return (
		<>
			<h1 className="title-mb">Add New Lead</h1>
			<form onSubmit={submitHandler}>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="companyId">
							Company
						</label>
						{ticketType === "purchase" ? (
							<select
								className="field-text inner-fields"
								name="companyId"
								value={companyId}
								onChange={(e) => setCompanyId(e.target.value)}
							>
								<option value="">Select The Company</option>
								{buyerCompanies.map((company) => (
									<option key={company._id} value={company._id}>
										{company.companyName}
									</option>
								))}
								{bothCompanies.map((company) => (
									<option key={company._id} value={company._id}>
										{company.companyName}
									</option>
								))}
							</select>
						) : (
							<select
								className="field-text inner-fields"
								name="companyId"
								value={companyId}
								onChange={(e) => setCompanyId(e.target.value)}
							>
								<option value="">Select The Company</option>
								{supplierCompanies.map((company) => (
									<option key={company._id} value={company._id}>
										{company.companyName}
									</option>
								))}
								{bothCompanies.map((company) => (
									<option key={company._id} value={company._id}>
										{company.companyName}
									</option>
								))}
							</select>
						)}
					</div>
					{ticketType === "purchase" ? (
						<div className="form-group">
							<label className="label" htmlFor="port">
								Port
							</label>
							<select
								className="field-text inner-fields"
								name="port"
								value={port}
								onChange={(e) => setPort(e.target.value)}
							>
								<option value="">Select The Port</option>
								{portOptions.map((port) => (
									<option key={port} value={port}>
										{port}
									</option>
								))}
							</select>
						</div>
					) : null}
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="productName">
							Product Name
						</label>
						<select
							className="field-text inner-fields"
							name="productName"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						>
							<option value="">Select The Product</option>
							{productOptions.map((product) => (
								<option key={product} value={product}>
									{product}
								</option>
							))}
						</select>
						{/* <input
							className="field-text"
							type="text"
							name="productName"
							placeholder="Product Name"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/> */}
					</div>
					<div className="form-group">
						<label className="label" htmlFor="origin">
							Origin
						</label>
						<select
							className="field-text inner-fields"
							name="origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
						>
							<option value="">Select The Country</option>
							{countryOfOriginOptions.map((country) => (
								<option key={country} value={country}>
									{country}
								</option>
							))}
						</select>
						{/* <input
							className="field-text"
							type="text"
							name="origin"
							placeholder="Origin"
							value={origin}
							onChange={(e) => setOrigin(e.target.value)}
						/> */}
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="rate">
							Rate
						</label>
						<input
							className="field-text"
							type="text"
							name="rate"
							placeholder="Rate"
							value={rate}
							onChange={(e) => setRate(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="quantity">
							Quantity
						</label>
						<input
							className="field-text"
							type="text"
							name="quantity"
							placeholder="Quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="quantityUnit">
							Quantity Unit
						</label>
						<select
							className="field-text"
							name="quantityUnit"
							value={quantityUnit}
							onChange={(e) => setQuantityUnit(e.target.value)}
						>
							<option value="">Select The Quantity Unit</option>
							<option value="Metric Ton">Metric Ton</option>
							<option value="KG">KG</option>
						</select>
						{/* <input
							className="field-text"
							type="text"
							name="quantityUnit"
							placeholder="Quantity Unit"
							value={quantityUnit}
							onChange={(e) => setQuantityUnit(e.target.value)}
						/> */}
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="comment">
							Comment
						</label>
						<textarea
							className="field-text"
							name="comment"
							placeholder="Comment"
							value={comment}
							onChange={(e) => setComment(toTitleCase(e.target.value || ""))}
						/>
					</div>
				</div>
				<div className="group">
					<div className="w-full px-2">
						<label className="label" htmlFor="containerSize">
							Container Size
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							options={containerSizeOptions}
							onSelect={(value) => onContainerSizeSelect(value)}
							onRemove={(value) => onContainerSizeRemove(value)}
							displayValue="name"
							name="containerSize"
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="containerNumber">
							Container Number
						</label>
						<input
							className="field-text"
							type="text"
							name="containerNumber"
							placeholder="Container Number"
							value={containerNumber}
							onChange={(e) => setContainerNumber(e.target.value)}
						/>
					</div>
				</div>
				<div className="group">
					<div className="w-full px-2">
						<label className="label" htmlFor="packing">
							Packing
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							options={packingOptions} // Options to display in the dropdown
							onSelect={(value) => onPackingSelect(value)} // Function will trigger on select event
							onRemove={(value) => onPackingRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="packing"
						/>
					</div>
					<div className="form-group">
						<label className="label" htmlFor="ticketType">
							Lead Type
						</label>
						<select
							disabled={
								tempRole === "SalesManager" ? true : tempRole === "PurchaseManager" ? true : false
							}
							className="field-text"
							name="ticketType"
							value={ticketType}
							onChange={(e) => setTicketType(e.target.value)}
						>
							<option value="">Select The Lead Type</option>
							<option value="sales">Sales Offer</option>
							<option value="purchase">Requirement</option>
						</select>
					</div>
				</div>
				<div className="group">
					<div className="form-group">
						<label className="label" htmlFor="productImages">
							Product Images
						</label>
						<FileUploader type="Ticket" displayValues={productImages} setDisplayValues={setProductImages} />
					</div>
				</div>
				<button className="btn btn-primary" type="submit" onClick={submitHandler}>
					Submit
				</button>
			</form>
		</>
	);
}
export default NewTicket;

export const getServerSideProps = async () => {
	try {
		const buyerCompanies = await baseURL
			.get(`/company`, { params: { companyType: "BUYER" } })
			.then((res) => res.data.companies);
		const supplierCompanies = await baseURL
			.get(`/company`, { params: { companyType: "SUPPLIER" } })
			.then((res) => res.data.companies);
		const bothCompanies = await baseURL
			.get(`/company`, { params: { companyType: "BOTH" } })
			.then((res) => res.data.companies);
		return {
			props: {
				buyerCompanies,
				supplierCompanies,
				bothCompanies,
			},
		};
	} catch (err) {
		console.log(err);
		return {
			props: {
				buyerCompanies: [],
				supplierCompanies: [],
				bothCompanies: [],
			},
		};
	}
};
