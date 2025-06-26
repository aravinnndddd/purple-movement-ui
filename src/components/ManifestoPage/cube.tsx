import React from "react";
import "./cube.css"; // this is where the 3D styles live

const Cube3D: React.FC = () => {
  return (
    <div className="perspective-container">
      <div className="cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default Cube3D;
