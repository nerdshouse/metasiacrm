import { useRouter } from "next/router";
import Notice from "../Tailwind/Notice";
import AdminLayout from "../Admin/AdminLayout";
import NormalLayout from "./NormalLayout";

function Layout({ children }) {
	const router = useRouter();

	return (
		<div>
			<Notice />
			{router.route.split("/")[1] === "dashboard" ? (
				<AdminLayout>{children}</AdminLayout>
			) : (
				<NormalLayout>{children}</NormalLayout>
			)}
		</div>
	);
}
export default Layout;
