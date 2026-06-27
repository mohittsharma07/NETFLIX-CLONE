import React, { useEffect, useState } from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Components/firebaseConfig";

import Header from "./Components/Header";
import HomeBanner from "./Components/HomeBanner";
import Login from "./Components/Login";
import Banner from "./Components/Banner";
import List from "./Components/List";
import IntroScreen from "./Components/IntroScreen";
import UserProfile from "./Components/UserProfile";

function App() {
  const [showIntro, setShowIntro] = useState(
    !sessionStorage.getItem("introShown")
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const texts = {
    en: {
      trending: "Trending Now",
      popular: "Popular",
      added: "Added to My List",
    },
    hi: {
      trending: "ट्रेंडिंग",
      popular: "लोकप्रिय",
      added: "मेरी सूची में जोड़ा गया",
    },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addToList = (movie) => {
    alert(texts[language].added);
    console.log("Added:", movie);
  };

  if (showIntro) {
    return (
      <IntroScreen
        onFinish={() => {
          sessionStorage.setItem("introShown", "true");
          setShowIntro(false);
        }}
      />
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#e50914",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        NETFLIX...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Header
                language={language}
                setLanguage={setLanguage}
              />
              <HomeBanner />
            </>
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <>
                <Header
                  language={language}
                  setLanguage={setLanguage}
                />

                <Banner
                  onAddToList={addToList}
                  language={language}
                />

                <List
                  title={texts[language].trending}
                  param="trending"
                />

                <List
                  title={texts[language].popular}
                  param="popular"
                />

                <List
                  title="Netflix Originals"
                  param="originals"
                />

                <List
                  title="Now Playing"
                  param="now_playing"
                />

                <List
                  title="Top Rated"
                  param="top_rated"
                />

                <List
                  title="Upcoming"
                  param="upcoming"
                />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            user ? (
              <UserProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;