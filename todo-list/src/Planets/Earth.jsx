import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Earth = () => {
    const containerRef = useRef();

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("./8k_earth_daymap.jpg");
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);

        camera.position.z = 3;

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({map: starTexture,side: THREE.BackSide });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.01; 
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
        <div
            ref={containerRef}
            style={{ width: "100%", height: "100vh" }}
        >

        </div>
        <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
            <h2>Earth Information</h2>
            <p>
                Earth is the third planet from the Sun and the only astronomical object known to harbor life.
                About 29% of Earth's surface is land, with the remaining 71% covered with water.
            </p>
            <p>
                - Surface area : 510,064,472 km2
            </p>
            <p>
                - Mass : 	5.972 × 1024 kg
            </p>
            <p>
                - Density : 5.51 g/cm3
            </p>
            <p>
                - Distance from Sun : 149,600,000 km / 92,960,000 miles
            </p>
            <p>
                - Pressure : 1,013.25 hPa
            </p>
            <p>
                - Natural satellites : Moon
            </p>
            <a href = 'https://en.wikipedia.org/wiki/Earth' style={{ color: "lightgreen", textDecoration: "none" }}>- Click here for more info</a>
        </div>
    </div>
    );
};

export default Earth;
