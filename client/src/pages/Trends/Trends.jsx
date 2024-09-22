import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillEnvelopeFill, BsDownload } from "react-icons/bs";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { userId } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchMoodData = async () => {
    try {
      const response = await axios.get(`${API_URL}moods/${userId}`);
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

  const formatMoodData = (data) => {
    return data.map((entry) => {
      const date = new Date(entry.timestamp);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString("en-US", options);

      return `On ${formattedDate}, you felt ${entry.mood}.`;
    });
  };

  const downloadFile = () => {
    const humanReadableMoods = formatMoodData(filteredMoodData);
    const data = humanReadableMoods.join("\n");
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mood_data.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareViaEmail = () => {
    downloadFile();
    const subject = encodeURIComponent("Mood Trends Data");
    const body = encodeURIComponent(
      "I have logged my mood data. Please find the downloadable file attached and refer to it for details."
    );
    console.log(JSON.stringify(filteredMoodData));
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_self");
  };

  return (
    <section className="trends">
      <h2 className="trends__heading">Mood Trends and Analysis</h2>
      <p className="trends__subtitle">
        Visualize your mood patterns and explore trends across different moods
        and categories to understand how your mood shifts within selected date
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
            maxDate={new Date()}
            placeholderText="Select start date"
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
            maxDate={new Date()}
            placeholderText="Select end date"
          />
        </div>
      </div>
      <div className="chart-container trends__charts">
        {startDate && endDate ? (
          <>
            <div className="trends__charts-bar">
              <Bar className="trends-bar" data={barChartData} />
            </div>
            <div className="trends__charts-bottom">
              <h4 className="trends__charts-title">
                Emotional Breakdown{" "}
                <p>Positive, Neutral, and Negative Mood Counter</p>
              </h4>
              <div className="trends__charts-pie">
              <Pie data={pieChartData} />
              </div>
            </div>

            <div className="icon-container">
              <div
                onClick={downloadFile}
                style={{ cursor: "pointer" }}
                className="icon-wrapper"
              >
                <BsDownload size={30} className="icon" />
                <span className="icon-label">Download</span>
              </div>

              <div
                onClick={shareViaEmail}
                style={{ cursor: "pointer" }}
                className="icon-wrapper"
              >
                <BsFillEnvelopeFill size={30} className="icon" />
                <span className="icon-label">Share</span>
              </div>
            </div>
          </>
        ) : (
          <p className="trends__message">
            Please select both start and end dates to view the charts.
          </p>
        )}
      </div>
    </section>
  );
}
