import React from "react";
import "./Mindfulness.scss";

export default function Mindfulness() {
  return (
    <section className="mindfulness">
      <div className="mindfulness__animation-wrapper">
        <div className="mindfulness__title-wrapper">
          <h2>Mindfulness: A Simple Path to Deep Relaxation</h2>
          <p>
            Discover the calming power of the 4-7-8 breathing exercise. This
            simple method, popularized by Dr. Andrew Weil, helps soothe your
            nervous system, ease stress, and promote relaxation. 🧘‍♀️
          </p>
          <h4>How to Do It:</h4>
          <p>1. Inhale through your nose for 4 seconds.</p>
          <p>2. Hold your breath for 7 seconds.</p>
          <p>3. Exhale through your mouth for 8 seconds.</p>
          <p>4. Repeat the cycle for 4-8 rounds.</p>
          <p>
            Sync your inhalations, pauses, and exhalations with the visual cue ✨<br/> 
            embrace the soothing rhythm and let tranquility take over.🌿
          </p>
        </div>
        <div className="mindfulness__animation">
          <div className="breathing-container">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
