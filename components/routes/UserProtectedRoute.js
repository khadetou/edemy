import { useEffect } from "react";
import { useSelector, dispatch } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import UserNav from "../nav/UserNav";

export default function UserProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
  });
  return (
    <>
      {!isAuthenticated || loading ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <UserNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
