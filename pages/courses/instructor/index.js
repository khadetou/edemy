import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SyncOutlined } from "@ant-design/icons";
import { getCurrentInstructor } from "@/redux/actions/instructor";

import UserNav from "@/components/nav/UserNav";
import { useRouter } from "next/router";

export default function User() {
  const { instructor, loading, success, error } = useSelector(
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
      {!instructor || loading ? (
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
                  Instructor Dashboard
                </h1>
                <h1>This is the The instructor dashboard</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
