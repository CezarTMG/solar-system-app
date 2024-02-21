import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Mars = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const marsTexture = textureLoader.load("./2k_mars.jpg");
        
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: marsTexture });
        const mars = new THREE.Mesh(geometry, material);
        scene.add(mars);

        camera.position.z = 1.5;
        
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
            mars.rotation.y += 0.01;
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
                <h2>Mars Information</h2>
                <p>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System,
                    after Mercury. It is often referred to as the "Red Planet" because of its reddish appearance
                    due to iron oxide prevalent on its surface.
                </p>
                <p>
                    - Diameter: 6,779 km
                </p>
                <p>
                    - Mass: 6.39 × 10^23 kg
                </p>
                <p>
                    - Surface temperature: -87 to -5 °C
                </p>
                <p>
                    - Distance from Sun: 227.9 million km
                </p>
                <p>
                    - Moons: Phobos, Deimos
                </p>
                <a href="https://en.wikipedia.org/wiki/Mars" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Mars;
