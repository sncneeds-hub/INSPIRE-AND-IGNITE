import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useState } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DrawingCompetition from "./components/DrawingCompetition";
import TeacherAwards from "./components/TeacherAwards";
import Timeline from "./components/Timeline";
import Prizes from "./components/Prizes";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Results from "./components/Results";
import LoginForm from "./components/auth/LoginForm";
import SchoolDashboard from "./components/school/SchoolDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import PublicVoting from "./components/voting/PublicVoting";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <DrawingCompetition />
        <TeacherAwards />
        <Timeline />
        <Prizes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/vote" element={<PublicVoting />} />
          <Route 
            path="/school/login" 
            element={<LoginForm userType="school" onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin/login" 
            element={<LoginForm userType="admin" onLogin={handleLogin} />} 
          />
          <Route 
            path="/school/dashboard" 
            element={
              user && user.userType === 'school' ? 
                <SchoolDashboard user={user} onLogout={handleLogout} /> : 
                <LoginForm userType="school" onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              user && user.userType === 'admin' ? 
                <AdminDashboard user={user} onLogout={handleLogout} /> : 
                <LoginForm userType="admin" onLogin={handleLogin} />
            } 
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;