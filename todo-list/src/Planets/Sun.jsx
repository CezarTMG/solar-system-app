import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Sun = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(10, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const sunTexture = textureLoader.load("./f48f469bd71cd046d3e9cb340fb608ce_large.png");
        const material = new THREE.MeshBasicMaterial({ map: sunTexture });
        const sun = new THREE.Mesh(geometry, material);
        scene.add(sun);

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide 
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        camera.position.z = 25;

        const animate = () => {
            requestAnimationFrame(animate);
            sun.rotation.y += 0.01;
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
                <h2>Sun Information</h2>
                <p>
                    The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, 
                    heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as 
                    visible light and infrared radiation.
                </p>
                <p>
                    - Diameter: 1,391,684 km
                </p>
                <p>
                    - Mass: 1.989 × 10^30 kg
                </p>
                <p>
                    - Surface temperature: 5,500 °C
                </p>
                <p>
                    - Age: 4.6 billion years
                </p>
                <a href="https://en.wikipedia.org/wiki/Sun" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Sun;
