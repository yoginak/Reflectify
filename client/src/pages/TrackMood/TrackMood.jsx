import React, { useState } from 'react';
import "./TrackMood.scss";
import { TypeAnimation } from "react-type-animation";
import { Button } from "react-bootstrap";
import axios from 'axios';

export default function TrackMood() {
  const userId = 3; 
  const [selectedMood, setSelectedMood] = useState(null); 

  
  const handleMoodClick = (mood) => {
    setSelectedMood(mood); 
  };

    const handleSubmit = async () => {
    if (!selectedMood) {
      alert('Please select a mood before submitting.');
      return;
    }

    const data = {
      user_id: userId,
      mood: selectedMood,
    };

    try {
      const response = await axios.post('http://localhost:8080/journal/', journalData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 201){
        const result = await response.json();
        console.log('Mood updated successfully:', result);
        setSelectedMood(null); 
      } else {
        console.error('Failed to update mood:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating mood:', error);
    }
  };

  return (
    <div className='mood-tracker'>
      <div>
        <TypeAnimation
          className='mood__header'
          sequence={[
            "How are you feeling today?",
            2000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
        />
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="positive">
            <div
              className={`emoji love ${selectedMood === 'loved' ? 'selected' : ''}`}
              onClick={() => handleMoodClick('loved')}
            >
              <div className='mood__wrapper'>
                <h4>loved</h4>
                <figure className="face">
                  <span className="eyes">
                    <span className="heart-eye">
                      <span className="heart"></span>
                    </span>
                    <span className="heart-eye">
                      <span className="heart"></span>
                    </span>
                  </span>
                  <span className="mouth tounge"></span>
                </figure>
              </div>
            </div>
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
        <Button variant="primary" className='mood-button' onClick={handleSubmit}>
          Save Mood
        </Button>
      </div>
    </div>
  );
}