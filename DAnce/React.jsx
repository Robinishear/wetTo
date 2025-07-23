import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PointLightShadowWithHero = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const statsRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer, stats;
    let pointLight, pointLight2;

    const container = containerRef.current;

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 10, 40);

    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x111122, 3));

    function generateTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 2;
      const context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 1, 2, 1);
      return canvas;
    }

    function createLight(color) {
      const intensity = 200;
      const light = new THREE.PointLight(color, intensity, 20);
      light.castShadow = true;
      light.shadow.bias = -0.005;

      let geometry = new THREE.SphereGeometry(0.3, 12, 6);
      let material = new THREE.MeshBasicMaterial({ color: color });
      material.color.multiplyScalar(intensity);
      let sphere = new THREE.Mesh(geometry, material);
      light.add(sphere);

      const texture = new THREE.CanvasTexture(generateTexture());
      texture.magFilter = THREE.NearestFilter;
      texture.wrapT = THREE.RepeatWrapping;
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.set(1, 4.5);

      geometry = new THREE.SphereGeometry(2, 32, 8);
      material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        alphaMap: texture,
        alphaTest: 0.5,
      });

      sphere = new THREE.Mesh(geometry, material);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      light.add(sphere);

      return light;
    }

    pointLight = createLight(0x0088ff);
    scene.add(pointLight);

    pointLight2 = createLight(0xff8888);
    scene.add(pointLight2);

    const geometry = new THREE.BoxGeometry(30, 30, 30);
    const material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 10,
      specular: 0x111111,
      side: THREE.BackSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 10;
    mesh.receiveShadow = true;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 10, 0);
    controls.update();

    stats = new Stats();
    container.appendChild(stats.dom);

    rendererRef.current = renderer;
    statsRef.current = stats;

    function animate() {
      const time = performance.now() * 0.001;

      pointLight.position.x = Math.sin(time * 0.6) * 9;
      pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
      pointLight.position.z = Math.sin(time * 0.8) * 9;

      pointLight.rotation.x = time;
      pointLight.rotation.z = time;

      const t2 = time + 10000;

      pointLight2.position.x = Math.sin(t2 * 0.6) * 9;
      pointLight2.position.y = Math.sin(t2 * 0.7) * 9 + 6;
      pointLight2.position.z = Math.sin(t2 * 0.8) * 9;

      pointLight2.rotation.x = t2;
      pointLight2.rotation.z = t2;

      renderer.render(scene, camera);
      stats.update();

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", onWindowResize);

      if (renderer && renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }

      if (stats && stats.dom && container) {
        container.removeChild(stats.dom);
      }

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          color: "#ffffff",
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 className="text-blue-800">Welcome to TaskNinja!</h1>

        <p
          className="text-blue-800"
          style={{
            fontSize: "1.2rem",
            marginTop: "1rem",
            fontWeight: "normal",
          }}
        >
          Discover cutting-edge technology and expert services designed to help
          your business thrive in a competitive market.
        </p>
        <p align="center ">
          <img
            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&duration=3000&pause=1000&color=00FFEA&center=true&width=435&lines=Self-taught+Developer;MERN+Stack+Enthusiast;Future+Millionaire💸"
            alt="Typing SVG "
          />
        </p>
      </div>
    </div>
  );
};

export default PointLightShadowWithHero;
