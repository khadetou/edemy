import TopNav from "./TopNav";
import Meta from "./Meta";
import setToken from "@/utils/setToken";
import { useEffect } from "react";
import { loadUser } from "@/redux/actions/user";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setToken(localStorage.token);
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Meta />
      <TopNav />
      <main>{children}</main>
    </>
  );
}
