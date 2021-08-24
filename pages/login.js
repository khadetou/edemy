import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/actions/login";
import { CLEAR_ERROR } from "@/redux/types/type";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

export default function Login() {
  const [email, setEmail] = useState("khadetou@gmail.com");
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    dispatch(login(body));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/users");
    }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  });

  return (
    <>
      {isAuthenticated === null ? (
        <SyncOutlined
          spin
          className="text-primary  d-flex display-1 justify-content-center p-5"
        />
      ) : (
        <>
          <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
            Login
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
              <input
                type="password"
                className="form-control mb-4 p-4"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button
                type="submit"
                className="btn  btn-lg btn-block btn-primary p-2"
                disabled={!email || !password || loading}
              >
                {loading ? <SyncOutlined spin /> : "Submit"}
              </button>
            </form>
            <Link href="/password/forgot">
              <a className="text-primary ">Forgot password</a>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
