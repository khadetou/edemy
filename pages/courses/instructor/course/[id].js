import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import {
  getCourse,
  deleteCourse,
  createLesson,
  uploadVideo,
  deleteVideo,
} from "@/redux/actions/course";
import { toast } from "react-toastify";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/redux/types/type";
import Link from "next/link";
import AddLessonForm from "@/components/forms/AddLessonForm";
import Item from "antd/lib/list/Item";

export default function CourseView() {
  const dispatch = useDispatch();
  const { course, loading, success, error } = useSelector(
    (state) => state.course
  );
  const {
    video: videoLinks,
    error: videoLinkErr,
    loading: videoLinkLoading,
    progres,
    message,
  } = useSelector((state) => state.videos);

  const {
    lessons,
    error: lessonError,
    loading: lessonLoading,
  } = useSelector((state) => state.lesson);

  const router = useRouter();

  const id = router.query.id;

  // for lessons
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  const [video, setVideo] = useState("");

  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progres) {
      setProgress(progres);
    }

    setVideo(videoLinks);

    // if (message) {
    //   setUploadButtonText("Upload Video");
    //   dispatch({ type: CLEAR_SUCCESS });
    // }
    if ((id && course && id !== course._id) || (!course && id)) {
      dispatch(getCourse(id));
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
    if (videoLinkErr) {
      toast.error(videoLinkErr);
      dispatch({ type: CLEAR_ERROR });
    }
    if (lessonError) {
      toast.error(lessonError);
      dispatch({ type: CLEAR_ERROR });
    }
    if (success) {
      toast.success(success.message);
      dispatch({ type: CLEAR_SUCCESS });
      router.push("/courses/instructor");
    }
    if (lessons) {
      toast.success("Lesson created successfully!");
      dispatch({ type: CLEAR_SUCCESS });
      setVisible(false);
    }
  }, [
    error,
    dispatch,
    course,
    id,
    success,
    lessons,
    lessonError,
    videoLinkErr,
    videoLinks,
    // message,
    progres,
  ]);

  // FUNCTIONS FOR ADD LESSON
  const handleAddLesson = (e) => {
    e.preventDefault();

    if (!videoLinkLoading) {
      setVideo(videoLinks);
    }

    if (!video) {
      return toast.error("Upload a video");
    }
    const lessonData = {
      ...values,
      video,
    };

    dispatch(createLesson(course._id, lessonData));
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];

    if (file) {
      let videoData = new FormData();
      videoData.append("video", file);

      dispatch(uploadVideo(course.instructor, videoData));
      setUploadButtonText(file.name);
    }
  };

  const handleVideoRemove = () => {
    if (videoLinks) {
      dispatch(deleteVideo(course.instructor, videoLinks));
      setUploadButtonText("Upload Video");
      setProgress(0);
    }
  };

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
                <ReactMarkdown children={course.description} />
              </div>
            </div>

            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center mt-5"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>
            </div>

            <br />

            <Modal
              title="+ Add Lesson"
              centered
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <AddLessonForm
                values={values}
                video={video}
                setValues={setValues}
                handleAddLesson={handleAddLesson}
                videoLinkLoading={videoLinkLoading}
                uploadButtonText={uploadButtonText}
                handleVideo={handleVideo}
                progress={progress}
                handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorProtectedRoute>
  );
}
