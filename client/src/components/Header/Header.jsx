import React from 'react';
import logo from "../../assets/logos/header_img_logo.png"
import "./Header.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { BsFillJournalBookmarkFill, BsFillEmojiSmileFill, BsArrowUpCircle, BsBarChartFill , BsCalendarCheckFill} from 'react-icons/bs';  


export default function Header() {
  return (
    // <header className="header">
    //      <div className="header__logo-wrapper">
    //     <Link to="/">
    //       <img className="header__logo" src={logo} alt="Reflectify Logo" />
    //     </Link>
    //     </div>
    // </header>

    <>
    {[false].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Reflectify</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Reflectify
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/moods">
              <BsFillEmojiSmileFill style={{ marginRight: '8px', color: '#ffcc00' }} />
              Track Mood</Nav.Link> 
              <Nav.Link as={Link} to="/journal">
              <BsFillJournalBookmarkFill style={{ marginRight: '8px' }} />
              Write Journal</Nav.Link>  
              <Nav.Link as={Link} to="/uplift"><BsArrowUpCircle style={{ marginRight: '8px' }} />
              Uplift</Nav.Link>
              <Nav.Link as={Link} to="/insights">
              <BsBarChartFill style={{ marginRight: '8px' }} />
              Insights</Nav.Link>
              <Nav.Link as={Link} to="/reflect">
              <BsCalendarCheckFill style={{ marginRight: '8px' }} />
              Reflect</Nav.Link>             
              </Nav>                
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  )
}
