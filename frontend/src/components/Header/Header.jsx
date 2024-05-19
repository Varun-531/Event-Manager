import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(!!cookies.userId && !!cookies.token);
  }, [cookies]);

  const handleUserBoard = useCallback(() => {
    navigate("/userboard");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    removeCookie("userId", { path: '/' });
    removeCookie("token", { path: '/' });
    setLogin(false);
    navigate("/");
  }, [removeCookie, navigate]);

  return (
    <div className="flex justify-between bg-slate-900 p-7 items-center">
      <div className="text-slate-200 font-semibold text-xl">
        <Link to="/">Event Manager</Link>
      </div>
      <nav className="text-slate-200">
        <ul className="flex justify-center gap-7">
          <li>
            <Link className="headerLink" to="/dashboard">Dashboard</Link>
          </li>
          {login ? (
            <>
              <li onClick={handleUserBoard} className="headerLink cursor-pointer">
                UserBoard
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="headerLink" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
