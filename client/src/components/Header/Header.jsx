import React, { useState } from "react";
import logo from "../../assets/logos/header_img_logo.png";
import headerLogo from "../../assets/logos/header_title_processed.png";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  BsFillJournalBookmarkFill,
  BsFillEmojiSmileFill,
  BsArrowUpCircle,
  BsBarChartFill,
  BsCalendarCheckFill,
  BsBoxArrowInRight
} from "react-icons/bs";

export default function Header() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  const { logout } = useAuth();

  return (
    <>
      <Navbar expand={false} className="header-custom">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src={headerLogo}
              alt="Reflectify Logo"
              style={{ width: "120px", height: "auto" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar`}
            onClick={handleShow}
            style={{ color: "white" }}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            show={showOffcanvas}
            onHide={handleClose}
            aria-labelledby={`offcanvasNavbarLabel`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Navbar.Brand as={Link} to="/" onClick={handleClose}>
                <img
                  src={logo}
                  alt="Reflectify Logo"
                  style={{ width: "120px", height: "auto" }}
                />
              </Navbar.Brand>
            </Offcanvas.Header>
            <Offcanvas.Body className="header__body">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/moods" onClick={handleClose}>
                  <BsFillEmojiSmileFill
                    style={{ marginRight: "8px", color: "#ffcc00" }}
                  />
                  Track Mood
                </Nav.Link>
                <Nav.Link as={Link} to="/journal" onClick={handleClose}>
                  <BsFillJournalBookmarkFill style={{ marginRight: "8px" }} />
                  Write Journal
                </Nav.Link>
                <Nav.Link as={Link} to="/reflect" onClick={handleClose}>
                  <BsCalendarCheckFill style={{ marginRight: "8px" }} />
                  Reflect
                </Nav.Link>
                <Nav.Link as={Link} to="/trends" onClick={handleClose}>
                  <BsBarChartFill style={{ marginRight: "8px" }} />
                  Trends
                </Nav.Link>
                <Nav.Link as={Link} to="/uplift" onClick={handleClose}>
                  <BsArrowUpCircle style={{ marginRight: "8px" }} />
                  Uplift
                </Nav.Link>
                <Nav.Link onClick={() => { logout(); handleClose(); }}>
                  <BsBoxArrowInRight style={{ marginRight: "8px" }} />
                  Logout
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
