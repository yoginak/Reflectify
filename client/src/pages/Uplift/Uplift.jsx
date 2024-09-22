import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Mindfulness from "../../components/Mindfulness/Mindfulness";
import Meditation from "../../components/Meditation/Meditation";
import "./Uplift.scss";

export default function Uplift() {
  const [activeTab, setActiveTab] = useState("mindfulness");

  const handleSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  return (
    <>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="mindfulness"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link className="uplift__tab" eventKey="mindfulness">
            Mindfulness
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="uplift__tab" eventKey="guided-meditation">
            Meditation
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div>
        {activeTab === "mindfulness" && <Mindfulness />}
        {activeTab === "guided-meditation" && <Meditation />}
      </div>
    </>
  );
}
