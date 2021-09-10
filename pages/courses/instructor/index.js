import { useEffect } from "react";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "@/redux/actions/course";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "@/redux/types/type";

export default function User() {
  const dispatch = useDispatch();
  const { error, courses, loading } = useSelector((state) => state.course);

  useEffect(() => {
    if (!courses) {
      dispatch(getAllCourses());
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [courses, dispatch, error]);
  return (
    <InstructorProtectedRoute>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h1 className=" font p-5 mb-4 text-center bg-primary text-white bg">
              Instructor Dashboard
            </h1>
            <h1>This is the The instructor dashboard</h1>
          </div>
        </div>
      </div>
    </InstructorProtectedRoute>
  );
}
