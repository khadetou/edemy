import React, { useEffect } from "react";
import { useRouter } from "next/router";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { getCourse, deleteCourse } from "@/redux/actions/course";
import { toast } from "react-toastify";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/redux/types/type";
import Link from "next/link";

export default function CourseView() {
  const dispatch = useDispatch();
  const { course, loading, success, error } = useSelector(
    (state) => state.course
  );

  const router = useRouter();

  const id = router.query.id;

  useEffect(() => {
    if ((id && course && id !== course._id) || (!course && id)) {
      dispatch(getCourse(id));
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (success) {
      console.log(success);
      toast.success(success.message);
      dispatch({ type: CLEAR_SUCCESS });
      router.push("/courses/instructor");
    }
  }, [error, dispatch, course, id, success]);

  const deleteC = (id) => {
    if (window.confirm("Are you sure you wanna delete the course ?")) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <InstructorProtectedRoute>
      <div className="contianer-fluid pt-3">
        <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
          Course Details
        </h1>
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image[0].url : "/course.png"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>

                  <div className="d-flex pt-4">
                    <Tooltip title="Edit">
                      <Link href={`/courses/instructor/edit/${course._id}`}>
                        <EditOutlined className="h5 pointer text-warning me-4 btn" />
                      </Link>
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h5 pointer text-success me-4 btn" />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteOutlined
                        className="h5 pointer text-danger btn"
                        onClick={() => deleteC(course._id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col">
                <ReactMarkdown source={course.description} />
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorProtectedRoute>
  );
}
