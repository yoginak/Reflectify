import React from "react";
import Hero from "../../assets/images/HomeHero.jpg";
import "./Home.scss";
// import feature1 from "../../assets/images/typing.svg";
// import feature2 from "../../assets/images/calendar.svg";
// import feature3 from "../../assets/images/reading.svg";
// import feature4 from "../../assets/images/meditation.svg";
import feature1 from "../../assets/images/journal.svg";
import feature2 from "../../assets/images/Reflect_img.svg";
import feature3 from "../../assets/images/stats.svg";
import feature4 from "../../assets/images/Meditation_img.svg";
import Testimonials from "../../components/Testimonials/Testimonials";

export default function Home() {
  const features = document.querySelectorAll('.features__type');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

features.forEach((feature) => {
  observer.observe(feature);
});
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
  <div className="features__type features__type--slideRight">
    <img src={feature2} alt="feature_2" className="features-image features-image--track" />
    <h2>Track</h2>
    <h5>Monitor your mood daily and discover patterns over time.</h5>
  </div>

  <div className="features__type">
    <img src={feature1} alt="Track" className="features-image" />
    <h2>Write</h2>
    <h5>Capture your thoughts and reflect with personal journaling.</h5>
  </div>

  <div className="features__type features__type--slideRight">
    <img src={feature3} alt="feature_3" className="features-image features-image--track" />
    <h2>Insights</h2>
    <h5>Gain meaningful insights into your emotions and behaviors.</h5>
  </div>

  <div className="features__type">
    <img src={feature4} alt="feature_4" className="features-image" />
    <h2>Uplift</h2>
    <h5>Boost your well-being with personalized uplifting activities.</h5>
  </div>
</section>



      <Testimonials/>
    </div>
  );
}
