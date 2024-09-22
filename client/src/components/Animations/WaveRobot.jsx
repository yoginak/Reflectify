import React, { useEffect, useRef } from 'react';
import lottie from "lottie-web";
import waveRobotAnimation from "../../assets/animations/waverobot.json";


const WaveRobot = () => {
    const animation = useRef(null);
    console.log("WaveRobot component rendered"); 
    useEffect(() => {
      console.log("useEffect called");
      const anim = lottie.loadAnimation({
        container: animation.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: waveRobotAnimation,
      });
      return () => anim.destroy(); 
    }, []);
  
    return <div style={{ height: 250}} ref={animation}></div>;
  };

  export default WaveRobot;
