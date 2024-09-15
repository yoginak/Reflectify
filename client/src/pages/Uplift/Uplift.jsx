import React from "react";
import "./Uplift.scss";

export default function Uplift() {
  return (
    <section className="Uplift">
      <div className="uplift__animation">
        <div className="container">
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
