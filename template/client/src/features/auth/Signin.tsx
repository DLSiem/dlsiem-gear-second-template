import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "./authSlice";

// interface LoginPageFormFields extends HTMLFormControlsCollection {
//   email: HTMLInputElement;
//   password: HTMLInputElement;
// }

// interface LoginPageFormElements extends HTMLFormElement {
//   readonly elements: LoginPageFormFields;
// }

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signInStatus, setSignInStatus] = useState<
    "idle" | "loading" | "succeeded" | "failed"
  >("idle");
  const [form, setForm] = useState({ email: "", password: "" });
  const [erro, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignInStatus("loading");

    try {
      await dispatch(signIn(form)).unwrap(); //
      setSignInStatus("succeeded");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSignInStatus("failed");
      setError(error.message);
    }
  };

  useEffect(() => {
    if (signInStatus === "succeeded") {
      navigate("/");
    }
  }, [signInStatus, navigate]);

  return (
    <div className="flex flex-col items-center mx-auto p-6 w-80 justify-center mt-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <form onSubmit={handleFormSubmit} className="w-full max-w-sm space-y-4">
        <input
          onChange={(e) => {
            setError("");
            setForm({ ...form, email: e.target.value });
          }}
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={(e) => {
            setError("");
            setForm({ ...form, password: e.target.value });
          }}
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={signInStatus === "loading"}
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <section>
        <p className="text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </section>
      {erro && (
        <p className="text-red-500 mt-4 transition-opacity duration-500 opacity-100">
          {erro}
        </p>
      )}
    </div>
  );
};

export default Signin;
