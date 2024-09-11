import React from "react";
import Hero from "../../assets/images/HomeHero.jpg";
import "./Home.scss";
import feature1 from "../../assets/images/typing.svg";
import feature2 from "../../assets/images/calendar.svg";
import feature3 from "../../assets/images/reading.svg";
import feature4 from "../../assets/images/meditation.svg";

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
      <section className="features">
      <div className="features__type">
      <img src={feature2} alt="feature_2" className="features-image features-image--track" />
            <h2>Track</h2>
            <h4>
            Monitor your mood daily and discover patterns over time.
            </h4>
      </div>
      <div className="features__type">
      <img src={feature1} alt="Track" className="features-image" />
            <h2>Write</h2>
            <h4>
              Capture your thoughts and reflect with personal journaling.
            </h4>
      </div>
      <div className="features__type">
      <img
              src={feature3}
              alt="feature_3"
              className="features-image features-image--track"
              style={{ marginTop: 60, marginBottom: 60 }}
            />
            <h2>Insights</h2>
            <h4>
            Gain meaningful insights into your emotions and behaviors.
            </h4>
      </div>
      <div className="features__type">
      <img src={feature4} alt="feature_4" className="features-image" />
            <h2>Uplift</h2>
            <h4>
            Boost your well-being with personalized uplifting activities.
            </h4>
      </div>
      </section>
    </div>
  );
}
