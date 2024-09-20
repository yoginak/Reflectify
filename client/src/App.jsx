import "./App.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.css";
import TrackMood from "./pages/TrackMood/TrackMood";
import WriteJournal from "./pages/WriteJournal/WriteJournal";
import Uplift from "./pages/Uplift/Uplift";
import Trends from "./pages/Trends/Trends";
import Reflect from "./pages/Reflect/Reflect";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Insights from "./pages/Insights/Insights";

function App() {
  const ProtectedRoute = ({ element, ...rest }) => {
    const { token, userId } = useAuth();
    return token ? element : <Navigate to="/auth/login" replace />;
  };

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<SignUp />} />
            <Route
              path="/moods"
              element={<ProtectedRoute element={<TrackMood />} />}
            />
            <Route
              path="/journal"
              element={<ProtectedRoute element={<WriteJournal />} />}
            />
            <Route
              path="/reflect"
              element={<ProtectedRoute element={<Reflect />} />}
            />
            <Route
              path="/uplift"
              element={<ProtectedRoute element={<Uplift />} />}
            />
            <Route
              path="/insights"
              element={<ProtectedRoute element={<Insights />} />}
            />
            <Route
              path="/trends"
              element={<ProtectedRoute element={<Trends />} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          
          </AuthProvider>
        </BrowserRouter>
      
    </>
  );
}

export default App;
