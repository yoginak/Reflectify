import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Trends.scss";
import { useAuth } from "../../contexts/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Trends() {
  const [moodData, setMoodData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { userId } = useAuth();

  const fetchMoodData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/moods/${userId}`);
      setMoodData(response.data);
    } catch (error) {
      console.error("Error fetching mood data:", error);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, []);

  const filteredMoodData = moodData.filter((entry) => {
    const entryDate = new Date(entry.timestamp);
    return entryDate >= startDate && entryDate <= endDate;
  });

  const moodCounts = filteredMoodData.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    },
    { good: 0, bad: 0, meh: 0, rad: 0, loved: 0, angry: 0 }
  );

  const categoryCounts = {
    Positive: moodCounts.good + moodCounts.loved + moodCounts.rad,
    Neutral: moodCounts.meh,
    Negative: moodCounts.bad + moodCounts.angry,
  };

  const barChartData = {
    labels: ["Good😊", "Bad😒", "Meh😐", "Rad😁", "Loved😍", "Angry😡"],
    datasets: [
      {
        label: "Mood Count",
        data: [
          moodCounts.good,
          moodCounts.bad,
          moodCounts.meh,
          moodCounts.rad,
          moodCounts.loved,
          moodCounts.angry,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Good
          "rgba(255, 99, 132, 0.6)", // Bad
          "rgba(255, 206, 86, 0.6)", // Meh
          "rgba(153, 102, 255, 0.6)", // Rad
          "rgba(255, 159, 64, 0.6)", // Loved
          "rgba(255, 99, 71, 0.6)", // Angry
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Good
          "rgba(255, 99, 132, 1)", // Bad
          "rgba(255, 206, 86, 1)", // Meh
          "rgba(153, 102, 255, 1)", // Rad
          "rgba(255, 159, 64, 1)", // Loved
          "rgba(255, 99, 71, 1)", // Angry
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Mood Categories",
        data: [
          categoryCounts.Positive,
          categoryCounts.Neutral,
          categoryCounts.Negative,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Positive
          "rgba(255, 206, 86, 0.6)", // Neutral
          "rgba(255, 99, 132, 0.6)", // Negative
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Positive
          "rgba(255, 206, 86, 1)", // Neutral
          "rgba(255, 99, 132, 1)", // Negative
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="trends">
      <h2 className="trends__heading">Mood Trends and Analysis</h2>
      <p className="trends__subtitle">
        Visualize your mood patterns and explore trends across different moods and
        categories to understand how your mood shifts within selected date
        ranges.
      </p>
      <div className="date-picker">
        <div className="trends__date">
        <label className="trends__date-label">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        </div>
        <div className="trends__date">
        <label className="trends__date-label">End Date:&nbsp;&nbsp;</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        </div>
      </div>
      <div className="chart-container trends__charts">
        <div className="trends__charts-bar">
          <Bar className="trends-bar" data={barChartData} />
        </div>
        <div className="trends__charts-pie">
          <h4 className="trends__charts-title">
            Emotional Breakdown <p>Positive, Neutral, and Negative Mood Counter</p>
          </h4>
          
          <Pie data={pieChartData} />
        </div>
      </div>
    </section>
  );
}
