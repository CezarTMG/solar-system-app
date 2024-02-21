import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Neptune = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const neptuneTexture = textureLoader.load("./2k_neptune.jpg");

        const neptuneGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
        const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        scene.add(neptune);

        camera.position.z = 4;

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide 
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        const animate = () => {
            requestAnimationFrame(animate);
            neptune.rotation.y += 0.01; 
            renderer.render(scene, camera);
        };
        animate();

        const cleanup = () => {
            const container = containerRef.current;
            if (container && container.removeChild) {
                renderer.dispose();
                container.removeChild(renderer.domElement);
            }
        };

        return cleanup;
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
            <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
                <h2>Neptune Information</h2>
                <p>
                    Neptune is the eighth and farthest known planet from the Sun in the Solar System. 
                    It is a gas giant, composed primarily of hydrogen and helium, and is the densest giant planet.
                </p>
                <p>
                    - Diameter: 49,244 km
                </p>
                <p>
                    - Mass: 1.024 × 10^26 kg
                </p>
                <p>
                    - Surface temperature: -214 °C
                </p>
                <p>
                    - Distance from Sun: 4.495 billion km
                </p>
                <p>
                    - Moons: 14 (Triton, Proteus, Nereid, Larissa, and more)
                </p>
                <a href="https://en.wikipedia.org/wiki/Neptune" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Neptune;
