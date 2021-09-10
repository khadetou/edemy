import { Select, Button, Avatar } from "antd";
import { useState, useEffect } from "react";
import InstructorProtectedRoute from "@/components/routes/InstructorProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { getCourse, updateCourse } from "@/redux/actions/course";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/redux/types/type";

export default function UpdateCourse() {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;

  const { error, course, success, loading } = useSelector(
    (state) => state.course
  );
  console.log(success);
  const { Option } = Select;
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    paid: "",
    category: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }

    if ((!course && id) || (course && id !== course._id)) {
      dispatch(getCourse(id));
    } else {
      setValues({
        name: course.name,
        description: course.description,
        price: course.price,
        paid: course.paid,
        category: course.category,
      });
      setImagePreview(course.image[0].url);
    }
    if (success) {
      toast.success("Data has been updated successfully!");
      dispatch(getCourse(id));
      dispatch({ type: CLEAR_SUCCESS });
      router.push("/courses/instructor");
    }
  }, [course, id, dispatch, error, success]);

  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState([]);

  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

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
    };
    if (image.length !== 0) {
      courseData.image = image;
    }

    dispatch(updateCourse(course._id, courseData));
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
                  value={values.price}
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
                disabled={loading || values.uploading}
                className="btn btn-primary my-3"
                loading={loading}
                type="primary"
                size="large"
                shape="round"
              >
                {loading ? "Updating..." : "Update & Continue"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorProtectedRoute>
  );
}
