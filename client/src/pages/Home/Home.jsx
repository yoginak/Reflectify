import React from "react";
import Hero from "../../assets/images/HomeHero.jpg";
import "./Home.scss";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <img className="hero__img" src={Hero} alt="Hero image" />
        <div className="hero__title-wrapper">
          <div className="hero__title">
            <h1>Reflectify</h1>
          </div>
          <div className="hero__subtitle-wrapper">
            <h3>Discover Your Inner Self,</h3>
            <h3> One Day at a Time</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
