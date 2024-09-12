import React, { useState, useEffect } from "react";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
import axios from 'axios';
import "./Reflect.scss";

export default function Reflect() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journals, setJournals] = useState([]);
  const [moods, setMoods] = useState([]);
  const userId =3;

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/journal/${userId}?date=${selectedDate.toISOString().split('T')[0]}`);
        const data = response.data;
        setJournals(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching journals:', error);
        setJournals([]);
      }
    };

    const fetchMoods = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/moods/${userId}?date=${selectedDate.toISOString().split('T')[0]}`);
        const data = response.data;
        setMoods(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching moods:', error);
        setMoods([]);
      }
    };

    fetchJournals();
    fetchMoods();
  }, [selectedDate]);

  return (
    <main className="reflect">
      <section className="reflect__section-top">
      <div className="reflect-calendar">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          disableFuture
        />
      </LocalizationProvider>
      </div>
      <div className="reflect-mood">
      <h2>Moods for {selectedDate.toDateString()}</h2>
      {moods.length > 0 ? (
        moods.map((mood) => (
          <div key={mood.id}>
            <p>Mood: {mood.mood}</p>
            <small>{new Date(mood.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No moods for this date.</p>
      )}
      </div>
      </section>

      <section className="reflect__section-bottom">
      <h2>Journals for {selectedDate.toDateString()}</h2>
      {journals.length > 0 ? (
        journals.map((journal) => (
          <div key={journal.id}>
            <h3>{journal.title}</h3>
            <p>{journal.content}</p>
            <small>{new Date(journal.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No journals for this date.</p>
      )}
      </section>     
    </main>
  );
};