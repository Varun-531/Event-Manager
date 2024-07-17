import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import toast from "react-hot-toast";
import LoginSvg from "./14230944_5437681.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
// import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  // const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(true);
  const [fifth, setFifth] = useState(false);
  const [sixth, setSixth] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginOtp, setLoginOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [third, setThird] = useState(false);
  const [seventh, setSeventh] = useState(false);
  const [otpBox, setOtpBox] = useState(false);
  const [otp2, setOtp2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [login2, setLogin2] = useState(true);
  const [cookies, setCookie] = useCookies(["token", "userId"]);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("https://event-manager-ghso.onrender.com/login", {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Logged in successfully");
        setCookie(
          "token",
          res.data.token,
          { path: "/" },
          { maxAge: 60 * 60 * 24 }
        );
        setCookie(
          "userId",
          res.data.userId,
          { path: "/" },
          { maxAge: 60 * 60 * 24 }
        );
        navigate("/");
        login();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Invalid email or password");
      });
  };

  const verifyOTP = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(otp);
    axios
      .post("https://event-manager-ghso.onrender.com/otp-verification", {
        email,
        otp,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success("OTP verified successfully");
        setFirst(true);
        setThird(false);
        setSecond(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Invalid OTP");
      });
  };

  const verifyEmail = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(email);
    axios
      .post("https://event-manager-ghso.onrender.com/email-verification", {
        email,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success("OTP sent successfully");
        // setFirst(true);
        setThird(true);
        setSecond(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Error sending OTP");
      });
  };

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    axios
      .post("https://event-manager-ghso.onrender.com/register", {
        email,
        password,
        username,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Registered successfully");
        setLogin(true);
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Email already exists");
      });
  };

  const handleForgotPass = (event) => {
    event.preventDefault();
    setFifth(true);
    setSixth(false);
    setLoginOtp(true);
  };

  const verifyEmail2 = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(email);
    axios
      .post("https://event-manager-ghso.onrender.com/email-verification", {
        email,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success("OTP sent successfully");
        // setSixth(true);
        // setFifth(false);
        setLoginOtp(false);
        setOtpBox(true);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Error sending OTP");
      });
  };

  const verifyOtp2 = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("https://event-manager-ghso.onrender.com/otp-verification", {
        email,
        otp: otp2,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success("OTP verified successfully");
        // setSixth(true);
        // setFifth(false);
        setSeventh(true);
        setOtpBox(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Invalid OTP");
      });
  };

  const handleChangePass = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    axios
      .post("https://event-manager-ghso.onrender.com/change-password", {
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Password changed successfully");
        // setLogin(true);
        setSeventh(false);
        setPassword("");
        setFifth(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Error changing password");
      });
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <PropagateLoader
            loading={loading}
            speedMultiplier={1}
            size={20}
            aria-label="Loading Spinner"
          />
        </div>
      )}
      <div className="login-background h-full flex justify-center">
        <div className="login-container md:flex gap-7 justify-center items-center bg-orange-100 rounded md:p-14">
          <img src={LoginSvg} alt="svg" className="hidden md:block h-[60vh]" />
          {login2 ? (
            <div className="temp flex min-h-full flex-col justify-center md:px-6 md:py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="md:mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {loginOtp && (
                    <>
                      <div>
                        <button
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                          onClick={verifyEmail2}
                        >
                          Send OTP
                        </button>
                      </div>
                    </>
                  )}
                  {otpBox && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="OTP"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            OTP
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="OTP"
                            name="OTP"
                            type="OTP"
                            value={otp2}
                            onChange={(e) => setOtp2(e.target.value)}
                            autoComplete="OTP"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                          onClick={verifyOtp2}
                        >
                          verify OTP
                        </button>
                      </div>
                    </>
                  )}
                  {seventh && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-1 text-gray-900"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="div2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium leading-4 text-gray-900"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            value={confirmPassword}
                            autoComplete="confirm-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          // type="submit"
                          onClick={handleChangePass}
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                        >
                          Change Password
                        </button>
                      </div>
                    </>
                  )}

                  {sixth && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {!fifth && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="text-sm">
                            <a
                              href="#"
                              className="font-semibold text-orange-500 hover:text-orange-400 cursor-pointer"
                              onClick={handleForgotPass}
                            >
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          // type="submit"
                          onClick={handleLogin}
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign in
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?
                  <a
                    // href="/register"
                    onClick={() => {
                      setLogin2(false);
                    }}
                    className="font-semibold leading-6 text-orange-500 hover:text-orange-400 cursor-pointer"
                  >
                    {" "}
                    Register
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="temp flex min-h-full flex-col justify-center md:px-6 md:py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign up to your account
                </h2>
              </div>

              <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-2 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                        className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {second && (
                    <>
                      <div>
                        <button
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                          onClick={verifyEmail}
                        >
                          Send OTP
                        </button>
                      </div>
                    </>
                  )}
                  {third && (
                    <>
                      <div>
                        <label
                          htmlFor="OTP"
                          className="block text-sm font-medium leading-2 text-gray-900"
                        >
                          OTP
                        </label>
                        <div className="mt-1">
                          <input
                            id="OTP"
                            name="OTP"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            autoComplete="OTP"
                            required
                            className="block pr-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          // type="submit"
                          onClick={verifyOTP}
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                        >
                          Verify OTP
                        </button>
                      </div>
                    </>
                  )}

                  {first && (
                    <>
                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-1 text-gray-900"
                          >
                            Password
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="div2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium leading-4 text-gray-900"
                          >
                            Confirm Password
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            value={confirmPassword}
                            autoComplete="confirm-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          // type="submit"
                          onClick={handleSignup}
                          className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                        >
                          Sign up
                        </button>
                      </div>
                    </>
                  )}
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                  Already a member?
                  <a
                    // href="/register"
                    onClick={() => setLogin2(true)}
                    className="font-semibold leading-6 text-orange-500 hover:text-orange-400 cursor-pointer"
                  >
                    {" "}
                    login
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
