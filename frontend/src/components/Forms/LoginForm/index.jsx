import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../../store/session";

import { useModalContext } from "../../../hooks/useModalContext";
import useSessionUser from "../../../hooks/useSessionUser";

import "./LoginForm.css";
import FormError from "../FormError";
import Or from "../Or";

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
        if (data && data.message) setErrors({ credentials: data.message });
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(login({ credential: "demo@user.io", password: "password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors({ credentials: data.message });
      });
  };

  return (
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
      <FormError errors={errors} />
      <button type="submit" className="continue">
        Continue
      </button>
      <Or />
      <button id="demo" onClick={(e) => handleDemo(e)}>
        Continue as Demo User
      </button>
    </form>
  );
}

export default LoginForm;
