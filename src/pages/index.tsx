import React from "react";
import Lottie, { Options } from "react-lottie";
import animationData from "../assets/json/loader.json";

const Home = () => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  return (
    <main className="loader-container">
      <div className="loader-index">
        <Lottie options={defaultOptions} />
      </div>
    </main>
  );
};

export default Home;
