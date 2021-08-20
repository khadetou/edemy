import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/actions/register";
import { CLEAR_ERROR } from "@/redux/types/type";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

export default function Register() {
  const [name, setName] = useState("khadetou");
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
      name,
      email,
      password,
    };
    dispatch(register(body));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.msg);
      dispatch({ type: CLEAR_ERROR });
    }
    if (isAuthenticated) {
      router.push("/");
    }
  });

  return (
    <>
      <h1 className="p-5 mb-4 text-center bg-primary text-white bg font">
        Register
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
