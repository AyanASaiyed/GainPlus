import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const SignIn = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        console.log(errCode, errMessage);
      });
  };

  if (user) {
    return <Navigate to="/"/>
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <img src="./drawing.png" className="h-32 w-88 mb-8"></img>
      <h1 className="text-4xl font-extrabold text-center  text-gray-700 mb-4">
          Fitness with a Twist!
        </h1>
      <div className="w-full p-4 mt-0 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h1 className="text-3xl font-extrabold text-center text-gray-300">
          Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-yellow-400 mt-2 inline-block"
          >
            Create an Account
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 hover:bg-red-950"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
