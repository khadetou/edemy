import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/redux/actions/login";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "@/redux/types/type";
import { SyncOutlined } from "@ant-design/icons";
import router from "next/router";

export default function Forgot() {
  const [email, setEmail] = useState("khadetou@gmail.com");

  const dispatch = useDispatch();

  const { error, loading, success, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
    };

    dispatch(forgotPassword(body));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }

    if (success) {
      toast.success(message);
      dispatch({ type: CLEAR_SUCCESS });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [dispatch, success, error, message, isAuthenticated]);

  return (
    <>
      {loading ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <>
          <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
            Forgot Password
          </h1>

          <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-4"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <br />
              <button
                type="submit"
                className="btn  btn-lg btn-block btn-primary p-2"
                disabled={!email || loading}
              >
                {loading ? <SyncOutlined spin /> : "Submit"}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
