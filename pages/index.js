import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Card from "../components/Card";
import PageLoader from "../components/FormElements/PageLoader";
import LoginForm from "../components/Forms/LoginForm";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <PageLoader />;
  if (status === "authenticated") {
    router.push("/dashboard/companies");
    return <PageLoader />;
  }

  return (
    <div className="bg-main flex flex-1 h-screen justify-center items-center p-4">
      <Head>
        <title>Met Asia Group</title>
      </Head>
      <Card className="justify-center items-center py-10">
        <div className="flex flex-col md:flex-row justify-center items-center m-4">
          <Image src="/metasia.png" width="100" height="100" alt="Met-Asia Logo" />
          <h2 className="text-3xl md:text-5xl font-bold m-2 ml-4">Met Asia Group</h2>
        </div>
        <LoginForm />
      </Card>
    </div>
  );
}
