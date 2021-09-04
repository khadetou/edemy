import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentInstructor } from "@/redux/actions/instructor";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

export default function InstructorProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const { instructor, success } = useSelector(
    (state) => state.currentInstructor
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!instructor) {
      dispatch(getCurrentInstructor());
    }
    if (instructor && !success) {
      router.push("/");
    }
  }, [instructor, dispatch, success]);
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
