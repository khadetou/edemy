import { Select, Button, Avatar } from "antd";
import { useState, useEffect } from "react";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { createCourse } from "@/redux/actions/course";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/redux/types/type";

export default function CourseCreate() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, success } = useSelector((state) => state.course);

  const { Option } = Select;
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
  });

  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }

    if (success) {
      toast.success("The course has been created successfully! ");
      dispatch({ type: CLEAR_SUCCESS });
      router.push("/courses/instructor");
    }
  }, [error, dispatch, success]);

  //Handlers
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];

    setImage([]);
    setImagePreview([]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
    setUploadButtonText(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...values,
      image,
    };

    if (image.length === 0) {
      return toast.error("Please Upload image");
    }

    if (!courseData.paid) {
      courseData.price = "0";
    }
    console.log(courseData);
    dispatch(createCourse(courseData));
  };

  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

  return (
    <InstructorProtectedRoute>
      <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
        Create Course
      </h1>
      <div className="pt-3 pb-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group my-3">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={values.description}
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="col">
              <div className="form-group my-3">
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: !values.paid })}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>

            {values.paid && (
              <div className="form-group my-3">
                <Select
                  defaultValue="$9.99"
                  style={{ widht: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>

          <div className="form-group my-3">
            <input
              type="text"
              name="category"
              className="form-control"
              placeholder="Category"
              value={values.category}
              onChange={handleChange}
            />
          </div>

          <div className="row d-flex align-items-center ">
            <div className="col">
              <div className="form-group">
                <label className="btn btn-outline-secondary w-100 text-left mt-3">
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>
            {imagePreview && (
              <div className="col-md-6">
                <Avatar width={200} src={imagePreview} />
              </div>
            )}
          </div>

          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary my-3"
                loading={values.loading}
                type="primary"
                size="large"
                shape="round"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </InstructorProtectedRoute>
  );
}
