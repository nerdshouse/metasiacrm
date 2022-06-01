import { useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider, signIn } from "next-auth/react";

import "../styles/globals.css";
import store from "../store/store";
import Layout from "../components/Layout";
import { localSignin } from "../store/actions/authActions";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  useEffect(() => {
    store.dispatch(localSignin());
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
