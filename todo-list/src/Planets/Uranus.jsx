import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Uranus = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const uranusTexture = textureLoader.load("./dc3y4yc-387492ce-f09a-4372-b1a6-eed0d23c914e.png");

        const uranusGeometry = new THREE.SphereGeometry(2, 32, 32);
        const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
        const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
        scene.add(uranus);

        camera.position.z = 5;

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
            uranus.rotation.y += 0.01; // Rotate Uranus
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
                <h2>Uranus Information</h2>
                <p>
                    Uranus is the seventh planet from the Sun and the third-largest in the Solar System. 
                    It is a gas giant with an icy atmosphere and is composed mainly of hydrogen and helium.
                </p>
                <p>
                    - Diameter: 50,724 km
                </p>
                <p>
                    - Mass: 8.681 × 10^25 kg
                </p>
                <p>
                    - Surface temperature: -224 °C
                </p>
                <p>
                    - Distance from Sun: 2.871 billion km
                </p>
                <p>
                    - Moons: 27 (Miranda, Ariel, Umbriel, Titania, Oberon, and more)
                </p>
                <a href="https://en.wikipedia.org/wiki/Uranus" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Uranus;
