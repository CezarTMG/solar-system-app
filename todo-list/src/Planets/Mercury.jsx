import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Mercury = () => {
    const containerRef = useRef();
    let renderer = useRef();

    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer.current = new THREE.WebGLRenderer();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.current.domElement);

        const geometry = new THREE.SphereGeometry(0.7, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("./2k_mercury.jpg");
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mercury = new THREE.Mesh(geometry, material);
        scene.add(mercury);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 2;

        const starGeometry = new THREE.SphereGeometry(500, 64, 64);
        const starTexture = new THREE.TextureLoader().load("/8k_stars_milky_way.jpg");
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            side: THREE.BackSide 
        });
        const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starsBackground);


        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            mercury.rotation.y += 0.01; 
            renderer.current.render(scene, camera);
        };
        animate();

        return () => {
            if (renderer.current) {
                renderer.current.dispose();
                renderer.current.forceContextLoss(); 
            }
            const container = containerRef.current;
            if (container && container.removeChild) {
                container.removeChild(renderer.current.domElement);
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div
                ref={containerRef}
                style={{ width: "100%", height: "100vh" }}
            >

            </div>
            <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
                <h2>Mercury Information</h2>
                <p>
                    Mercury is the smallest planet in the Solar System and the closest to the Sun. 
                    It is named after the Roman deity Mercury, the messenger of the gods.
                </p>
                <p>
                    - Surface area : 74.800.000 km²
                </p>
                <p>
                    - Mass : 3.30104 × 1023 kg
                </p>
                <p>
                    - Density : 13.5 g/mL
                </p>
                <p>
                    - Distance from Sun : 58 million kilometers / 36 million miles
                </p>
                <p>
                    - Pressure : 5 x 10-15 bar
                </p>
                <p>
                    - Natural satellites : none
                </p>
                <p>
                    - Duration of rotation around the Sun : 59 Earth days
                </p>
                <a href = 'https://en.wikipedia.org/wiki/Mercury' style={{ color: "lightgreen", textDecoration: "none" }}>- Click here for more info</a>
            </div>
        </div>
    );
};

export default Mercury;
