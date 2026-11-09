// Cocolito 3D de la portada: una cocolitosfera procedural (placolitos calcáreos sobre una célula)
// que gira, sigue al puntero y se va desintegrando al bajar por la página.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let S = null; // estado único: el lienzo se reutiliza cuando la página se vuelve a pintar

function hasGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; }
}

// Puntos repartidos de forma uniforme sobre una esfera (espiral de Fibonacci)
function fibonacci(n) {
  const pts = [], g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i;
    pts.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
  }
  return pts;
}

function build() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.HemisphereLight(0xeef5ff, 0x4a3424, 1.35));
  const key = new THREE.DirectionalLight(0xffe0bf, 2.4); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(0x5f9dff, 2.4); rim.position.set(-6, -2, -4); scene.add(rim);
  const fill = new THREE.PointLight(0xff7a3d, 6, 14); fill.position.set(-3, -3, 4); scene.add(fill);

  const world = new THREE.Group(); scene.add(world);

  // Célula central
  const cell = new THREE.Mesh(new THREE.SphereGeometry(1.0, 64, 48),
    new THREE.MeshStandardMaterial({ color: 0x23323c, roughness: 0.55, metalness: 0.05 }));
  world.add(cell);

  // Placolito: escudo doble (perfil girado) + elementos radiales en el escudo superior
  const prof = [[0.16, -0.17], [0.9, -0.13], [1.0, -0.08], [0.95, -0.03], [0.44, -0.02], [0.38, 0.02],
    [0.8, 0.05], [0.86, 0.1], [0.8, 0.145], [0.22, 0.13]].map(p => new THREE.Vector2(p[0], p[1]));
  const shieldGeo = new THREE.LatheGeometry(prof, 72);
  const ribGeo = new THREE.BoxGeometry(0.035, 0.022, 0.4); ribGeo.translate(0, 0.148, 0.6);

  const calcite = new THREE.MeshPhysicalMaterial({ color: 0xfbf9f4, roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.3, sheen: 0.4, sheenColor: new THREE.Color(0xbfd8ff), transparent: true });
  const ribMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.28, clearcoat: 0.8, transparent: true });

  const N = 24, RIBS = 22;
  const shields = new THREE.InstancedMesh(shieldGeo, calcite, N);
  const ribs = new THREE.InstancedMesh(ribGeo, ribMat, N * RIBS);
  world.add(shields, ribs);

  const up = new THREE.Vector3(0, 1, 0);
  const items = fibonacci(N).map((p, i) => {
    const rnd = (k) => { const x = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    return {
      dir: p,
      q: new THREE.Quaternion().setFromUnitVectors(up, p).multiply(new THREE.Quaternion().setFromAxisAngle(up, rnd(1) * Math.PI * 2)),
      s: 0.8 + rnd(2) * 0.1,
      fly: 1.2 + rnd(3) * 2.6,
      tumble: new THREE.Vector3(rnd(4) - 0.5, rnd(5) - 0.5, rnd(6) - 0.5).normalize(),
      spin: (rnd(7) - 0.5) * 6
    };
  });

  const m = new THREE.Matrix4(), mr = new THREE.Matrix4(), pos = new THREE.Vector3(), sc = new THREE.Vector3(), qq = new THREE.Quaternion(), qt = new THREE.Quaternion();
  const ribLocal = [];
  for (let k = 0; k < RIBS; k++) ribLocal.push(new THREE.Matrix4().makeRotationY((k / RIBS) * Math.PI * 2));

  // t = 0 intacta; t = 1 placolitos dispersos (metáfora de la corrosión y la crisis biocalcificadora)
  function layout(t) {
    const e = t * t * (3 - 2 * t);
    items.forEach((it, i) => {
      pos.copy(it.dir).multiplyScalar(1.02 + e * it.fly);
      qt.setFromAxisAngle(it.tumble, e * it.spin);
      qq.copy(qt).multiply(it.q);
      const s = it.s * (1 - e * 0.35);
      sc.set(s, s, s);
      m.compose(pos, qq, sc);
      shields.setMatrixAt(i, m);
      for (let k = 0; k < RIBS; k++) { mr.multiplyMatrices(m, ribLocal[k]); ribs.setMatrixAt(i * RIBS + k, mr); }
    });
    shields.instanceMatrix.needsUpdate = true; ribs.instanceMatrix.needsUpdate = true;
    calcite.opacity = ribMat.opacity = 1 - e * 0.75;
    cell.scale.setScalar(1 - e * 0.25);
    cell.material.opacity = 1;
  }
  layout(0);

  return { renderer, scene, camera, world, layout, host: null, ro: null, io: null, visible: true, raf: 0, t: 0, tTarget: 0, px: 0, py: 0, rx: 0, ry: 0 };
}

function size() {
  const r = S.host.getBoundingClientRect();
  const w = Math.max(1, r.width), h = Math.max(1, r.height);
  S.renderer.setSize(w, h, false);
  S.camera.aspect = w / h; S.camera.updateProjectionMatrix();
}

function progress() {
  const hero = S.host && S.host.parentElement; if (!hero) return 0;
  const r = hero.getBoundingClientRect();
  return Math.min(1, Math.max(0, -r.top / (r.height * 0.85)));
}

function frame() {
  S.raf = 0;
  if (!S.visible || !S.host || !S.host.isConnected) return;
  if (!reduced) {
    S.world.rotation.y += 0.0025;
    S.ry += (S.px * 0.6 - S.ry) * 0.05;
    S.rx += (S.py * 0.35 - S.rx) * 0.05;
    S.world.rotation.x = S.rx;
    S.world.position.x = S.ry * 0.15;
    S.tTarget = progress();
    S.t += (S.tTarget - S.t) * 0.08;
    S.layout(S.t);
  }
  S.renderer.render(S.scene, S.camera);
  if (!reduced) S.raf = requestAnimationFrame(frame);
}

function attach() {
  const host = document.getElementById("coco3d");
  if (!host) return;
  if (!hasGL()) { host.remove(); return; }
  if (!S) {
    S = build();
    addEventListener("pointermove", (ev) => { S.px = ev.clientX / innerWidth * 2 - 1; S.py = ev.clientY / innerHeight * 2 - 1; }, { passive: true });
    S.ro = new ResizeObserver(() => { if (S.host) { size(); if (reduced) S.renderer.render(S.scene, S.camera); } });
    S.io = new IntersectionObserver((en) => { S.visible = en[0].isIntersecting; if (S.visible && !S.raf) frame(); });
  }
  if (S.host) { S.ro.unobserve(S.host); S.io.unobserve(S.host); }
  S.host = host;
  host.appendChild(S.renderer.domElement);
  S.ro.observe(host); S.io.observe(host);
  size();
  if (!S.raf) frame();
}

addEventListener("secaba:render", attach);
attach();
