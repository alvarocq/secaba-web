// Testigo de Cau en 3D: medio testigo de sondeo (cara de corte con las capas) que la cámara recorre
// al hacer scroll, con los hitos del OAE 1a y una curva de δ13C. ESQUEMA: se sustituirá por los datos reales.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const BG = 0x0b1116, LEN = 150, U = 10; // 150 m de testigo; 1 unidad = 10 m
let S = null;

const TX = {
  es: {
    kick: "Sección estrella", title: "El testigo de Cau, en 3D",
    intro: "Más de 150 metros de roca extraídos en 2015 en Cau (Alicante) registran todo el Aptiense. Baja por el testigo para recorrer el inicio del evento anóxico, metro a metro.",
    note: "Esquema ilustrativo: capas, posiciones y curva de δ13C aproximadas. Se sustituirán por los datos reales del sondeo.",
    start: ["Empieza el descenso", "Haz scroll para bajar por el testigo, de las capas más modernas a las más antiguas."],
    depth: "m de profundidad", legend: "δ13C (esquema)", pxs: "Desarrollado por PXS",
    m: [
      [10, "Aptiense superior", "La parte más moderna del testigo, cuando el océano ya se había recuperado del evento."],
      [58, "Fase volcánica principal", "Los isótopos de osmio indican que la gran actividad de Ontong Java llegó después del inicio del OAE 1a (Martínez-Rodríguez et al., 2021)."],
      [80, "OAE 1a · Episodio Selli", "Capas oscuras ricas en materia orgánica: el fondo marino se quedó sin oxígeno."],
      [97, "Inicio de la excursión isotópica", "Caída brusca del δ13C en la base del segmento Ap3: una entrada masiva de carbono ligero. Su primera fase duró menos de 10 000 años."],
      [113, "Crisis de los nannocónidos", "Estas algas calcáreas empiezan a desaparecer antes del evento anóxico. Por qué, es una de las preguntas del proyecto."],
      [145, "Base del Aptiense", "Límite Barremiense/Aptiense, cuya definición internacional sigue en discusión."]
    ]
  },
  en: {
    kick: "Featured", title: "The Cau core, in 3D",
    intro: "Over 150 metres of rock drilled in 2015 at Cau (Alicante) record the whole Aptian. Scroll down the core to travel through the onset of the anoxic event, metre by metre.",
    note: "Illustrative sketch: layers, positions and the δ13C curve are approximate. They will be replaced with the real core data.",
    start: ["Start the descent", "Scroll to travel down the core, from the youngest to the oldest layers."],
    depth: "m depth", legend: "δ13C (sketch)", pxs: "Developed by PXS",
    m: [
      [10, "Late Aptian", "The youngest part of the core, after the ocean had recovered from the event."],
      [58, "Main volcanic phase", "Osmium isotopes show that the main Ontong Java activity came after the onset of OAE 1a (Martínez-Rodríguez et al., 2021)."],
      [80, "OAE 1a · Selli Episode", "Dark, organic-rich layers: the seafloor ran out of oxygen."],
      [97, "Onset of the isotope excursion", "A sharp drop in δ13C at the base of segment Ap3: a massive input of light carbon. Its first phase lasted less than 10,000 years."],
      [113, "Nannoconid crisis", "These calcareous algae begin to disappear before the anoxic event. Why is one of the project’s questions."],
      [145, "Base of the Aptian", "The Barremian/Aptian boundary, whose international definition is still under discussion."]
    ]
  }
};
const MCOL = ["#9fb3c8", "#ff6b6b", "#b28cff", "#ff8a4c", "#f2c14e", "#74a9e8"];

function hasGL() { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } }
function lang() { return document.documentElement.lang === "en" ? "en" : "es"; }

// δ13C esquemático (‰) frente a profundidad (m)
const KEYS = [[0, 3.2], [30, 3.5], [58, 4.4], [70, 4.0], [82, 2.4], [92, 0.9], [96, 0.6], [98, 2.2], [113, 2.3], [150, 2.0]];
function d13c(d) {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [d0, v0] = KEYS[i], [d1, v1] = KEYS[i + 1];
    if (d >= d0 && d <= d1) return v0 + (v1 - v0) * ((d - d0) / (d1 - d0)) + Math.sin(d * 1.7) * 0.08 + Math.sin(d * 0.53) * 0.12;
  }
  return 2;
}

function injectCSS() {
  if (document.getElementById("c3css")) return;
  const st = document.createElement("style"); st.id = "c3css";
  st.textContent = `
.c3sec{background:#0b1116;color:#eef2f4;padding:clamp(64px,9vw,120px) 0 0}
.c3sec .kick{color:#ff8a4c}
.c3-head{display:grid;gap:14px;margin-bottom:clamp(24px,4vw,48px)}
.c3-head .h2{color:#eef2f4}
.c3-intro{max-width:62ch;font-size:clamp(1.02rem,1.5vw,1.2rem);color:rgba(238,242,244,.88)}
.c3-note{max-width:70ch;font:500 .74rem/1.5 "IBM Plex Mono",ui-monospace,monospace;color:#f2c14e}
.c3-scroll{position:relative;height:420vh}
.c3-stage{position:sticky;top:0;height:100vh;overflow:hidden}
.c3-canvas{position:absolute;inset:0}
.c3-canvas canvas{width:100%;height:100%;display:block}
.c3-labels{position:absolute;inset:0;pointer-events:none}
.c3-lab{position:absolute;left:0;top:0;display:flex;align-items:center;gap:8px;font:600 .8rem/1.2 "Public Sans",system-ui,sans-serif;color:#eef2f4;white-space:nowrap;transition:opacity .2s}
.c3-lab i{width:28px;height:2px;background:currentColor;display:block}
.c3-lab span{color:#eef2f4;background:rgba(11,17,22,.75);padding:3px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.18)}
.c3-hud{position:absolute;top:max(16px,env(safe-area-inset-top,0px));right:max(16px,env(safe-area-inset-right,0px));display:grid;justify-items:end;gap:4px;text-align:right}
.c3-depth{font:800 clamp(2rem,5vw,3.6rem)/1 "Bricolage Grotesque",sans-serif;font-variant-numeric:tabular-nums}
.c3-depth small{font:500 .72rem "IBM Plex Mono",monospace;opacity:.7;margin-left:6px}
.c3-leg{font:500 .72rem "IBM Plex Mono",monospace;color:#ff8a4c;display:flex;align-items:center;gap:6px}
.c3-leg::before{content:"";width:22px;height:3px;background:#ff8a4c;border-radius:2px}
.c3-card{position:absolute;left:max(16px,env(safe-area-inset-left,0px));bottom:max(20px,env(safe-area-inset-bottom,0px));max-width:min(400px,calc(100% - 32px));background:rgba(11,17,22,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.16);border-left:4px solid var(--mc,#ff8a4c);border-radius:14px;padding:16px 18px;display:grid;gap:6px}
.c3-card .k{font:500 .7rem "IBM Plex Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--mc,#ff8a4c)}
.c3-card h3{font:700 1.3rem/1.15 "Bricolage Grotesque",sans-serif;color:#fff;margin:0}
.c3-card p{font-size:.92rem;color:rgba(238,242,244,.88);margin:0}
.c3-fallback{padding-bottom:clamp(48px,7vw,96px)}
.c3-pxs{position:absolute;top:16px;left:max(16px,env(safe-area-inset-left,0px));z-index:2;font:600 .78rem/1 "Public Sans",system-ui,sans-serif;letter-spacing:.02em;color:#eef2f4;text-decoration:none;padding:8px 12px;border-radius:999px;background:rgba(11,17,22,.6);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:background .15s,border-color .15s}
.c3-pxs:hover,.c3-pxs:focus-visible{background:rgba(255,138,76,.18);border-color:#ff8a4c}
@media (max-width:700px){.c3-lab span{font-size:.7rem}.c3-hud{top:12px}}`;
  document.head.appendChild(st);
}

function build() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(BG, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(BG, 4.5, 12);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 40);

  scene.add(new THREE.HemisphereLight(0xdfeaff, 0x1a120c, 1.1));
  const key = new THREE.DirectionalLight(0xffe2c4, 2.2); key.position.set(3, 2, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fa0ff, 1.4); rim.position.set(-4, 1, -3); scene.add(rim);

  const R = 0.42;
  // Capas: grosor y litología pseudoaleatorios pero estables; capas oscuras en el intervalo del OAE 1a
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const lith = { cal: 0xd2cbbb, marl: 0x9b958b, dark: 0x5c5853, shale: 0x1f1d1c };
  const core = new THREE.Group(); scene.add(core);
  let d = 0;
  while (d < LEN) {
    const th = 0.6 + rnd() * 1.9;
    const mid = d + th / 2;
    let c;
    if (mid > 72 && mid < 99) c = rnd() < 0.55 ? lith.shale : lith.dark;
    else c = rnd() < 0.5 ? lith.cal : (rnd() < 0.8 ? lith.marl : lith.dark);
    const h = Math.min(th, LEN - d) / U, y = -(d / U) - h / 2;
    const col = new THREE.Color(c);
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 40, 1, true, Math.PI / 2, Math.PI),
      new THREE.MeshStandardMaterial({ color: col.clone().multiplyScalar(0.82), roughness: 0.85, side: THREE.DoubleSide }));
    shell.position.y = y; core.add(shell);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(2 * R, h),
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 }));
    face.position.set(0, y, 0); core.add(face);
    d += th;
  }
  // Marcas de profundidad cada 10 m
  const tickMat = new THREE.MeshBasicMaterial({ color: 0x6b7a86 });
  for (let m = 0; m <= LEN; m += 10) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(m % 50 === 0 ? 0.22 : 0.12, 0.008, 0.008), tickMat);
    t.position.set(-R - 0.14, -m / U, 0.01); core.add(t);
  }
  // Anillos de los hitos
  const rings = TX.es.m.map((mk, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(R + 0.03, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(MCOL[i]) }));
    ring.rotation.x = Math.PI / 2; ring.position.y = -mk[0] / U; core.add(ring);
    return ring;
  });
  // Curva de δ13C flotando junto al testigo
  const pts = [];
  for (let m = 0; m <= LEN; m += 0.5) pts.push(new THREE.Vector3(0.62 + d13c(m) * 0.2, -m / U, 0.05));
  const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 900, 0.014, 6, false),
    new THREE.MeshBasicMaterial({ color: 0xff8a4c }));
  scene.add(tube);
  const axis = new THREE.Mesh(new THREE.BoxGeometry(0.004, LEN / U, 0.004), new THREE.MeshBasicMaterial({ color: 0x33404a }));
  axis.position.set(0.62 + 2 * 0.2, -LEN / U / 2, 0.04); scene.add(axis);

  return { renderer, scene, camera, rings, host: null, ro: null, io: null, visible: true, raf: 0, dc: 0, px: 0, labels: [], card: null, depthEl: null, last: -2 };
}

function render3d() {
  if (!S.host) return;
  const root = S.host.querySelector(".c3-scroll");
  const r = root.getBoundingClientRect();
  const span = Math.max(1, r.height - innerHeight);
  const p = Math.min(1, Math.max(0, -r.top / span));
  const target = 1 + p * (LEN - 3);
  S.dc = reduced ? target : S.dc + (target - S.dc) * 0.12;
  const yc = -S.dc / U;
  const cam = S.camera;
  cam.position.set(1.7 + Math.sin(p * Math.PI) * 0.5 + S.px * 0.2, yc + 0.9, 4.3);
  cam.lookAt(0.55, yc - 0.25, 0);
  S.renderer.render(S.scene, cam);

  // Etiquetas proyectadas sobre los anillos
  const w = S.stage.clientWidth, h = S.stage.clientHeight, v = new THREE.Vector3();
  S.labels.forEach((el, i) => {
    v.set(0.42 + 0.05, S.rings[i].position.y, 0).project(cam);
    const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
    const on = v.z < 1 && y > 40 && y < h - 40;
    el.style.opacity = on ? 1 : 0;
    el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y - 10)}px)`;
  });
  S.depthEl.firstChild.nodeValue = Math.round(S.dc) + " ";

  // Ficha del hito más reciente alcanzado
  const L = TX[lang()];
  let idx = -1; L.m.forEach((mk, i) => { if (S.dc >= mk[0] - 4) idx = i; });
  if (idx !== S.last) {
    S.last = idx;
    const c = S.card;
    if (idx < 0) { c.style.setProperty("--mc", "#ff8a4c"); c.querySelector(".k").textContent = "0 m"; c.querySelector("h3").textContent = L.start[0]; c.querySelector("p").textContent = L.start[1]; }
    else { const mk = L.m[idx]; c.style.setProperty("--mc", MCOL[idx]); c.querySelector(".k").textContent = "≈ " + mk[0] + " m"; c.querySelector("h3").textContent = mk[1]; c.querySelector("p").textContent = mk[2]; }
  }
}

function loop() {
  S.raf = 0;
  if (!S.visible || !S.host || !S.host.isConnected) return;
  render3d();
  S.raf = requestAnimationFrame(loop);
}

function attach() {
  const host = document.getElementById("core3d");
  if (!host) return;
  injectCSS();
  const L = TX[lang()];
  const head = `<div class="c3-head wrap"><span class="mono kick">${L.kick}</span><h2 class="h2" id="c3title">${L.title}</h2><p class="c3-intro">${L.intro}</p><p class="c3-note">${L.note}</p></div>`;
  if (!hasGL()) {
    host.innerHTML = head + `<div class="wrap c3-fallback">${window.SECABA ? window.SECABA.figure("cau", lang()) : ""}</div>`;
    return;
  }
  host.innerHTML = head + `<div class="c3-scroll"><div class="c3-stage"><div class="c3-canvas"></div><div class="c3-labels" aria-hidden="true">` +
    L.m.map((mk, i) => `<div class="c3-lab" style="color:${MCOL[i]}"><i></i><span>${mk[1]}</span></div>`).join("") +
    `</div><div class="c3-hud" aria-hidden="true"><span class="c3-depth">0 <small>${L.depth}</small></span><span class="c3-leg">${L.legend}</span></div>` +
    `<a class="c3-pxs" href="#pxs">${L.pxs} →</a><div class="c3-card" aria-live="polite"><span class="k"></span><h3></h3><p></p></div></div></div>`;
  if (!S) {
    S = build();
    addEventListener("pointermove", (ev) => { S.px = ev.clientX / innerWidth * 2 - 1; }, { passive: true });
    S.ro = new ResizeObserver(() => size());
    S.io = new IntersectionObserver((en) => { S.visible = en[0].isIntersecting; if (S.visible && !S.raf) loop(); });
  }
  if (S.stage) { S.ro.unobserve(S.stage); S.io.unobserve(S.stage); }
  S.host = host;
  S.stage = host.querySelector(".c3-stage");
  S.labels = [...host.querySelectorAll(".c3-lab")];
  S.card = host.querySelector(".c3-card");
  S.depthEl = host.querySelector(".c3-depth");
  S.last = -2;
  host.querySelector(".c3-canvas").appendChild(S.renderer.domElement);
  S.ro.observe(S.stage); S.io.observe(S.stage);
  size();
  render3d();
  if (!S.raf) loop();
}

function size() {
  if (!S || !S.stage) return;
  const w = Math.max(1, S.stage.clientWidth), h = Math.max(1, S.stage.clientHeight);
  S.renderer.setSize(w, h, false);
  S.camera.aspect = w / h;
  S.camera.fov = w < 700 ? 58 : 40;
  S.camera.updateProjectionMatrix();
}

addEventListener("secaba:render", attach);
attach();
