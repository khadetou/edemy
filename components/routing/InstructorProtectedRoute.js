import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentInstructor } from "@/redux/actions/instructor";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

export default function InstructorProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { instructor } = useSelector((state) => state.currentInstructor);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.token) {
      router.push("/login");
    }
    if (!instructor) {
      dispatch(getCurrentInstructor());
    }
    if (isAuthenticated && !instructor) {
      router.push("/");
    }
  }, [isAuthenticated, instructor]);

  return (
    <>
      {!isAuthenticated || loading ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
