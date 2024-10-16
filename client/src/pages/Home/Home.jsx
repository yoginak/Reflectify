import React from "react";
import Hero from "../../assets/images/HomeHero.jpg";
import feature1 from "../../assets/images/Startup.svg";
import feature2 from "../../assets/images/Reflect_img.svg";
import feature3 from "../../assets/images/Analysis-amico.svg";
import feature4 from "../../assets/images/Breathing.svg";
import Testimonials from "../../components/Testimonials/Testimonials";
import { Link } from "react-router-dom";
import "./Home.scss";

export default function Home() {
  const features = document.querySelectorAll(".features__type");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  });
  features.forEach((feature) => {
    observer.observe(feature);
  });

  return (
    <div>
      <section className="hero">
        <img className="hero__img" src={Hero} alt="Hero image illustration" />
        <div className="hero__title-wrapper">
          <div className="hero__title">
            <h1>Reflectify</h1>
          </div>
          <div className="hero__subtitle-wrapper">
            <h3>Discover Your Inner Self,</h3>
            <h3> One Day at a Time</h3>
            <Link to ="/auth/register">
            <button className="btn btn-outline-info mt-3 mb-3" >Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__type features__type--slideRight">
          <img
            src={feature2}
            alt="illustration for track feature"
            className="features-image features-image--sizing"
          />
          <div className="features__card features__card-1">
            <h2>Track</h2>
            <h5>Monitor your mood daily and discover patterns over time.</h5>
          </div>
        </div>

        <div className="features__type">
          <img src={feature1} alt="illustration for write feature" className="features-image" />
          <div className="features__card features__card-2">
            <h2>Write</h2>
            <h5>Capture your thoughts and reflect with journaling.</h5>
          </div>
        </div>

        <div className="features__type features__type--slideRight">
          <img
            src={feature3}
            alt="illustration insights feature"
            className="features-image features-image--sizing"
          />
          <div className="features__card features__card-3">
            <h2>Insights</h2>
            <h5>Analyze trends, gain insights into emotional behaviors.</h5>
          </div>
        </div>

        <div className="features__type">
          <img src={feature4} alt="illustration for uplift feature" className="features-image" />
          <div className="features__card features__card-4">
            <h2>Uplift</h2>
            <h5>
              Boost your well-being with personalized uplifting activities.
            </h5>
          </div>
        </div>
      </section>

      <Testimonials />
      
      <footer className="footer">
        <h6 className="footer__text">Reflectify© 2024</h6>
      </footer>
    </div>
  );
}
