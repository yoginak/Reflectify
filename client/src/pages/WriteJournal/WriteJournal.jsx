import React, { useState, Suspense } from "react";
import { Card, Row, Col, Form, Button, Modal } from "react-bootstrap";
const WaveRobot = React.lazy(() =>
  import("../../components/Animations/WaveRobot")
);
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./WriteJournal.scss";
import axios from "axios";

export default function WriteJournal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const navigate = useNavigate();
  const { userId } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!title || !content) {
      setModalTitle("Submission Failed");
      setModalMessage("Title and content are required");
      setShowModal(true);
      setLoading(false);
      return;
    }

    const journalData = {
      user_id: userId,
      title,
      content,
    };

    try {
      const response = await axios.post(`${API_URL}journal/`, journalData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setTitle("");
        setContent("");
        navigate("/reflect");
      } else {
        setModalTitle("Submission Failed");
        setModalMessage('"Error saving journal entry. Please try again.');
        setShowModal(true);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setModalMessage("Error saving journal entry.");
        setShowModal(true);
      } else {
        setModalTitle("Submission Failed");
        setModalMessage(
          "Failed to save journal entry. Please check the server or network."
        );
        setShowModal(true);
      }
      console.error("Error during submission:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="journal">
        <Suspense fallback={<div>Loading...</div>}>
          <Row>
            <Col xs={12} md={6} className="animation">
              <WaveRobot />
            </Col>
            <Col
              className="d-flex justify-content-center align-items-center"
              xs={12}
              md={6}
            >
              <TypeAnimation
                className="journal__header"
                sequence={[
                  "Hey there!",
                  2000,
                  "What’s on your mind?",
                  2000,
                  "Jot it down in your journal!",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </Col>
          </Row>
          <Row className="mt-4 d-flex justify-content-center align-items-center">
            <Col className="login-form">
              <Card className="shadow">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="entryTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Title for your entry"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="textEntry">
                      <Form.Label>How was your day?</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="journal__textarea"
                        placeholder="How was your day?"
                        rows={14}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="dark"
                      className="journal__button"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Suspense>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="modal-button"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
