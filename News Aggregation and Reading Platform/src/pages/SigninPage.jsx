import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function validate(email, password) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

function SigninForm({ onSuccess, switchToSignup }) {
  const { signin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form.email, form.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = signin(form.email, form.password);
    if (!result.success && result.error) {
      setServerError(result.error);
      return;
    }
    onSuccess(); // tell Home that login succeeded
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Welcome Back</h1>
      <p className="auth-subtitle">Sign in to your account</p>

      {serverError && <div className="auth-server-error">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={switchToSignup} className="link-btn">
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default SigninForm;
