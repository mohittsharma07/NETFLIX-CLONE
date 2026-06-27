import { useEffect } from "react";

const IntroScreen = ({ onFinish }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro">

      <div className="red-line"></div>

      <div className="intro-content">

        <h1 className="intro-title">
          NETFLIX CLONE
        </h1>

        <p className="intro-subtitle">
          Crafted With React & Firebase
        </p>

        <div className="developer">
          <span>Developed By</span>

          <h2>
            MOHIT SHARMA
          </h2>
        </div>

      </div>

    </div>
  );
};

export default IntroScreen;