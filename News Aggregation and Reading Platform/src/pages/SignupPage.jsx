import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function validate(name, email, password, confirm) {
  const errors = {};
  if (!name.trim()) errors.name = "Name is required.";
  else if (name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";

  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";

  if (!password) errors.password = "Password is required.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";

  if (!confirm) errors.confirm = "Please confirm your password.";
  else if (confirm !== password) errors.confirm = "Passwords do not match.";

  return errors;
}

function SignupForm({ onSuccess, switchToSignin }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(
      form.name,
      form.email,
      form.password,
      form.confirm
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = signup(form.name, form.email, form.password);
    if (!result.success && result.error) {
      setServerError(result.error);
      return;
    }
    onSuccess(); // auto-login → tell Home
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Create Account</h1>
      <p className="auth-subtitle">Sign up to get started</p>

      {serverError && <div className="auth-server-error">{serverError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

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
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={handleChange}
            className={errors.confirm ? "input-error" : ""}
          />
          {errors.confirm && (
            <span className="error-msg">{errors.confirm}</span>
          )}
        </div>

        <button type="submit" className="auth-btn">
          Sign Up
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <button type="button" onClick={switchToSignin} className="link-btn">
          Sign In
        </button>
      </p>
    </div>
  );
}

export default SignupForm;
