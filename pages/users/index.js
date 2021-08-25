import { useEffect } from "react";
import { useSelector, dispatch } from "react-redux";
import { loadUser } from "@/redux/actions/user";
import { SyncOutlined } from "@ant-design/icons";
import router from "next/router";
import UserNav from "@/components/nav/UserNav";

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
      {!isAuthenticated || loading ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <UserNav />
              </div>
              <div className="col-md-10">
                <h1 className=" font p-5 mb-4 text-center bg-primary text-white bg">
                  User Dashboard
                </h1>
                <h1>This is the user profile</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
