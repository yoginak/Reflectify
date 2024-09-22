import React from "react";
import "./Meditation.scss";

export default function Meditation() {
  return (
    <section className="meditation">
      <div className="meditation__title-wrapper">
        <h2 className="meditation__title">
          Guided Meditation: Journey to Tranquility
        </h2>
        <p className="meditation__subtitle">
          Embark on a peaceful journey with our curated collection of guided meditation audios. 🎧✨<br/>
          Let soothing voices and calming music lead you to deep relaxation and
          self-discovery. Perfect for reducing stress, enhancing focus, or
          escaping daily life, our meditations provide a sanctuary of
          tranquility whenever you need it. 🌿🧘‍♀️<br/>
          Dive in and transform your
          stillness into inner harmony. 🌈💖
        </p>
      </div>
      <div className="meditation__audio">
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
