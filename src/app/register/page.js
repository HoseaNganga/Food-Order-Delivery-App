"use client";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    toast("Creating User..");
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    const resp = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (resp.ok) {
      setUserCreated(true);
    } else {
      setError(true);
      setUserCreated(true);
      toast.success("User Created Successfully");
    }
    setCreatingUser(false);
    setEmail("");
    setPassword("");
  };
  return (
    <section>
      <h1 className="gradient_text mb-6 ">Register:</h1>
      {userCreated && (
        <div className="mb-4">
          User created..Click here to{" "}
          <Link href={"/login"} className="text-green-600 underline">
            login
          </Link>
        </div>
      )}
      {error && (
        <div className="mb-4">
          Error occured
          <br /> Please try again later
        </div>
      )}
      <form
        className="glassmorphism max-w-screen-sm grid gap-6"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label htmlFor="mail">Email:</label>
          <input
            type="email"
            name="email"
            id="mail"
            placeholder="youremail@host.com"
            required
            className="form_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={creatingUser}
          />
        </div>
        <div>
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="pass"
            placeholder="password"
            required
            className="form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={creatingUser}
          />
        </div>
        <button
          type="submit"
          className="style_btn hover:bg-green-600 transition-all "
          disabled={creatingUser}
        >
          Register
        </button>
        <p className="text-center">or Login with Provider</p>
        <button
          type="button"
          className="flex items-center justify-center gap-4 style_learnbtn hover:bg-green-600 transition-all "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <FaGoogle /> Login with Google
        </button>
        <div className="text-center">
          Already a User? Click here to{" "}
          <Link href={"/login"} className="text-green-600 underline">
            Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
