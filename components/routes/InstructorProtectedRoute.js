import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentInstructor } from "@/redux/actions/instructor";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
import { loadUser } from "@/redux/actions/user";

export default function InstructorProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { instructor, loading, success } = useSelector(
    (state) => state.currentInstructor
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentInstructor());
    }
    if (!loading && !instructor) {
      router.push("/");
    }
    if (!localStorage.token) {
      router.push("/login");
    }
  }, [isAuthenticated, dispatch]);

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
              <InstructorNav />
            </div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
