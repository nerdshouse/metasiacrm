import { useRouter } from "next/router";
import { BsPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import useActions from "../../../store";
import Toggle from "../../../components/Admin/Toggle";
import { toTitleCase } from "../../../lib/utils/services";
import baseURL from "../../../lib/apis/Base";
import { useSession } from "next-auth/react";
import FileUploader from "../../../components/Forms/FileUploader";

function NewCompany({ users }) {
	const { createCompany } = useActions();
	const router = useRouter();
	const { data } = useSession();

	useEffect(() => {
		if (data.role !== "Admin") {
			router.push(`/dashboard/companies`);
		}
	}, []);

	const [companyName, setCompanyName] = useState("");
	const [IECNumber, setIECNumber] = useState("");
	const [noOfContainers, setNoOfContainers] = useState("");
	const [avgContainers, setAvgContainers] = useState("");
	const [addresses, setAddresses] = useState([{ AddressLine: "", City: "", State: "", Country: "" }]);
	const [contactPersons, setContactPersons] = useState([
		{
			contactPersonName: "",
			contactPersonDesignation: "",
			contactPersonPhoneNumber: [""],
			contactPersonEmail: [""],
		},
	]);
	const [owners, setOwners] = useState([{ ownerName: "", ownerEmail: "", ownerPhoneNumber: [""] }]);
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
	const [MRAIs, setMRAI] = useState([{ MRAIName: "", MRAIPhoneNumber: "", MRAIEmail: "", MRAIsImages: [] }]);
	// const [MRAIsImages, setMRAIsImages] = useState([]);
	// console.log("MRAIs", MRAIs);
	const [BMRDelegates, setBMRDelegate] = useState([
		{ BMRDelegatesName: "", BMRDelegatesPhoneNumber: "", BMRDelegatesEmail: "", BMRDelegatesImages: [] },
	]);
	// console.log("BMRDelegates", BMRDelegates);
	// const [BMRDelegatesImages, setBMRDelegatesImages] = useState([]);

	const [BNMAs, setBNMA] = useState([{ BNMAName: "", BNMAPhoneNumber: "", BNMAEmail: "", BNMAsImages: [] }]);
	// console.log("BNMAs", BNMAs);
	// const [BNMAsImages, setBNMAsImages] = useState([]);

	const [selectedCountryOfOrigin, setSelectedCountryOfOrigin] = useState([]);
	const [selectedIndianPort, setSelectedIndianPort] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState([]);

	const [APIVisible, setAPIVisible] = useState(false);
	const [SuppliersVisible, setSuppliersVisible] = useState(false);
	const [BuyersVisible, setBuyersVisible] = useState(false);

	const [bussinessCard, setBussinessCard] = useState(false);
	const [bussinessCardImages, setBussinessCardImages] = useState([]);
	const [metAsiaBuyer, setMetAsiaBuyer] = useState(false);
	const [metAsiaSupplier, setMetAsiaSupplier] = useState(false);
	const [comments, setComments] = useState("");

	const [salesPersonOptions, setSalesPersonOptions] = useState(users);
	const [salesPerson, setSalesPerson] = useState([]);
	const [status, setStatus] = useState(true);

	const submitHandler = (e) => {
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

		// bussinessCard === true ? bussinessCardImages.map((image) => image._id) : [];
		// bussinessCardImages.map((image) => {
		// 	image = image._id;
		// });

		const companyType = "";
		if (SuppliersVisible && BuyersVisible) {
			companyType = "BOTH";
		} else {
			if (SuppliersVisible) {
				companyType = "SUPPLIER";
			} else if (BuyersVisible) {
				companyType = "BUYER";
			} else if (!SuppliersVisible && !BuyersVisible) {
				companyType = "";
			} else {
				companyType = "BOTH";
			}
		}

		const company = {
			companyName,
			IECNumber,
			noOfContainers,
			avgContainers,
			salesPerson,
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
			countryOfOrigin: selectedCountryOfOrigin,
			indianPort: selectedIndianPort,
			products: selectedProduct,
			MRAI: MRAIs,
			// MRAIsImages: selectedMRAIsImages,
			BMRDelegates,
			// BMRDelegatesImages: selectedBMRDelegatesImages,
			BNMA: BNMAs,
			// BNMAsImages: selectedBNMAsImages,
			status,
		};
		// console.log(company);
		createCompany(company)
			.then((company) => {
				if (company) {
					if (company.success) router.push(`/dashboard/companies`);
				}
			})
			.catch((error) => console.log(error));

		// console.log("companyName", companyName);
		// console.log("IECNumber", IECNumber);
		// console.log("noOfContainers", noOfContainers);
		// console.log("avgContainers", avgContainers);
		// console.log("salesPerson", salesPerson);
		// console.log("API", APIVisible);

		// console.log("bussinessCard", bussinessCard);
		// console.log("bussinessCardImages", selectedBussinessCardImages);

		// console.log("metAsiaBuyer", metAsiaBuyer);
		// console.log("metAsiaSupplier", metAsiaSupplier);
		// console.log("companyType", companyType);
		// console.log("Address", addresses);
		// console.log("contact Persons", contactPersons);
		// console.log("owners", owners);
		// console.log("origins", selectedCountryOfOrigin);
		// console.log("port", selectedIndianPort);
		// console.log("product", selectedProduct);
		// console.log("submit MRAI", MRAIs);
		// console.log("MRAIsImages", selectedMRAIsImages);

		// console.log("BMRDelegates", BMRDelegates);
		// console.log("BMRDelegatesImages", selectedBMRDelegatesImages);

		// console.log("BNMA", BNMAs);
		// console.log("BNMAsImages", selectedBNMAsImages);
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
		const contactPersonValues = [...contactPersons];
		contactPersonValues[contactPersonIndex][event.target.name][phoneNumberIndex] = event.target.value;
		setContactPersons([...contactPersonValues]);
	};
	const handleContactPersonEmailChangeInput = (contactPersonIndex, emailIndex, event) => {
		const contactPersonValues = [...contactPersons];
		contactPersonValues[contactPersonIndex][event.target.name][emailIndex] = event.target.value;
		setContactPersons([...contactPersonValues]);
	};
	const handleOwnerChangeInput = (index, event) => {
		const ownerValues = [...owners];
		ownerValues[index][event.target.name] = event.target.value =
			event.target.name === "ownerName" ? toTitleCase(event.target.value || "") : event.target.value;
		setOwners(ownerValues);
	};
	const handleOwnerPhoneNumberChangeInput = (ownerIndex, phoneNumberIndex, event) => {
		const ownerValues = [...owners];
		ownerValues[ownerIndex][event.target.name][phoneNumberIndex] = event.target.value;
		setOwners([...ownerValues]);
	};
	const handleMRAIChangeInput = (MRAIIndex, event) => {
		const MRAIValues = [...MRAIs];
		MRAIValues[MRAIIndex][event.target.name] =
			event.target.name === "MRAIName" ? toTitleCase(event.target.value || "") : event.target.value;
		setMRAI(MRAIValues);
	};

	const handleMRAIImagesChangeInput = (MRAIIndex, value) => {
		const MRAIValues = [...MRAIs];
		MRAIValues[MRAIIndex]["MRAIsImages"] = value;
		setMRAI(MRAIValues);
		// console.log({ MRAIIndex, value });
	};

	const handleBMRDelegatesChangeInput = (BMRDelegatesIndex, event) => {
		const BMRDelegatesValues = [...BMRDelegates];
		BMRDelegatesValues[BMRDelegatesIndex][event.target.name] =
			event.target.name === "BMRDelegatesName" ? toTitleCase(event.target.value || "") : event.target.value;
		setBMRDelegate(BMRDelegatesValues);
	};

	const handleBMRDelegatesImagesChangeInput = (BMRDelegatesIndex, value) => {
		const BMRDelegatesValues = [...BMRDelegates];
		BMRDelegatesValues[BMRDelegatesIndex]["BMRDelegatesImages"] = value;
		setBMRDelegate(BMRDelegatesValues);
		// console.log({ BMRDelegatesIndex, value });
	};

	const handleBNMAChangeInput = (BNMAIndex, event) => {
		const BNMAValues = [...BNMAs];
		BNMAValues[BNMAIndex][event.target.name] =
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
		if (index !== 0) {
			const addressValues = [...addresses];
			addressValues.splice(index, 1);
			setAddresses(addressValues);
		}
	};
	const handleContactPersonRemoveFields = (index) => {
		if (index !== 0) {
			const contactPersonValues = [...contactPersons];
			contactPersonValues.splice(index, 1);
			setContactPersons(contactPersonValues);
		}
	};
	const handleContactPersonPhoneNumberRemoveFields = (contactPersonIndex, phoneNumberIndex) => {
		if (phoneNumberIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			contactPersons[contactPersonIndex].contactPersonPhoneNumber.splice(phoneNumberIndex, 1);
			setContactPersons([...contactPersons]);
		}
	};
	const handleContactPersonEmailRemoveFields = (contactPersonIndex, emailIndex) => {
		if (emailIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			contactPersons[contactPersonIndex].contactPersonEmail.splice(emailIndex, 1);
			setContactPersons([...contactPersons]);
		}
	};
	const handleOwnerRemoveFields = (index) => {
		if (index !== 0) {
			const ownerValues = [...owners];
			ownerValues.splice(index, 1);
			setOwners(ownerValues);
		}
	};
	const handleOwnerPhoneNumberRemoveFields = (ownerIndex, phoneNumberIndex) => {
		if (phoneNumberIndex !== 0) {
			// const phoneNumberValues = [...contactPersons];
			// phoneNumberValues.splice(index, 1);
			owners[ownerIndex].ownerPhoneNumber.splice(phoneNumberIndex, 1);
			setOwners([...owners]);
		}
	};
	const handleMRAIRemoveFields = (index) => {
		if (index !== 0) {
			const MRAIValues = [...MRAIs];
			MRAIValues.splice(index, 1);
			setMRAI(MRAIValues);
		}
	};

	const handleBMRDelegatesRemoveFields = (index) => {
		if (index !== 0) {
			const BMRDelegatesValues = [...BMRDelegates];
			BMRDelegatesValues.splice(index, 1);
			setBMRDelegate(BMRDelegatesValues);
		}
	};
	const handleBNMARemoveFields = (index) => {
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
	const onSalesPersonSelect = (selectedValue) => {
		setSalesPerson(selectedValue);
	};
	const onSalesPersonRemove = (selectedValue) => {
		setSalesPerson(selectedValue);
	};
	return (
		<>
			<h1 className="title-mb">Add New Company</h1>
			<form onSubmit={submitHandler}>
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
							// onSelect={(value) => console.log(value.map((value) => value._id))} // Function will trigger on select event
							// onRemove={(value) => console.log(value.map((value) => value._id))} // Function will trigger on remove event
							onSelect={(value) => onSalesPersonSelect(value.map((value) => value._id))} // Function will trigger on select event
							onRemove={(value) => onSalesPersonRemove(value.map((value) => value._id))} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="salesPerson"
						/>
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
						<div className="flex flex-row items-center m-2">
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
							<>
								<div className="input_card" key={index}>
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
							</>
						))}
					</div>
				</div>
				<div className="group">
					<div className="form-group w-full">
						<label className="label" htmlFor="contactPersons">
							Contact Persons
						</label>
						{contactPersons.map((contactPerson, contactPersonIndex) => (
							<>
								<div className="input_card" key={contactPersonIndex}>
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
										<div
											className="flex flex-row justify-center items-center"
											key={emailIndex.toString()}
										>
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
							</>
						))}
					</div>
				</div>
				<div className="group">
					<div className="form-group w-full">
						<label className="label" htmlFor="owners">
							Owners
						</label>
						{owners.map((owner, ownerIndex) => (
							<>
								<div className="input_card" key={ownerIndex}>
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
							</>
						))}
					</div>
				</div>
				<div className="group">
					<div className="w-full px-2">
						<label className="label" htmlFor="countryOfOrigin">
							Country Of Origin
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
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
							options={indianPorts} // Options to display in the dropdown
							onSelect={(value) => onPortSelect(value)} // Function will trigger on select event
							onRemove={(value) => onPortRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="indianPort"
						/>
						{/* <input className="field-text" typr="text" name="indianPort" placeholder="indianPort" /> */}
					</div>
					<div className="w-full px-2">
						<label className="label" htmlFor="products">
							Product(s)
						</label>
						<Multiselect
							isObject={false}
							className="field-text input_card"
							options={products} // Options to display in the dropdown
							onSelect={(value) => onProductSelect(value)} // Function will trigger on select event
							onRemove={(value) => onProductRemove(value)} // Function will trigger on remove event
							displayValue="name" // Property name to display in the dropdown options
							name="products"
						/>
						{/* <input className="field-text" typr="text" name="products" placeholder="Product" /> */}
					</div>
				</div>
				<div className="group items-start">
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
					</div>
				</div>
				<button className="btn btn-primary" type="submit" onClick={submitHandler}>
					Submit
				</button>
			</form>
		</>
	);
}
export default NewCompany;

export const getServerSideProps = () => {
	return baseURL
		.get(`/user`, { params: { role: "SalesPerson", status: true } })
		.then((res) => ({
			props: {
				users: res.data.user,
			},
		}))
		.catch((error) => {
			return {
				props: { users: [] },
			};
		});
};
