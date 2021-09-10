import { useEffect } from "react";
import Link from "next/link";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "@/redux/actions/course";
import { toast } from "react-toastify";
import { CLEAR_ERROR } from "@/redux/types/type";
import { Avatar } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function Instructor() {
  const dispatch = useDispatch();
  const { error, courses, loading } = useSelector((state) => state.course);
  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  useEffect(() => {
    dispatch(getAllCourses());

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error, dispatch]);
  return (
    <InstructorProtectedRoute>
      <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
        COURSES LIST
      </h1>
      {courses && courses.length !== 0 ? (
        courses.map((course, idx) => (
          <div className="media pt-2" key={idx}>
            <Avatar
              size={80}
              src={course.image ? course.image[0].url : "/course.png"}
            />

            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/courses/instructor/course/${course._id}`}
                    className="pointer"
                  >
                    <a className="mt-2 text-primary">
                      <h5 className="pt-2">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} Lessons
                  </p>

                  {course.lessons.length < 5 ? (
                    <p style={myStyle} className="text-warning">
                      At least 5 lessons are required to publish a course
                    </p>
                  ) : course.published ? (
                    <p style={myStyle} className="text-success">
                      Your course is live in the marketplace
                    </p>
                  ) : (
                    <p style={myStyle} className="text-success">
                      Your course is ready to be published
                    </p>
                  )}
                </div>

                <div className="col-md-3 mt-3 text-center">
                  {course.published ? (
                    <div>
                      <CheckCircleOutlined className="h5 pointer text-success" />
                    </div>
                  ) : (
                    <div>
                      <CloseCircleOutlined className="h5 pointer text-warning" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="text-center display-1">No course</h1>
        </div>
      )}
    </InstructorProtectedRoute>
  );
}
