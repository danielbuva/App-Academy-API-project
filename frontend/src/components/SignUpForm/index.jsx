import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { signup } from "../../store/session";

import { useModalContext } from "../../hooks/useModalContext";
import useSessionUser from "../../hooks/useSessionUser";

import "./SignUpForm.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSessionUser();
  const { closeModal } = useModalContext();

  if (currentUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div id="signup">
      <form onSubmit={handleSubmit}>
        <h2 id="welcome">Welcome to ycshiyp</h2>
        <label htmlFor="email" className="hidden-label" />
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="username" className="hidden-label" />
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
        {errors.username && <p>{errors.username}</p>}
        <label htmlFor="first-name" className="hidden-label" />
        <input
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          placeholder="First name"
        />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label htmlFor="last-name" className="hidden-label" />
        <input
          id="last-name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          placeholder="Last name"
        />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label htmlFor="new-password" className="hidden-label" />
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="confirm-password" className="hidden-label" />
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="continue">
          Continue
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
