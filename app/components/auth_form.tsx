"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthAction = {
  action: "login" | "register";
};

const AuthForm = (props: AuthAction) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectLink = props.action === "login" ? "/register" : "/login";
  const apiCall =
    props.action === "login" ? "/api/auth/login" : "/api/auth/register";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = {
      username: (event.target as any).username.value,
      password: (event.target as any).password.value,
    };

    try {
      // Pass formData to the controller function
      const response = await fetch(apiCall, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        setError(result.message);
        throw new Error(result.message);
      }

      console.log(`Form submitted successfully`);
      router.push("/");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }

    console.log(`submitted`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">
            {props.action == "login" ? "Sign in" : "Sign up"}
          </h1>
        </div>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Username</label>
            <input
              name="username"
              placeholder="Type here"
              type="text"
              className="input max-w-full"
            />
            <label className="form-label">
              <span className="form-label-alt">
                Please enter a valid username.
              </span>
            </label>
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="form-control">
              <input
                name="password"
                placeholder="Type here"
                type="password"
                className="input max-w-full"
              />
            </div>
          </div>
          <div className="form-field pt-5">
            <div className="form-control justify-between">
              <button type="submit" className="btn btn-primary w-full">
                {props.action == "login" ? "Log in" : "Register"}
              </button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control justify-center">
              <Link
                href={redirectLink}
                className="link link-underline-hover link-primary text-sm"
              >
                {props.action == "login"
                  ? "Don't have an account yet? Sign up."
                  : "Already have an account? Sign in."}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
