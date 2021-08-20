import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/style.css";
import Layout from "@/components/Layout";
import { wrapper } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
