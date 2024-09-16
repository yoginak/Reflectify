import React from "react";
import "./Mindfulness.scss"

export default function Mindfulness() {
  return (
    <section className="mindfulness">
      <div className="mindfulness__animation-wrapper">
        <div className="mindfulness__title-wrapper">
          <h2>Mindfulness: A Simple Path to Deep Relaxation</h2>
          <p>
            The 4-7-8 breathing technique, also known as "Relaxing Breath," is a
            simple yet powerful breathing exercise designed to help calm your
            nervous system, reduce stress, and promote relaxation. This
            technique was popularized by Dr. Andrew Weil, a pioneer in
            integrative medicine. It combines the natural power of deep,
            rhythmic breathing with a structured pattern that can be practiced
            anywhere, anytime.
          </p>
          <h4>How to Do It:</h4>
          <p>1. Inhale gently through your nose for 4 seconds.</p>
          <p>2. Hold your breath for 7 seconds.</p>
          <p>3. Exhale fully through your mouth for 8 seconds.</p>
          <p>4. Repeat the cycle for 4-8 rounds.</p>
        </div>
        <div className="mindfulness__animation">
          <div className="container breathing-container">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
