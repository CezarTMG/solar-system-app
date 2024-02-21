import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Saturn = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const saturnTexture = textureLoader.load("./saturn_planetary_texture_stock_image_by_uxmal750ad_d8f7djy-fullview.jpg");
        
        const geometry = new THREE.SphereGeometry(3, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: saturnTexture });
        const saturn = new THREE.Mesh(geometry, material);
        scene.add(saturn);

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide 
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);

        const ringGeometry = new THREE.RingGeometry(5, 8, 32);
        const ringTexture = textureLoader.load("./small_ring_tex.png");
        const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });
        const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);
        saturnRing.position.set(0, 0, 0);
        saturnRing.rotation.x = 1; 
        saturn.add(saturnRing); 

        camera.position.z = 13;

        const animate = () => {
            requestAnimationFrame(animate);
            saturn.rotation.y += 0.01;
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
                <h2>Saturn Information</h2>
                <p>
                    Saturn is the sixth planet from the Sun and the second-largest in the Solar System, 
                    after Jupiter. It is a gas giant with an average radius of about nine times that of Earth.
                </p>
                <p>
                    - Diameter: 116,460 km
                </p>
                <p>
                    - Mass: 5.683 × 10^26 kg
                </p>
                <p>
                    - Surface temperature: -178 °C
                </p>
                <p>
                    - Distance from Sun: 1.429 billion km
                </p>
                <p>
                    - Moons: 82 (Titan, Enceladus, Rhea, and more)
                </p>
                <a href="https://en.wikipedia.org/wiki/Saturn" style={{ color: "lightgreen", textDecoration: "none" }}>
                    - Click here for more info
                </a>
            </div>
        </div>
    );
};

export default Saturn;
