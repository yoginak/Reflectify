import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Insights.scss";

export default function Insights() {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(answers).forEach((key) => {
      if (!answers[key]) {
        formErrors[key] =
          "This field cannot be empty. Please provide an answer.";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleGetInsight = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/openApi/getTherapistInsights",
        {
          answers: Object.values(answers),
        }
      );
      setInsight(response.data.insights);
      setShowForm(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setInsight(
          "Here are some tips for you: Take a deep breath, focus on a small task that brings you joy, and practice mindfulness for a few minutes. 😊"
        );
      } else {
        console.error("Error fetching insights:", error);
        setInsight(
          "Here are some tips for you: Stay positive, take small steps toward maintaining balance in your life, and engage in activities that make you feel fulfilled. 😊"
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Your Emotional Wellness Check-In</h2>
      <p>
        Share how you've been feeling lately, and we'll offer AI-driven insights
        and suggestions to enhance your mood and mental balance.
      </p>

      {showForm ? (
        <form>
          <div className="form-group">
            <label>How have you been feeling emotionally?</label>
            <input
              type="text"
              className={`form-control ${errors.question1 ? "is-invalid" : ""}`}
              name="question1"
              value={answers.question1}
              onChange={handleInputChange}
            />
            {errors.question1 && (
              <div className="invalid-feedback">{errors.question1}</div>
            )}
          </div>
          <div className="form-group">
            <label>Have you experienced stress or anxiety recently?</label>
            <input
              type="text"
              className={`form-control ${errors.question2 ? "is-invalid" : ""}`}
              name="question2"
              value={answers.question2}
              onChange={handleInputChange}
            />
            {errors.question2 && (
              <div className="invalid-feedback">{errors.question2}</div>
            )}
          </div>
          <div className="form-group">
            <label>How have your relationships been lately?</label>
            <input
              type="text"
              className={`form-control ${errors.question3 ? "is-invalid" : ""}`}
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
            />
            {errors.question3 && (
              <div className="invalid-feedback">{errors.question3}</div>
            )}
          </div>
          <div className="form-group">
            <label>How do you spend your free time?</label>
            <input
              type="text"
              className={`form-control ${errors.question4 ? "is-invalid" : ""}`}
              name="question4"
              value={answers.question4}
              onChange={handleInputChange}
            />
            {errors.question4 && (
              <div className="invalid-feedback">{errors.question4}</div>
            )}
          </div>
          <div className="form-group">
            <label>Do you feel well-rested and energetic?</label>
            <input
              type="text"
              className={`form-control ${errors.question5 ? "is-invalid" : ""}`}
              name="question5"
              value={answers.question5}
              onChange={handleInputChange}
            />
            {errors.question5 && (
              <div className="invalid-feedback">{errors.question5}</div>
            )}
          </div>
          <button
            className="btn btn-primary mt-3 insights__button"
            onClick={handleGetInsight}
            disabled={loading || !showForm}
          >
            {loading ? "Generating Insights..." : "Get Insights"}
          </button>
        </form>
      ) : null}

      <div className="mt-4">
        {insight && <div className="alert insights__results">{insight}</div>}
      </div>
    </div>
  );
}
