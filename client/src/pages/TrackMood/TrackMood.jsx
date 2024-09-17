import React, { useState } from 'react';
import "./TrackMood.scss";
import { TypeAnimation } from "react-type-animation";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';

export default function TrackMood() {
  const [selectedMood, setSelectedMood] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [modalTitle, setModalTitle] = useState(''); 
  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleMoodClick = (mood) => {
    setSelectedMood(mood); 
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async () => {
    if (!selectedMood) {
      setModalTitle('Submission Failed');
      setModalMessage('Please select a mood before submitting.');
      setShowModal(true);
      return;
    }

    const data = {
      user_id: userId,
      mood: selectedMood,
    };

    try {
      const response = await axios.post('http://localhost:8080/moods/', data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {        
        setSelectedMood(null);
        navigate('/reflect');  
      } else {
        setModalTitle('Submission Failed');
        setModalMessage('Failed to update mood, please try again.');
        setShowModal(true);
      }
    } catch (error) {
      setModalTitle('Error');
      setModalMessage('An error occurred while updating your mood.');
      setShowModal(true);
      console.error('Error updating mood:', error);
    }
  };

  return (
    <div className='mood-tracker'>
      <div>
        <TypeAnimation
          className='mood__header'
          sequence={["How are you feeling today?", 2000]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
        />
      </div>
      
      <div className="emoji-container">
        <div className="wrapper">
          <div className="positive">
            {/* Loved Mood */}
            <div
              className={`emoji love ${selectedMood === 'loved' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('loved')}
            >
              <div className='mood__wrapper'>
                <h4>loved</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="heart-eye"><span className="heart"></span></span>
                    <span className="heart-eye"><span className="heart"></span></span>
                  </span>
                  <span className="mouth tounge"></span>
                </figure>
              </div>
            </div>

            {/* Rad Mood */}
            <div
              className={`emoji laugh ${selectedMood === 'rad' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('rad')}
            >
              <div className='mood__wrapper'>
                <h4>rad</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="eye"></span>
                    <span className="eye"></span>
                  </span>
                  <span className="mouth tounge"></span>
                </figure>
              </div>
            </div>

            {/* Good Mood */}
            <div
              className={`emoji smile ${selectedMood === 'good' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('good')}
            >
              <div className='mood__wrapper'>
                <h4>good</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="eye"></span>
                    <span className="eye"></span>
                  </span>
                  <span className="mouth"></span>
                </figure>
              </div>
            </div>
          </div>

          <div className="negative">
            {/* Meh Mood */}
            <div
              className={`emoji speechless ${selectedMood === 'meh' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('meh')}
            >
              <div className='mood__wrapper'>
                <h4>meh</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="eye"></span>
                    <span className="eye"></span>
                  </span>
                  <span className="mouth"></span>
                </figure>
              </div>
            </div>

            {/* Bad Mood */}
            <div
              className={`emoji sad ${selectedMood === 'bad' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('bad')}
            >
              <div className='mood__wrapper'>
                <h4>bad</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="eye"></span>
                    <span className="eye"></span>
                  </span>
                  <span className="mouth tounge"></span>
                </figure>
              </div>
            </div>

            {/* Angry Mood */}
            <div
              className={`emoji angry ${selectedMood === 'angry' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('angry')}
            >
              <div className='mood__wrapper'>
                <h4>angry</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="eye"></span>
                    <span className="eye"></span>
                  </span>
                  <span className="mouth"></span>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='button-wrapper'>
        <Button variant="dark" className='mood-button' onClick={handleSubmit}>
          Save Mood
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
