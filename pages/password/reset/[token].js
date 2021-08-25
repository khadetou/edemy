import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/redux/actions/login";
import { CLEAR_ERROR } from "@/redux/types/type";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

export default function Login() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password don't mutch");
    }
    const body = {
      password,
    };

    dispatch(resetPassword(body, router.query.token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }

    if (success) {
      router.push("/login");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [success, error, dispatch, isAuthenticated]);

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
            Reset Password
          </h1>

          <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                className="form-control mb-4 p-4"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-4"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn  btn-lg btn-block btn-primary p-2"
                disabled={!password || !confirmPassword || loading}
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
