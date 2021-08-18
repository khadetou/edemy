import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("khadetou");
  const [email, setEmail] = useState("khadetou@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const da = {
      name,
      email,
      password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/register",
      da,
      config
    );

    console.log("Response register", data);
  };
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
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
