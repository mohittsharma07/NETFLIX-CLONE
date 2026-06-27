import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const page = location.pathname === "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUserExist, setUserExist] = useState(false);

  const [isEmailUsed, setIsEmailUsed] = useState(false);

  const [emailValid, setEmailValid] = useState(true);

  const [passwordValid, setPasswordValid] = useState(true);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const validation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);

      case "password":
        return value.length >= 6;

      default:
        return false;
    }
  };

  const ctaClickHandler = async (e) => {
    e.preventDefault();

    const validEmail = validation("email", email);

    const validPassword = validation("password", password);

    setEmailValid(validEmail);
    setPasswordValid(validPassword);

    if (!validEmail || !validPassword) {
      return;
    }

    if (!page) {
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        return;
      }
    }

    setPasswordMatch(true);
    try {
      if (page) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("LOGIN SUCCESS");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      navigate("/dashboard");
    } catch (error) {
      if (page) {
        setUserExist(true);
      } else {
        setIsEmailUsed(true);
      }

      console.log(error);
    }
  };

  useEffect(() => {
    setUserExist(false);
    setIsEmailUsed(false);
    setPasswordMatch(true);
  }, [location]);

  return (
    <div className="login">
      <div className="holder login-card">
        <button className="close-btn" onClick={() => navigate("/")}>
          ✕
        </button>

        <h1 className="text-white">{page ? "Sign In" : "Register"}</h1>

        <br />

        <form autoComplete="off">
          {!page && (
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!emailValid && (
            <p className="text-danger">Please enter a valid email.</p>
          )}

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!passwordValid && (
            <p className="text-danger">
              Password must be at least 6 characters.
            </p>
          )}

          {!page && (
            <>
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {!passwordMatch && (
                <p className="text-danger">Passwords do not match.</p>
              )}
            </>
          )}

          <button className="btn btn-danger w-100" onClick={ctaClickHandler}>
            {page ? "Sign In" : "Register"}
          </button>

          <br />
          <br />

          {page && (
            <div className="remember-me">
              <input type="checkbox" id="remember" />

              <label htmlFor="remember">Remember Me</label>
            </div>
          )}
        </form>

        {isUserExist && (
          <p className="text-danger mt-3">
            User does not exist. Please register first.
          </p>
        )}

        {isEmailUsed && (
          <p className="text-danger mt-3">
            Email already exists. Please Sign In.
          </p>
        )}

        <div className="login-form-other">
          <div className="login-signup-now text-white">
            {page ? "New to Netflix?" : "Already have an account?"}{" "}
            <Link to={page ? "/register" : "/login"}>
              {page ? "Sign up now" : "Sign In"}
            </Link>
          </div>
        </div>
      </div>

      <div className="shadow"></div>

      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt="Netflix Background"
      />
    </div>
  );
};

export default Login;
