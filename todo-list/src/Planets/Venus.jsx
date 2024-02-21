import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Venus = () => {
    const containerRef = useRef();

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const venusGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const venusTextureLoader = new THREE.TextureLoader();
        const venusTexture = venusTextureLoader.load("/2k_venus_surface.jpg");
        const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        scene.add(venus);

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide 
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        camera.position.z = 3;

        const animate = () => {
            requestAnimationFrame(animate);
            venus.rotation.y += 0.01; 
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (containerRef.current && containerRef.current.removeChild) {
                renderer.dispose();
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
            <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
                <h2>Venus Information</h2>
                <p>
                    Venus is the second planet from the Sun and is often called Earth's "sister planet" due to their similar size, mass, and proximity to the Sun.
                </p>
                <p>
                    - Surface area: 4.6023 × 10^8 km²
                </p>
                <p>
                    - Mass: 4.8675 × 10^24 kg
                </p>
                <p>
                    - Density: 5.243 g/cm³
                </p>
                <p>
                    - Distance from Sun: 108.2 million km / 67.2 million miles
                </p>
                <p>
                    - Pressure: 92 bar
                </p>
                <p>
                    - No natural satellites
                </p>
                <p>
                    - Duration of rotation around the Sun : 243 Earth days
                </p>
                <a href="https://en.wikipedia.org/wiki/Venus" style={{ color: "lightgreen", textDecoration: "none" }}>- Click here for more info</a>
            </div>
        </div>
    );
};

export default Venus;
