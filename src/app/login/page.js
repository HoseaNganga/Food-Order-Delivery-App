"use client";
import React from "react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginProgress(false);
  };
  return (
    <section>
      <h1 className="gradient_text mb-6 ">Login:</h1>
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
            disabled={loginProgress}
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
            disabled={loginProgress}
          />
        </div>
        <button
          type="submit"
          className="style_btn hover:bg-green-600 transition-all "
          disabled={loginProgress}
        >
          Login
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
          Not a User? Click here to{" "}
          <Link href={"/register"} className="text-green-600 underline">
            Register
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
