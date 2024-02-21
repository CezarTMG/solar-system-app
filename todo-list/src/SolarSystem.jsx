import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useNavigate } from "react-router-dom";


const SolarSystem = () => {
  const containerRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const handlePlanetClick = (planetName) => {
    navigate(`/planet/${planetName}`);}
  
  let animationId;

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
    antialias: true, // Enable antialiasing for smoother edges
      powerPreference: "high-performance", // Use the GPU for rendering if available
      alpha: true, // Enable transparency support
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    if (!containerRef.current) return;
      // console.log(renderer);
      // renderer.domElement.addEventListener('click', (e) => console.log(e), false);

      const raycaster = new THREE.Raycaster();
      const clickPosition = new THREE.Vector3();
      renderer.domElement.addEventListener('click', (event) => {
        console.log(event);
        // Convert click coordinates to normalized device coordinates
        const x = event.clientX / renderer.domElement.clientWidth * 2 - 1;
        const y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        // Unproject the vector to obtain a world-space ray
        clickPosition.set(x, y, 0.5);
        raycaster.setFromCamera(clickPosition, camera);
        // Perform raycasting on specific objects (optional)
        const clickables = [sun, earth]; // Replace with your objects
        const intersections = raycaster.intersectObjects(clickables);
        if (intersections.length > 0) {
          const clickedObject = intersections[0].object;
          // Trigger your event or perform actions based on clickedObject
          console.log("Clicked on", clickedObject.name);
        }
      });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    const cameraViewProjectionMatrix = new THREE.Matrix4(); // Define cameraViewProjectionMatrix
    const frustum = new THREE.Frustum(); // Define frustum

    const controls = new OrbitControls(camera, renderer.domElement);

    // Create starfield
    const starGeometry = new THREE.SphereGeometry(500, 100, 100);
    const starTexture = new THREE.TextureLoader().load(
      "./8k_stars_milky_way.jpg"
    );
    const starMaterial = new THREE.MeshBasicMaterial({
      map: starTexture,
      side: THREE.BackSide,
    });
    const starsBackground = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starsBackground);

    // const interaction = new Interaction(renderer, scene, camera);

    //SUN!!!
    const sunGeometry = new THREE.SphereGeometry(40, 100, 100);
    const sunTextureLoader = new THREE.TextureLoader();
    const sunTexture = sunTextureLoader.load(
      "./f48f469bd71cd046d3e9cb340fb608ce_large.png"
    );
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    // sun.addEventListener('click', () => console.log('sun'));
    // sun.addEventListener('click', () => handlePlanetClick('sun'));
    sun.name = "sun";
    scene.add(sun);

    //EARTH!!!
    const earthGeometry = new THREE.SphereGeometry(4, 32, 32);
    const earthTextureLoader = new THREE.TextureLoader();
    const earthTexture = earthTextureLoader.load("/8k_earth_daymap.jpg");
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.name = "earth";
    earth.position.set(100, 0, 0);
    scene.add(earth);
    const earthOrbitRadius = 100;
    const earthOrbitSpeed = 0.20;

    //Mercury
    const mercuryGeometry = new THREE.SphereGeometry(2, 32, 32);
    const mercuryTextureLoader = new THREE.TextureLoader();
    const mercuryTexture = mercuryTextureLoader.load("./2k_mercury.jpg");
    const mercuryMaterial = new THREE.MeshBasicMaterial({
      map: mercuryTexture,
    });
    const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    mercury.name = "mercury";
    mercury.position.set(60, 0, 0);
    const mercuryOrbitRadius = 60;
    const mercuryOrbitSpeed = 0.25;
    scene.add(mercury);

    // VENUS
    const venusGeometry = new THREE.SphereGeometry(3, 32, 32);
    const venusTextureLoader = new THREE.TextureLoader();
    const venusTexture = venusTextureLoader.load("./2k_venus_surface.jpg");
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.name = "venus";
    venus.position.set(80, 0, 0);
    const venusOrbitRadius = 80;
    const venusOrbitSpeed = 0.23;
    scene.add(venus);

    // MARS
    const marsGeometry = new THREE.SphereGeometry(3, 20, 20);
    const marsTextureLoader = new THREE.TextureLoader();
    const marsTexture = marsTextureLoader.load("./2k_mars.jpg");
    const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.name = "mars";
    const marsOrbitRadius = 120;
    const marsOrbitSpeed = 0.18;
    mars.position.set(120, 0, 0);
    scene.add(mars);

    // SATURN
    const saturnGeometry = new THREE.SphereGeometry(8, 32, 32);
    const saturnTextureLoader = new THREE.TextureLoader();
    const saturnTexture = saturnTextureLoader.load(
      "./saturn_texture_map__fictional_rework__by_magentameteorite_ddeq42t-fullview.jpg"
    );
    const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturn.name = "saturn";
    saturn.position.set(180, 0, 0);
    const saturnOrbitRadius = 180;
    const saturnOrbitSpeed = 0.1;
    scene.add(saturn);

    // SATURN'S RINGS
    const saturnRingGeometry = new THREE.RingGeometry(18,13, 32);
    const saturnRingTextureLoader = new THREE.TextureLoader();
    const saturnRingTexture = saturnRingTextureLoader.load(
      "./dg5tai3-38ef3d34-6a38-4978-a0b4-918c4ba06612.png"
    );
    const saturnRingMaterial = new THREE.MeshBasicMaterial({
      map: saturnRingTexture,
      side: THREE.DoubleSide,
    });
    const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
    saturnRing.rotation.x = Math.PI / 2;
    saturn.add(saturnRing);

    //JUPITER
    const jupiterGeometry = new THREE.SphereGeometry(13, 32, 32);
    const jupiterTextureLoader = new THREE.TextureLoader();
    const jupiterTexture = jupiterTextureLoader.load(
      "./jupiter_color_large.jpg"
    );
    const jupiterMaterial = new THREE.MeshBasicMaterial({
      map: jupiterTexture,
    });
    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiter.name = "jupiter";
    jupiter.position.set(160, 0, 0);
    const jupiterOrbitRadius = 140; 
    const jupiterOrbitSpeed = 0.15; 
    scene.add(jupiter);


    // URANUS
    const uranusGeometry = new THREE.SphereGeometry(7, 32, 32);
    const uranusTextureLoader = new THREE.TextureLoader();
    const uranusTexture = uranusTextureLoader.load(
      "./dc3y4yc-387492ce-f09a-4372-b1a6-eed0d23c914e.png"
    );
    const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
    const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
    uranus.name = "uranus";
    uranus.position.set(210, 0, 0);
    const uranusOrbitRadius = 210;
    const uranusOrbitSpeed = 0.08;
    scene.add(uranus);
    console.log(uranus);

    // NEPTUNE
    const neptuneGeometry = new THREE.SphereGeometry(6, 32, 32);
    const neptuneTextureLoader = new THREE.TextureLoader();
    const neptuneTexture = neptuneTextureLoader.load("./2k_neptune.jpg");
    const neptuneMaterial = new THREE.MeshBasicMaterial({
      map: neptuneTexture,
    });
    const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    neptune.name = "neptune";
    neptune.position.set(250, 0, 0);
    const neptuneOrbitRadius = 250;
    const neptuneOrbitSpeed = 0.07;
    scene.add(neptune);

    const planets = [];
    const planetNames = [];
    const colors = [];

    camera.position.z = 500;
    const clock = new THREE.Clock();

    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        setIsPaused((prevIsPaused) => !prevIsPaused);
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    const disposeUnusedResources = () => {
      // Dispose of textures
      sunTexture.dispose();
      earthTexture.dispose();
      mercuryTexture.dispose();
      venusTexture.dispose();
      marsTexture.dispose();
      saturnTexture.dispose();
      saturnRingTexture.dispose();
      jupiterTexture.dispose();
      uranusTexture.dispose();
      neptuneTexture.dispose();
    
      // Dispose of geometries
      sunGeometry.dispose();
      earthGeometry.dispose();
      mercuryGeometry.dispose();
      venusGeometry.dispose();
      marsGeometry.dispose();
      saturnGeometry.dispose();
      saturnRingGeometry.dispose();
      jupiterGeometry.dispose();
      uranusGeometry.dispose();
      neptuneGeometry.dispose();
    
      // Dispose of materials
      sunMaterial.dispose();
      earthMaterial.dispose();
      mercuryMaterial.dispose();
      venusMaterial.dispose();
      marsMaterial.dispose();
      saturnMaterial.dispose();
      saturnRingMaterial.dispose();
      jupiterMaterial.dispose();
      uranusMaterial.dispose();
      neptuneMaterial.dispose();
    };
  const x = 0; 
  const y = 0; 
  const z = 0; 

  

  // Create LOD for distant objects
  const lod = new THREE.LOD();

  
  const highDetailMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );

  
  const lowDetailMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );

  lod.addLevel(highDetailMesh, 0); // High detail mesh for closer distance
  lod.addLevel(lowDetailMesh, 100); // Low detail mesh for farther distance
  lod.position.set(x, y, z); 
  scene.add(lod);

    const animate = () => {
      // if (isPaused) return;
      const elapsedTime = clock.getElapsedTime();
      animationId = requestAnimationFrame(animate);

      camera.updateMatrixWorld();
      
      cameraViewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

      scene.traverse((object) => {
        if (object.isMesh) {
          // Calculate the object's world-space bounding box
          const boundingBox = new THREE.Box3().setFromObject(object);

          // Check if the bounding box intersects with the camera's view frustum
          if (frustum.intersectsBox(boundingBox)) {
            // If the bounding box intersects, the object is within the view frustum
            object.visible = true;
          } else {
            // If the bounding box does not intersect, the object is outside the view frustum
            object.visible = false;
          }
        }
      });

      sun.rotation.y += -0.01;
      earth.rotation.y += -0.06;
      mercury.rotation.y += -0.06;
      venus.rotation.y += -0.06;
      mars.rotation.y += -0.06;
      saturn.rotation.y += -0.08;
      jupiter.rotation.y += -0.1;
      uranus.rotation.y += -0.04;
      neptune.rotation.y += -0.03;

      //JUPITER ORBIT
      const jupiterAngle = elapsedTime * jupiterOrbitSpeed;
      jupiter.position.x = Math.cos(jupiterAngle) * jupiterOrbitRadius;
      jupiter.position.z = Math.sin(jupiterAngle) * jupiterOrbitRadius;

      //Mercury Orbit
      const mercuryAngle = elapsedTime * mercuryOrbitSpeed;
      mercury.position.x = Math.cos(mercuryAngle) * mercuryOrbitRadius;
      mercury.position.z = Math.sin(mercuryAngle) * mercuryOrbitRadius;

      //Venus Orbit
      const venusAngle = elapsedTime * venusOrbitSpeed;
      venus.position.x = Math.cos(venusAngle) * venusOrbitRadius;
      venus.position.z = Math.sin(venusAngle) * venusOrbitRadius;

      //Earth Orbit
      const earthAngle = elapsedTime * earthOrbitSpeed;
      earth.position.x = Math.cos(earthAngle) * earthOrbitRadius;
      earth.position.z = Math.sin(earthAngle) * earthOrbitRadius;

      //Mars Orbit
      const marsAngle = elapsedTime * marsOrbitSpeed;
      mars.position.x = Math.cos(marsAngle) * marsOrbitRadius;
      mars.position.z = Math.sin(marsAngle) * marsOrbitRadius;

      //Saturn Orbit
      const saturnAngle = elapsedTime * saturnOrbitSpeed;
      saturn.position.x = Math.cos(saturnAngle) * saturnOrbitRadius;
      saturn.position.z = Math.sin(saturnAngle) * saturnOrbitRadius;

      //Uranus Orbit
      const uranusAngle = elapsedTime * uranusOrbitSpeed;
      uranus.position.x = Math.cos(uranusAngle) * uranusOrbitRadius;
      uranus.position.z = Math.sin(uranusAngle) * uranusOrbitRadius;

      //Neptune Orbit
      const neptuneAngle = elapsedTime * neptuneOrbitSpeed;
      neptune.position.x = Math.cos(neptuneAngle) * neptuneOrbitRadius;
      neptune.position.z = Math.sin(neptuneAngle) * neptuneOrbitRadius;
      

      planets.forEach((planet, index) => {
        const angle = (Math.PI / 360) * 1; 
        const x =
          planet.position.x * Math.cos(angle) -
          planet.position.z * Math.sin(angle);
        const z =
          planet.position.x * Math.sin(angle) +
          planet.position.z * Math.cos(angle);
        planet.position.set(x, 0, z);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    const distances1 = [30, 40, 50, 60, 80, 100]; // Distances of planets from the Sun

    planetNames.forEach((index) => {
      const angle = (Math.PI / 180) * (360 / planetNames.length) * index;
      const x = Math.cos(angle) * distances1[index];
      const z = Math.sin(angle) * distances1[index];

      const planetGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const planetMaterial = new THREE.MeshBasicMaterial({
        color: colors[index],
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      planet.position.set(x, 0, z);
      planets.push(planet);
      scene.add(planet);
    });

    // if (!isPaused) {
    //   animate();
    // }
    animate();

    return () => {
      disposeUnusedResources();
      if (containerRef.current && renderer.domElement){
      containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, );



  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      // setIsPaused((prevIsPaused) => !prevIsPaused);
      // cancelAnimationFrame(animationId);
      console.log(animationId);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    // return () => {
    //   document.removeEventListener("keypress", handleKeyPress);
    // };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SolarSystem;
