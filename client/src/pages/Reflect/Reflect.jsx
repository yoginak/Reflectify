import React, { useState, useEffect } from "react";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';
import "./Reflect.scss";

export default function Reflect() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journals, setJournals] = useState([]);
  const [moods, setMoods] = useState([]);
  const { userId } = useAuth();

  function setMoodEmoji(mood){
    let moodEmoji = null;
    if(mood ==="rad"){
      moodEmoji ="😁";
    }
    else if(mood ==="good"){
      moodEmoji ="😊";
    }
    else if(mood ==="loved"){
      moodEmoji ="😍";
    }
    else if(mood ==="bad"){
      moodEmoji ="😒";
    }
    else if(mood ==="meh"){
      moodEmoji ="😐";
    }
    else if(mood ==="angry"){
      moodEmoji ="😡";
    }
    else
    {
      moodEmoji;
    }
    return moodEmoji;
  }

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
      <div className="reflect__mood">
      <h2 className="reflect__section-header reflect__section-header--style">Moods for {selectedDate.toDateString()}</h2>
      {moods.length > 0 ? (
        moods.map((mood) => (
          <div className="reflect__mood-body" key={mood.id}>
            <p>Mood: {mood.mood} {setMoodEmoji(mood.mood)}</p>
            <p>{new Date(mood.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          </div>
        ))
      ) : (
        <p>No moods for this date.</p>
      )}
      </div>
      </section>

      <section className="reflect__section-bottom">
  <h2 className="reflect__section-header">Journals for {selectedDate.toDateString()}</h2>
  {journals.length > 0 ? (
    journals.map((journal, index) => (
      <div
        className={`reflect__section-body ${index % 2 === 0 ? 'bisque-background' : 'lightblue-background'}`}
        key={journal.id}
      >
        <h4>{journal.title}</h4>
        <p>{journal.content}</p>
        <p>{new Date(journal.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
      </div>
    ))
  ) : (
    <p>No journals for this date.</p>
  )}
</section>
    </main>
  );
};