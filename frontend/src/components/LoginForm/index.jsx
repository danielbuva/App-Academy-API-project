import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/session";

import { useModalContext } from "../../hooks/useModalContext";
import useSessionUser from "../../hooks/useSessionUser";

import "./LoginForm.css";

function LoginForm() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSessionUser();
  const { closeModal } = useModalContext();

  if (currentUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <h2 id="welcome">Welcome to ycshiyp</h2>
        <label htmlFor="username-or-email" className="hidden-label" />
        <input
          type="text"
          id="username-or-email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="username or email"
        />
        <label htmlFor="password" className="password" />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
        />
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit" className="continue">
          Continue
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
