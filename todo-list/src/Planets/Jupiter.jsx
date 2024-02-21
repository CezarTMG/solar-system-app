import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Jupiter = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const jupiterTexture = textureLoader.load("./jupiter_color_large.jpg");
        
        const geometry = new THREE.SphereGeometry(6, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: jupiterTexture });
        const jupiter = new THREE.Mesh(geometry, material);
        scene.add(jupiter);

        camera.position.z = 15;

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide // Render the texture on the inside of the sphere
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        const animate = () => {
            requestAnimationFrame(animate);
            jupiter.rotation.y += 0.01;
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
                <h2>Jupiter Information</h2>
                <p>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                    It is a gas giant with a mass one-thousandth that of the Sun, but two and a
                    half times that of all the other planets in the Solar System combined.
                </p>
                <p>
                    - Diameter: 139,822 km
                </p>
                <p>
                    - Mass: 1.898 × 10^27 kg
                </p>
                <p>
                    - Surface temperature: -145 °C
                </p>
                <p>
                    - Distance from Sun: 778.5 million km
                </p>
                <p>
                    - Moons: 79 (Io, Europa, Ganymede, Callisto, and more)
                </p>
                <a href="https://en.wikipedia.org/wiki/Jupiter" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Jupiter;
