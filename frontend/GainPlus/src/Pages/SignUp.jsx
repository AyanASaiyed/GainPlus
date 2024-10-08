import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

const SignUp = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleSignUp = () => {
    if (!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.success("Succesfully Created Account!");
      })
      .catch((error) => {
        const errCode = error.code;
        const errMessage = error.message;
        console.log(errCode, errMessage);
        toast.error(errMessage);
      });
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <img src="./drawing.png" className="h-32 w-88 mb-8"></img>
      <h1 className="text-4xl font-extrabold text-center  text-gray-700 mb-4">
        Fitness with a Twist!
      </h1>
      <div className="w-full p-4 mt-0 rounded-lg shadow-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h1 className="text-3xl font-extrabold text-center text-gray-300">
          Sign Up
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
            to="/login"
            className="text-sm hover:underline hover:text-red-400 mt-2 inline-block"
          >
            Have an Account? Login
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 hover:bg-red-500"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
