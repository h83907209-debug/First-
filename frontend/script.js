/* LOGIN */
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("main").style.display = "block";
    initGlobe();
  } else {
    alert("ACCESS DENIED");
  }
}

/* 3D GLOBE */
let scene, camera, renderer, globe;

function initGlobe() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, 400);
  document.getElementById("globe").appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(2, 64, 64);

  const texture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );

  globe = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ map: texture })
  );

  scene.add(globe);

  camera.position.z = 5;

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002;
  renderer.render(scene, camera);
}

/* SCAN SYSTEM */

async function scan() {

  const number = document.getElementById("numberInput").value;

  document.getElementById("status").innerText = "Scanning...";

  const res = await fetch("http://localhost:3001/api/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: number })
  });

  const data = await res.json();

  document.getElementById("status").innerText = "COMPLETE ✔";

  document.getElementById("result").innerHTML = `
    <p>PHONE: ${data.data.phone}</p>
    <p>NAME: ${data.data.fullName}</p>
    <p>ADDRESS: ${data.data.address}</p>
  `;
}
