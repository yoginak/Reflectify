import React, { useState, useEffect } from "react";
import "./Insights.scss";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function Insights() {
  const [insights, setInsights] = useState("");
  const [journals, setJournals] = useState([]);
  const [moods, setMoods] = useState([]);
  const { userId } = useAuth();

  const getMoodInsights = async (moodData, journalData) => {
    const sampleData = {
      insights:
        "Here are some tips for you to boost your mood and enhance your well-being 🌟: Start your day with a moment of gratitude—acknowledge the good things in your life, no matter how small. Engage in physical activities like a morning jog or a fun workout, which can naturally uplift your spirits and boost your energy levels 💪. Connect with loved ones through a call or a quick message; meaningful interactions can provide comfort and joy. Consider exploring a new hobby or revisiting an old one that brings you pleasure and satisfaction 🎨. Practice relaxation techniques, such as deep breathing or meditation, to help manage stress and keep your mind clear 🧘‍♀️. Ensure you’re getting quality sleep and eating nutritious meals to support your overall health. Remember, taking these small steps can make a big difference in how you feel throughout the day. 🌈",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/openApi/getMoodInsights",
        {
          moodData,
          journalData,
        }
      );
      setInsights(response.data.insights);
    } catch (error) {
      // Fallback to sample data and log the error internally in case of insuuficient quota issue for OpenAPI GPT limit
      setInsights(sampleData.insights);
      console.error("Error fetching insights:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const selectedDate = new Date();
      try {
        const moodResponse = await axios.get(
          `http://localhost:8080/moods/${userId}?date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        const moodData = Array.isArray(moodResponse.data)
          ? moodResponse.data
          : [];
        setMoods(moodData);
      } catch (error) {
        console.error("Error fetching moods:", error.message);
        setMoods([]);
      }

      try {
        const journalResponse = await axios.get(
          `http://localhost:8080/journal/${userId}?date=${
            selectedDate.toISOString().split("T")[0]
          }`
        );
        const journalData = Array.isArray(journalResponse.data)
          ? journalResponse.data
          : [];
        setJournals(journalData);
      } catch (error) {
        console.error("Error fetching journals:", error.message);
        setJournals([]);
      }

      getMoodInsights(moods, journals);
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>{insights}</p>
    </div>
  );
}
