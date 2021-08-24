import { useEffect } from "react";
import { useSelector, dispatch } from "react-redux";
import { loadUser } from "@/redux/actions/user";
import { SyncOutlined } from "@ant-design/icons";
import router from "next/router";

export default function User() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <>
          <h1>Profile Page</h1>
        </>
      )}
    </>
  );
}
