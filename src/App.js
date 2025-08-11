import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DrawingCompetition from "./components/DrawingCompetition";
import TeacherAwards from "./components/TeacherAwards";
import Timeline from "./components/Timeline";
import Prizes from "./components/Prizes";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Results from "./components/Results";
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/vote" element={<PublicVoting />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;