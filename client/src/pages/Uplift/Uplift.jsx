import React from "react";
import "./Uplift.scss";

export default function Uplift() {
  return (
    <section className="Uplift">
      <div className="Uplift__title-wrapper">
        <h2>4-7-8 Breathing Technique: A Simple Path to Deep Relaxation</h2>
        <p>
          The 4-7-8 breathing technique, also known as "Relaxing Breath," is a
          simple yet powerful breathing exercise designed to help calm your
          nervous system, reduce stress, and promote relaxation. This technique
          was popularized by Dr. Andrew Weil, a pioneer in integrative medicine.
          It combines the natural power of deep, rhythmic breathing with a
          structured pattern that can be practiced anywhere, anytime.
        </p>
        <h4>How to Do It:</h4>
        <p>Inhale gently through your nose for 4 seconds.</p>
        <p>Hold your breath for 7 seconds.</p>
        <p>Exhale fully through your mouth for 8 seconds.</p>
        <p>Repeat the cycle for 4-8 rounds.</p>
      </div>
      <div className="uplift__animation">
        <div className="container  breathing-container">
          <div className="circle"></div>
        </div>
      </div>
      <div className="uplift__audio">
        <iframe
          width="100%"
          height="450"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/328705064&color=%23d4c6a1&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        ></iframe>
      </div>
    </section>
  );
}
