import React, { useState, useContext } from "react";
import { UserContext } from "../Components/UserContext";
import { Navigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, register, login } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    await register(email, password);
  };

  return (
    <div>
      {isLoggedIn && <Navigate to={"/home"} replace={true} />}
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="login-button" type="submit">
          Log in
        </button>
        <button className="register-button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
