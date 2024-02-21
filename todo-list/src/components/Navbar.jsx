import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import planetsData from '../db.json'
import { useState, useEffect } from "react";


const Navbar = () => {

    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/planets')
            .then(response => response.json())
            .then(data => {
                setPlanets(data.planets);
            });
    }, []);

    return (
        <nav id='nav'>
            <div id='nav-left'>
                <ul>
                    <li>
                        <Link to="/">Solar System</Link>
                    </li>
                    <li>
                        <Link to="/Sun">Sun</Link>
                    </li>
                    {planetsData.planets.map((planet) => (
                        <li key={planet.name}>
                            <Link to={`/${planet.page}`}>{planet.name}</Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className='nav-right'>
                <p>Solar System Map</p>
            </div>
        </nav>
    );
    };

export default Navbar;
