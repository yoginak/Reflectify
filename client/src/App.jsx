import './App.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.css';
import TrackMood from './pages/TrackMood/TrackMood';
import WriteJournal from './pages/WriteJournal/WriteJournal';
import Uplift from './pages/Uplift/Uplift';
import Insights from './pages/Insights/Insights';
import Reflect from './pages/Reflect/Reflect';

function App() {
 
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/moods" element={<TrackMood/>} />   
        <Route path="/journal" element={<WriteJournal/>} /> 
        <Route path="/reflect" element={<Reflect/>} />    
        <Route path="/uplift" element={<Uplift/>} /> 
        <Route path="/insights" element={<Insights/>} />     
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
