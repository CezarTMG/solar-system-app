import React from 'react';
import './App.css';
import SolarSystem from './SolarSystem';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sun from "./Planets/Sun.jsx";
import Mercury from "./Planets/Mercury.jsx";
import Venus from './Planets/Venus.jsx';
import Earth from './Planets/Earth.jsx';
import Mars from './Planets/Mars.jsx';
import Jupiter from './Planets/Jupiter.jsx';
import Saturn from './Planets/Saturn.jsx';
import Uranus from './Planets/Uranus.jsx';
import Neptune from './Planets/Neptune.jsx';


const App = () => {

  const[planets, setPlanets]= useState([]);

  return (
    <Router>
      <div>
        <Navbar/>
      <Routes>
        <Route exact path="/" element={<SolarSystem/>} />
        {planets.map(planet => (
                        <Route key={planet.name} path={`/${planet.page}`} element={<PlanetPage planetName={planet.name} />} />
                    ))}
        
        <Route path="/Sun" element={<Sun/>} />
        <Route path="/Mercury" element={<Mercury/>} />
        <Route path="/Venus" element={<Venus />} />
        <Route path="/Earth" element={<Earth />} />
        <Route path="/Mars" element={<Mars />} />
        <Route path="/Jupiter" element={<Jupiter />} />
        <Route path="/Saturn" element={<Saturn />} />
        <Route path="/Uranus" element={<Uranus />} />
        <Route path="/Neptune" element={<Neptune />} />
      </Routes>
      </div>
    </Router>
  );
};

const PlanetPage = ({ planetName }) => {
  const { page } = useParams();

  switch (page) {
      case "Mercury.jsx":
          return <Mercury />;
      case "Venus":
          return <Venus />;
      case "Earth":
          return <Earth />;
      case "Mars":
          return <Mars />;
      case "Jupiter":
          return <Jupiter />;
      case "Saturn":
          return <Saturn />;
      case "Uranus":
          return <Uranus />;
      case "Neptune":
          return <Neptune />;
      default:
          return <div>Page not found</div>;
  }
};


export default App;
