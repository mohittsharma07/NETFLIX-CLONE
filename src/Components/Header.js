import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Search from "./Search";

const Header = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <header className="topNav">
      <nav className="navbar navbar-dark">
        <div className="container-fluid header-container">
          
          {/* LOGO */}
          <Link
            to="/"
            aria-label="Netflix Home"
            className="logo-link"
          >
            <img
              className="nav__logo"
              src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
              alt="Netflix Logo"
            />
          </Link>


          <div className="header-controls">

            <div className="top-actions">

              <select
                className="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>

              {user && (
                <button
                  className="btn btn-light"
                  onClick={() => navigate("/profile")}
                >
                  {language === "hi"
                    ? "प्रोफाइल"
                    : "Profile"}
                </button>
              )}

              {user ? (
                <button
                  className="btn btn-danger"
                  onClick={logoutHandler}
                >
                  {language === "hi"
                    ? "लॉगआउट"
                    : "Logout"}
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => navigate("/login")}
                >
                  {language === "hi"
                    ? "साइन इन"
                    : "Sign In"}
                </button>
              )}
            </div>

            {user && (
              <div className="search-wrapper">
                <Search language={language} />
              </div>
            )}

          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;





