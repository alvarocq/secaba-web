// Modelo 3D de un evento anóxico oceánico, a partir del esquema de Jenkyns (2010).
// Diagrama de bloque con relieve, océano, sedimento, flujos animados y 9 pasos con cámara guiada.
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lang = () => (document.documentElement.lang === "en" ? "en" : "es");

// ---------------- Textos ----------------
const TX = {
  es: {
    kick: "Modelo 3D", title: "¿Cómo se ahoga un océano?",
    intro: "Así funciona un evento anóxico oceánico, paso a paso. Es una recreación del modelo de Jenkyns (2010): avanza por los pasos y gira la escena para verla desde cualquier ángulo.",
    hintMouse: "Arrastra para girar", hintTouch: "Usa dos dedos para girar",
    overview: "Vista general", labels: "Etiquetas", prev: "← Anterior", next: "Siguiente →", play: "▶ Reproducir", pause: "❚❚ Pausa",
    stepOf: (i, n) => `Paso ${i} de ${n}`, gaugesT: "Indicadores (aproximados)",
    gT: "Temperatura del mar", gC: "CO₂ en la atmósfera, ppm", gO: "Oxígeno en el fondo", time: "tiempo →",
    note: "Referencias del OAE 1a: CO₂ de ≈1000 a 2200 ppm (Naafs et al., 2016) y +4–8 °C. La escena y la curva son esquemáticas.",
    curveAria: "Curva esquemática de δ13C a lo largo del evento: caída negativa y posterior subida positiva",
    L: ["Atmósfera", "Volcán", "Continente", "Océano", "Agua profunda", "Sedimento", "Hidratos de gas", "Black shale"],
    F: { co2:["CO₂ · SO₂","vulcanismo"], warm:["Calentamiento","efecto invernadero"], ch4:["CH₄","amplificador del invernadero"], nutr:["Nutrientes","meteorización y ríos"], up:["Afloramiento","nutrientes del fondo"], om:["Materia orgánica","nieve marina"], deep:["Calentamiento del agua profunda",""], den:["N₂ · N₂O","desnitrificación"], carb:["Disolución de carbonatos",""], draw:["Retirada de CO₂","enterramiento de carbono"] },
    S: [
      ["Un océano oxigenado", "Clima cálido pero estable. Los peces nadan en todo el océano, el fondo tiene oxígeno y los organismos remueven el sedimento.", ""],
      ["Vulcanismo", "Grandes provincias ígneas, como Ontong Java, expulsan enormes cantidades de CO₂ y SO₂ a la atmósfera.", "Emisión de CO₂ y SO₂"],
      ["Calentamiento global", "El CO₂ refuerza el efecto invernadero. En el OAE 1a el CO₂ pasó de unos 1000 a 2200 ppm y el mar se calentó entre 4 y 8 °C.", "CO₂ ↑ → temperatura ↑"],
      ["El metano amplifica", "El calor desestabiliza los hidratos de gas del talud. El metano liberado refuerza el invernadero y, al oxidarse, consume oxígeno del agua.", "CH₄ + 2 O₂ → CO₂ + 2 H₂O"],
      ["Más lluvia, más nutrientes", "Un ciclo del agua más intenso: más nubes y lluvia, más meteorización de las rocas, y los ríos llevan nutrientes al mar.", "Meteorización ↑ → nutrientes ↑"],
      ["Explosión de plancton", "El afloramiento y los nutrientes disparan la productividad. El plancton tiñe la superficie y su materia orgánica cae como nieve marina.", "Productividad ↑"],
      ["El fondo se queda sin oxígeno", "Descomponer tanta materia orgánica consume el oxígeno de las aguas profundas, que además circulan menos. Los peces huyen o mueren.", "O₂ en el fondo → casi 0"],
      ["Lutitas negras", "Sin oxígeno ni organismos que la remuevan, la materia orgánica se conserva en capas oscuras laminadas: las black shales que estudia SECABA.", "Enterramiento de carbono orgánico"],
      ["El sistema se recupera", "Enterrar tanto carbono retira CO₂ de la atmósfera. El clima se enfría poco a poco, vuelve el oxígeno y el δ13C registra una subida positiva.", "CO₂ ↓ por enterramiento"]
    ]
  },
  en: {
    kick: "3D model", title: "How does an ocean suffocate?",
    intro: "How an oceanic anoxic event works, step by step. A recreation of Jenkyns’s (2010) model: move through the steps and rotate the scene to see it from any angle.",
    hintMouse: "Drag to rotate", hintTouch: "Use two fingers to rotate",
    overview: "Overview", labels: "Labels", prev: "← Previous", next: "Next →", play: "▶ Play", pause: "❚❚ Pause",
    stepOf: (i, n) => `Step ${i} of ${n}`, gaugesT: "Indicators (approximate)",
    gT: "Sea temperature", gC: "Atmospheric CO₂, ppm", gO: "Seafloor oxygen", time: "time →",
    note: "OAE 1a references: CO₂ from ≈1000 to 2200 ppm (Naafs et al., 2016) and +4–8 °C. The scene and curve are schematic.",
    curveAria: "Schematic δ13C curve through the event: a negative drop followed by a positive rise",
    L: ["Atmosphere", "Volcano", "Continent", "Ocean", "Deep water", "Sediment", "Gas hydrates", "Black shale"],
    F: { co2:["CO₂ · SO₂","volcanism"], warm:["Warming","greenhouse effect"], ch4:["CH₄","greenhouse amplifier"], nutr:["Nutrients","weathering and rivers"], up:["Upwelling","deep-water nutrients"], om:["Organic matter","marine snow"], deep:["Deep-water warming",""], den:["N₂ · N₂O","denitrification"], carb:["Carbonate dissolution",""], draw:["CO₂ drawdown","carbon burial"] },
    S: [
      ["An oxygenated ocean", "A warm but stable climate. Fish swim throughout the ocean, the seafloor has oxygen and organisms churn the sediment.", ""],
      ["Volcanism", "Large igneous provinces such as Ontong Java release huge amounts of CO₂ and SO₂ into the atmosphere.", "CO₂ and SO₂ emission"],
      ["Global warming", "CO₂ strengthens the greenhouse effect. During OAE 1a, CO₂ rose from about 1000 to 2200 ppm and the sea warmed by 4–8 °C.", "CO₂ ↑ → temperature ↑"],
      ["Methane amplifies it", "Heat destabilises gas hydrates on the slope. The released methane boosts the greenhouse effect and, as it oxidises, uses up oxygen in the water.", "CH₄ + 2 O₂ → CO₂ + 2 H₂O"],
      ["More rain, more nutrients", "A stronger water cycle: more clouds and rain, more rock weathering, and rivers carry nutrients to the sea.", "Weathering ↑ → nutrients ↑"],
      ["Plankton bloom", "Upwelling and nutrients boost productivity. Plankton tints the surface and its organic matter sinks as marine snow.", "Productivity ↑"],
      ["The seafloor runs out of oxygen", "Breaking down so much organic matter uses up the oxygen in deep waters, which also circulate less. Fish flee or die.", "Seafloor O₂ → near 0"],
      ["Black shales", "With no oxygen and no organisms to churn it, organic matter is preserved in dark laminated layers: the black shales SECABA studies.", "Organic carbon burial"],
      ["The system recovers", "Burying so much carbon draws CO₂ out of the atmosphere. The climate slowly cools, oxygen returns and δ13C records a positive rise.", "CO₂ ↓ through burial"]
    ]
  }
};
const STEPS = [
  { s:{}, a:[], on:[3,5], cam:"overview" },
  { s:{volc:1}, a:["co2"], on:[1], cam:"volcano" },
  { s:{volc:1,temp:.75}, a:["co2","warm"], on:[0], cam:"sky" },
  { s:{volc:1,temp:1,meth:1}, a:["ch4","warm"], on:[6], cam:"methane" },
  { s:{volc:.7,temp:1,meth:.5,nutr:1}, a:["nutr","warm"], on:[2], cam:"land" },
  { s:{volc:.5,temp:1,meth:.4,nutr:1,bloom:1,sink:1}, a:["up","om","nutr"], on:[3], cam:"bloom" },
  { s:{volc:.4,temp:1,meth:.3,nutr:.8,bloom:1,sink:1,anox:1}, a:["om","deep","den"], on:[4], cam:"deep" },
  { s:{volc:.3,temp:.9,meth:.2,nutr:.6,bloom:.8,sink:.9,anox:1,shale:1}, a:["om","carb","den"], on:[7], cam:"shale" },
  { s:{volc:.1,temp:.4,nutr:.3,bloom:.3,sink:.3,anox:.35,shale:1,draw:1}, a:["draw"], on:[0,7], cam:"overview2" }
];
const KEYS = ["volc","temp","meth","nutr","bloom","sink","anox","shale","draw"];
const CURVE = [0, 0, -.15, -.85, -.7, -.4, .1, .6, .85];

function hasGL() { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } }

function injectCSS() {
  if (document.getElementById("oaecss")) return;
  const st = document.createElement("style"); st.id = "oaecss";
  st.textContent = `
.oaesec{padding-block:clamp(48px,7vw,96px)}
.oae-head{display:grid;gap:12px;margin-bottom:clamp(20px,3vw,32px)}
.oae-head p{max-width:64ch;color:var(--muted)}
.oae-app{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:16px;align-items:start}
@media (max-width:1020px){.oae-app{grid-template-columns:1fr}}
.oae-stage{position:relative;border-radius:18px;overflow:hidden;aspect-ratio:16/10;max-width:100%;background:#bcd6ea;border:1px solid var(--line)}
@media (max-width:640px){.oae-stage{aspect-ratio:4/5}}
.oae-stage canvas{display:block;width:100%;height:100%}
.oae-labels{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.oae-lab{position:absolute;left:0;top:0;font:600 .72rem/1 "Public Sans",system-ui,sans-serif;color:#0f1417;background:rgba(255,255,255,.82);padding:4px 8px;border-radius:999px;white-space:nowrap;transition:opacity .35s,box-shadow .3s;border:1px solid rgba(15,20,23,.12)}
.oae-lab.on{box-shadow:0 0 0 2px #e8590c;background:#fff}
.oae-flux{position:absolute;left:0;top:0;font:700 .74rem/1.1 "Public Sans",system-ui,sans-serif;color:#fff;padding:5px 9px;border-radius:8px;white-space:nowrap;transition:opacity .35s;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.oae-flux small{display:block;font:500 .62rem/1.2 "IBM Plex Mono",ui-monospace,monospace;opacity:.9}
.oae-hud{position:absolute;left:12px;top:12px;display:flex;gap:6px;flex-wrap:wrap}
.oae-chip{font:600 .72rem "Public Sans",system-ui,sans-serif;color:#0f1417;background:rgba(255,255,255,.88);border:1px solid rgba(15,20,23,.12);padding:6px 10px;border-radius:999px;cursor:pointer}
.oae-chip:focus-visible,.oae-btn:focus-visible,.oae-dot:focus-visible{outline:2px solid var(--warm);outline-offset:2px}
.oae-hint{position:absolute;right:12px;bottom:10px;font:500 .68rem "IBM Plex Mono",monospace;color:rgba(15,20,23,.7);background:rgba(255,255,255,.7);padding:3px 8px;border-radius:999px}
.oae-panel{display:grid;gap:12px}
.oae-card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px;display:grid;gap:10px}
.oae-k{font:500 .72rem "IBM Plex Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:var(--warm)}
.oae-card h3{font:800 1.4rem/1.1 "Bricolage Grotesque",sans-serif;font-stretch:85%;margin:0}
.oae-card p{margin:0}
.oae-eq{font-family:"IBM Plex Mono",monospace;font-size:.85rem;color:var(--muted)}
.oae-ctrl{display:flex;gap:8px;flex-wrap:wrap}
.oae-btn{font:600 .85rem "Public Sans",system-ui,sans-serif;padding:9px 14px;border-radius:999px;border:1px solid var(--ink);background:transparent;color:var(--ink);cursor:pointer}
.oae-btn.pri{background:var(--ink);color:var(--bg)}
.oae-btn:disabled{opacity:.35;cursor:default}
.oae-dots{display:flex;gap:6px;flex-wrap:wrap}
.oae-dot{width:26px;height:26px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--muted);font:500 .7rem "IBM Plex Mono",monospace;cursor:pointer;padding:0}
.oae-dot.on{background:var(--warm);border-color:var(--warm);color:#fff}
.oae-dot.done{border-color:var(--warm);color:var(--warm)}
.oae-gauges{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.oae-g{display:grid;gap:4px;align-content:start}
.oae-g b{font:800 1.35rem/1 "Bricolage Grotesque",sans-serif;font-variant-numeric:tabular-nums}
.oae-g span{font-size:.72rem;color:var(--muted)}
.oae-bar{height:6px;border-radius:3px;background:var(--line);overflow:hidden}
.oae-bar i{display:block;height:100%;width:0;border-radius:3px}
.oae-curve svg{width:100%;height:auto;display:block}
.oae-curve text{font:500 10px "IBM Plex Mono",monospace;fill:var(--muted)}
.oae-note{font-size:.8rem;color:var(--muted)}
.oae-fallback{max-width:620px}`;
  document.head.appendChild(st);
}

// ---------------- Escena (se construye una vez) ----------------
function buildScene(stageEl) {
  const R = Math.random, C = (hex) => new THREE.Color(hex), tmpC = new THREE.Color();
  const small = stageEl.clientWidth < 700;
  const renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:"high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !small; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(34, 1.6, 0.1, 200);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false; controls.enableZoom = false;
  controls.minPolarAngle = 0.25; controls.maxPolarAngle = 1.62;
  controls.touches = { ONE: null, TWO: THREE.TOUCH.ROTATE };
  renderer.domElement.style.touchAction = "pan-y";

  scene.add(new THREE.HemisphereLight(0xdfeeff, 0x4a3a2a, 0.9));
  const sun = new THREE.DirectionalLight(0xfff0dc, 2.6);
  sun.position.set(6, 10, 7); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left:-8, right:8, top:8, bottom:-8, near:1, far:40 });
  sun.shadow.bias = -0.0008; scene.add(sun);

  const skyU = { top:{ value:C(0x5b9bd5) }, hor:{ value:C(0xd6e8f3) } };
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(80, 32, 16), new THREE.ShaderMaterial({
    side:THREE.BackSide, depthWrite:false, uniforms:skyU,
    vertexShader:`varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader:`uniform vec3 top; uniform vec3 hor; varying vec3 vP; void main(){ float t = smoothstep(-.05,.6,vP.y); gl_FragColor = vec4(mix(hor, top, t), 1.); }`
  })));
  scene.fog = new THREE.Fog(0xd6e8f3, 30, 70);

  const D = 4, Z0 = -D/2, Z1 = D/2, SEA = 0, FLOOR = -2.4, BASE = -3.4, XL = -5, XR = 5, XS = 0.6;
  const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const mix = (a, b, t) => a + (b - a) * t;
  const noise = (x, z) => Math.sin(x*1.7 + z*.9)*.5 + Math.sin(x*3.3 - z*2.1 + 1.3)*.25 + Math.sin(x*7.1 + z*5.3 + 2.1)*.12 + Math.sin(x*13.7 - z*11.3)*.06;
  const VX = -3.55, VZ = -0.2;
  const riverZ = (x) => 0.7 + 0.35 * Math.sin(x * 1.4 + 0.5);
  function H(x, z) {
    let h = x < -1.2 ? mix(0.8, -0.2, ss(-2.9, -1.2, x)) : mix(-0.2, FLOOR + 0.02, ss(-1.2, 0.55, x));
    h += noise(x, z) * (0.38 * (1 - ss(-2.2, -0.9, x)) + 0.04);
    const r = Math.hypot(x - VX, z - VZ);
    h += 2.5 * Math.exp(-((r / 1.05) ** 2)) - 0.6 * Math.exp(-((r / 0.25) ** 2));
    if (x > -2.9 && x < -0.9) h -= 0.22 * Math.exp(-(((z - riverZ(x)) / 0.13) ** 2)) * ss(-2.9, -2.4, x);
    return h;
  }
  const PAL = { sandS:C(0xc9b58a), sandD:C(0x6d6559), green:C(0x5f8a45), olive:C(0x8c8150), brown:C(0x7d5a3c), rock:C(0x4b403b), crater:C(0x2e1710), river:C(0x3c8dc4) };
  function topColor(x, z, h, out) {
    const r = Math.hypot(x - VX, z - VZ);
    if (h < -0.04) out.copy(PAL.sandS).lerp(PAL.sandD, Math.min(1, -h / 2.4));
    else if (x < -0.9 && x > -2.6 && h < 0.9 && Math.abs(z - riverZ(x)) < 0.11) out.copy(PAL.river);
    else if (h < 0.45) out.copy(PAL.green);
    else if (h < 1.0) out.copy(PAL.green).lerp(PAL.olive, (h - .45) / .55);
    else if (h < 1.9) out.copy(PAL.olive).lerp(PAL.brown, (h - 1) / .9);
    else out.copy(PAL.brown).lerp(PAL.rock, Math.min(1, (h - 1.9) / .7));
    if (r < 0.32) out.lerp(PAL.crater, 1 - r / 0.32);
    return out.multiplyScalar(1 + noise(x * 4, z * 4) * 0.06);
  }
  const tGeo = new THREE.PlaneGeometry(XS - XL, D, small ? 100 : 150, small ? 60 : 90); tGeo.rotateX(-Math.PI / 2);
  const tp = tGeo.attributes.position, tcol = new Float32Array(tp.count * 3);
  for (let i = 0; i < tp.count; i++) {
    const x = tp.getX(i) + (XL + XS) / 2, z = tp.getZ(i), h = H(x, z);
    tp.setXYZ(i, x, h, z); topColor(x, z, h, tmpC); tcol.set([tmpC.r, tmpC.g, tmpC.b], i * 3);
  }
  tGeo.setAttribute("color", new THREE.BufferAttribute(tcol, 3)); tGeo.computeVertexNormals();
  const terrain = new THREE.Mesh(tGeo, new THREE.MeshStandardMaterial({ vertexColors:true, roughness:.92 }));
  terrain.castShadow = terrain.receiveShadow = true; scene.add(terrain);

  const strata = [C(0xdb8a52), C(0xc8743f), C(0xe3a06b), C(0xb9683a)];
  function wall(samples, along) {
    const rows = 46, pos = [], col = [], idx = [];
    samples.forEach((s) => {
      for (let j = 0; j <= rows; j++) {
        const y = mix(s.top, BASE, j / rows); pos.push(s.x, y, s.z);
        let c;
        if (s.top - y < 0.12 && s.top > -0.04) c = tmpC.copy(PAL.brown).multiplyScalar(.75);
        else { const band = Math.floor((y + 0.18 * Math.sin(along(s) * 1.3)) * 3.2); c = tmpC.copy(strata[((band % 4) + 4) % 4]); }
        col.push(c.r, c.g, c.b);
      }
    });
    for (let i = 0; i < samples.length - 1; i++) for (let j = 0; j < rows; j++) { const a = i * (rows + 1) + j, b = a + rows + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors:true, roughness:.95, side:THREE.DoubleSide }));
    m.receiveShadow = true; scene.add(m);
  }
  const frontS = [], backS = [], leftS = [];
  for (let i = 0; i <= 160; i++) { const x = mix(XL, XS, i / 160); frontS.push({ x, z:Z1, top:H(x, Z1) }); backS.push({ x, z:Z0, top:H(x, Z0) }); }
  for (let i = 0; i <= 60; i++) { const z = mix(Z0, Z1, i / 60); leftS.push({ x:XL, z, top:H(XL, z) }); }
  wall(frontS, s => s.x); wall(backS, s => s.x); wall(leftS, s => s.z);
  const faultMat = new THREE.LineBasicMaterial({ color:0x9b1c1c });
  [[-4.7,-3.2,-3.9,-0.2],[-4.25,-3.3,-3.25,-0.6],[-2.6,-3.3,-2.0,-1.2]].forEach(f => {
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(f[0], f[1], Z1 + .012), new THREE.Vector3(f[2], f[3], Z1 + .012)]), faultMat));
  });

  function canvasTex(w, h, draw) { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
  const bioTex = canvasTex(512, 128, (x, w, h) => {
    x.fillStyle = "#8e8a84"; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? "#85817b" : "#97938c"; x.fillRect(0, i * h / 9, w, h / 18); }
    for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(${60+R()*30|0},${55+R()*25|0},${50+R()*20|0},.55)`; x.beginPath(); x.ellipse(R()*w, R()*h, 2+R()*7, 1+R()*3, R()*3, 0, 7); x.fill(); }
  });
  const sedW = XR - XS;
  const sed = new THREE.Mesh(new THREE.BoxGeometry(sedW, FLOOR - BASE, D), new THREE.MeshStandardMaterial({ map:bioTex, roughness:.95 }));
  sed.position.set(XS + sedW / 2, (FLOOR + BASE) / 2, 0); sed.receiveShadow = true; scene.add(sed);
  const lamTex = canvasTex(64, 128, (x, w, h) => { for (let i = 0; i < h; i++) { const d = 18 + (i % 6 < 3 ? 0 : 14) + R() * 6; x.fillStyle = `rgb(${d},${d-2},${d-4})`; x.fillRect(0, i, w, 1); } });
  lamTex.wrapS = THREE.RepeatWrapping; lamTex.repeat.set(8, 1);
  const shale = new THREE.Mesh(new THREE.BoxGeometry(sedW, 1, D), new THREE.MeshStandardMaterial({ map:lamTex, roughness:.55, metalness:.05 }));
  shale.position.set(XS + sedW / 2, FLOOR, 0); shale.scale.y = 0.001; scene.add(shale);
  const hydTex = canvasTex(128, 32, (x, w, h) => { x.fillStyle = "#f2b632"; x.fillRect(0, 0, w, h); x.strokeStyle = "rgba(150,90,10,.6)"; x.lineWidth = 2; for (let i = -h; i < w; i += 9) { x.beginPath(); x.moveTo(i, h); x.lineTo(i + h, 0); x.stroke(); } });
  const hydMat = new THREE.MeshStandardMaterial({ map:hydTex, roughness:.5, emissive:0x8a4b00, emissiveIntensity:.1 });
  const hyd = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 16), hydMat);
  hyd.scale.set(1.9, 0.5, 0.35); hyd.position.set(1.6, -2.95, Z1 - 0.1); scene.add(hyd);

  const OX0 = -2.0, OW = XR - OX0, OD = D - 0.03;
  const water = new THREE.BoxGeometry(OW, -FLOOR, OD, 1, 10, 1);
  const wcol = new Float32Array(water.attributes.position.count * 3); water.setAttribute("color", new THREE.BufferAttribute(wcol, 3));
  const waterMesh = new THREE.Mesh(water, new THREE.MeshPhysicalMaterial({ vertexColors:true, transparent:true, opacity:.58, roughness:.15, depthWrite:false }));
  waterMesh.position.set(OX0 + OW / 2, FLOOR / 2, 0); scene.add(waterMesh);
  const wTop = C(0x46b9df), wMid = C(0x1f78b8), wDeep = C(0x15497f), wAnox = C(0x2f1544), wBloom = C(0x3aa889), wt = new THREE.Color(), deepC = new THREE.Color();
  function paintWater(cur) {
    const p = water.attributes.position, half = -FLOOR / 2;
    for (let i = 0; i < p.count; i++) {
      const d = Math.min(1, Math.max(0, (half - p.getY(i)) / -FLOOR));
      wt.copy(wTop).lerp(wBloom, cur.bloom * .55 * Math.max(0, 1 - d * 2));
      if (d > .2) wt.lerp(wMid, Math.min(1, (d - .2) / .4));
      if (d > .55) { deepC.copy(wDeep).lerp(wAnox, cur.anox); wt.lerp(deepC, Math.min(1, (d - .55) / .45 * (0.6 + cur.anox * .4))); }
      wcol.set([wt.r, wt.g, wt.b], i * 3);
    }
    water.attributes.color.needsUpdate = true;
  }
  const surfGeo = new THREE.PlaneGeometry(OW, OD, small ? 50 : 90, small ? 20 : 36); surfGeo.rotateX(-Math.PI / 2);
  const surfMat = new THREE.MeshPhysicalMaterial({ color:0x6cc9ea, transparent:true, opacity:.62, roughness:.06, clearcoat:1, clearcoatRoughness:.05, envMapIntensity:1.2 });
  const surf = new THREE.Mesh(surfGeo, surfMat); surf.position.set(OX0 + OW / 2, SEA, 0); surf.receiveShadow = true; scene.add(surf);
  const surfBase = surfGeo.attributes.position.array.slice();

  const puff = canvasTex(64, 64, (x, w) => { const g = x.createRadialGradient(32,32,0,32,32,32); g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(.45,"rgba(255,255,255,.55)"); g.addColorStop(1,"rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0,0,w,w); });
  const systems = [];
  function system(n, color, size, reset, update, blending = THREE.NormalBlending) {
    n = small ? Math.round(n * .6) : n;
    const pos = new Float32Array(n * 3), data = Array.from({ length:n }, () => ({}));
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color, size, map:puff, transparent:true, depthWrite:false, opacity:0, blending });
    scene.add(new THREE.Points(g, m));
    for (let i = 0; i < n; i++) { reset(data[i], true); pos.set([data[i].x, data[i].y, data[i].z], i * 3); }
    const s = { m, tick(dt) { for (let i = 0; i < n; i++) { const p = data[i]; if (update(p, dt)) reset(p, false); pos[i*3] = p.x; pos[i*3+1] = p.y; pos[i*3+2] = p.z; } g.attributes.position.needsUpdate = true; } };
    systems.push(s); return s;
  }
  const VTOP = H(VX, VZ) + 0.25;
  const P = {
    plume: system(320, 0x8d949b, 0.95,
      (p, init) => { p.x = VX + (R()-.5)*.25; p.y = VTOP + (init ? R()*4 : 0); p.z = VZ + (R()-.5)*.25; p.vx = .2 + R()*.3; p.vy = .55 + R()*.5; p.vz = (R()-.5)*.15; },
      (p, dt) => { p.x += p.vx*dt; p.y += p.vy*dt; p.z += p.vz*dt; p.vy *= .996; p.vx *= 1.003; return p.y > 7.5 || p.x > 4; }),
    ember: system(60, 0xff7a2a, 0.22,
      (p, init) => { p.x = VX + (R()-.5)*.2; p.y = VTOP - .1 + (init ? R()*.8 : 0); p.z = VZ + (R()-.5)*.2; p.vy = 1 + R()*1.2; p.vx = (R()-.5)*.6; },
      (p, dt) => { p.x += p.vx*dt; p.y += p.vy*dt; p.vy -= 2.2*dt; return p.y < VTOP - .3; }, THREE.AdditiveBlending),
    bubbles: system(200, 0xffe08a, .2,
      (p, init) => { p.x = 1.1 + R()*1.1; p.y = -2.7 + (init ? R()*4.5 : 0); p.z = Z1 - .3 - R()*1.2; p.vy = .55 + R()*.55; },
      (p, dt) => { p.y += p.vy*dt; p.x += Math.sin(p.y*5 + p.z)*.004; return p.y > 1.8; }),
    rain: system(320, 0x86b6dc, .15,
      (p, init) => { p.x = -4.8 + R()*3.6; p.y = 4.2 - (init ? R()*3 : 0); p.z = (R()-.5)*D*.95; p.vy = 4.5 + R()*2; },
      (p, dt) => { p.y -= p.vy*dt; return p.y < H(p.x, p.z) + .05; }),
    nutr: system(200, 0x9ad14b, .26,
      (p, init) => { p.x = -2.6 + (init ? R()*2.5 : 0); p.vx = .45 + R()*.3; p.off = (R()-.5)*.08; p.end = .2 + R()*3.8; p.z = riverZ(p.x) + p.off; p.y = H(p.x, p.z) + .06; },
      (p, dt) => { p.x += p.vx*dt; if (p.x < -0.9) { p.z = riverZ(p.x) + p.off; p.y = H(p.x, p.z) + .06; } else { p.z += Math.sin(p.x*3 + p.off*40)*.01; p.y = SEA + .04; } return p.x > -0.9 + p.end; }),
    bloom: system(520, 0x56c46a, .22,
      (p) => { p.x = OX0 + 1.2 + R()*(OW - 1.4); p.y = -0.06 - R()*.55; p.z = (R()-.5)*(OD - .2); p.ph = R()*6.28; },
      (p, dt) => { p.ph += dt; p.y += Math.sin(p.ph)*.0015; return false; }),
    snow: system(320, 0xa47148, .17,
      (p, init) => { p.x = OX0 + 2 + R()*(OW - 2.3); p.y = -0.25 - (init ? R()*2 : 0); p.z = (R()-.5)*(OD - .3); p.vy = .3 + R()*.25; },
      (p, dt) => { p.y -= p.vy*dt; p.x += Math.sin(p.y*3 + p.z)*.002; return p.y < FLOOR + shale.scale.y + .03; }),
    draw: system(160, 0xffffff, .24,
      (p, init) => { p.x = 2.6 + R()*2.2; p.y = 4 - (init ? R()*4 : 0); p.z = (R()-.5)*D; p.vy = .9 + R()*.5; },
      (p, dt) => { p.y -= p.vy*dt; return p.y < -0.3; })
  };
  const clouds = [];
  for (let i = 0; i < 7; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map:puff, color:0xffffff, transparent:true, opacity:0, depthWrite:false }));
    s.position.set(-4.4 + i * .55 + (R()-.5)*.3, 4.3 + (R()-.5)*.3, (R()-.5)*2.4); s.scale.setScalar(1.6 + R()*1.2); scene.add(s); clouds.push(s);
  }
  const fishGeo = new THREE.SphereGeometry(.13, 14, 10); fishGeo.scale(1.9, .75, .55);
  const tailGeo = new THREE.ConeGeometry(.09, .2, 4); tailGeo.rotateZ(Math.PI / 2); tailGeo.translate(-.32, 0, 0);
  const fishMat = new THREE.MeshStandardMaterial({ color:0xc9d6e2, metalness:.5, roughness:.35 });
  const fish = [];
  for (let i = 0; i < 11; i++) {
    const g = new THREE.Group(); g.add(new THREE.Mesh(fishGeo, fishMat), new THREE.Mesh(tailGeo, fishMat));
    g.userData = { cx: 1.2 + R()*2.8, cy: -0.6 - R()*1.4, cz: (R()-.5)*1.8, rx: .5 + R()*.9, rz: .3 + R()*.5, sp: .3 + R()*.4, ph: R()*6.28, lim: .35 + (i / 11) * .6 };
    scene.add(g); fish.push(g);
  }
  // Flechas de flujo
  const flowTex = canvasTex(128, 16, (x, w, h) => { const g = x.createLinearGradient(0,0,w,0); g.addColorStop(0,"rgba(255,255,255,.35)"); g.addColorStop(.55,"rgba(255,255,255,1)"); g.addColorStop(1,"rgba(255,255,255,.35)"); x.fillStyle = g; x.fillRect(0,0,w,h); });
  const arrows = {};
  function arrow(key, pts, color, anchorT = .55, r = .07) {
    const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)));
    const tex = flowTex.clone(); tex.needsUpdate = true; tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(curve.getLength() / .6, 1);
    const mat = new THREE.MeshBasicMaterial({ color, map:tex, transparent:true, opacity:0, depthWrite:false });
    const head = new THREE.Mesh(new THREE.ConeGeometry(r * 2.8, r * 6.5, 18), new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0, depthWrite:false }));
    head.position.copy(curve.getPoint(1)); head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangent(1));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, r, 10), mat), head);
    arrows[key] = { mat, head, tex, color:"#" + new THREE.Color(color).getHexString(), anchor: curve.getPoint(anchorT), v: 0, el: null };
  }
  arrow("co2", [[VX, VTOP + .3, VZ], [-2.6, 3.9, 0], [-0.8, 4.7, 0], [0.9, 4.9, 0]], 0xe8590c, .6);
  arrow("warm", [[1.1, 5.0, 0], [2.6, 4.9, 0], [3.7, 4.2, 0], [4.2, 3.1, 0]], 0xc92a2a, .4);
  arrow("ch4", [[1.6, -2.75, Z1 - .5], [1.5, -1.4, Z1 - .5], [1.3, 0.3, Z1 - .5], [0.9, 2.2, Z1 - .5], [0.7, 3.6, 0]], 0xd9a400, .55);
  arrow("nutr", [[-2.7, 1.0, riverZ(-2.7)], [-2.1, 0.7, riverZ(-2.1)], [-1.3, 0.2, riverZ(-1.3)], [0.2, 0.25, 0.9], [1.6, 0.25, 0.8]], 0x4a9a2f, .5);
  arrow("up", [[3.2, -2.1, 1.3], [3.6, -1.3, 1.3], [3.5, -0.5, 1.3], [3.0, -0.12, 1.3]], 0xe8590c, .45, .06);
  arrow("om", [[2.2, -0.2, 1.5], [2.25, -1.0, 1.5], [2.2, -1.8, 1.5], [2.2, -2.3, 1.5]], 0x7a4a26, .4, .06);
  arrow("deep", [[4.6, 4.0, -1], [4.7, 1.8, -1], [4.6, -0.6, -1], [4.3, -1.9, -1]], 0xc2255c, .62, .06);
  arrow("den", [[4.2, -1.6, 1.6], [4.25, -0.7, 1.6], [4.3, 0.6, 1.6], [4.35, 2.2, 1.6]], 0xd6336c, .72, .06);
  arrow("carb", [[4.75, -0.5, 1.7], [4.75, -1.3, 1.7], [4.75, -2.2, 1.7]], 0x1c7ed6, .4, .06);
  arrow("draw", [[3.2, 5.0, 0], [3.4, 3.5, 0.4], [3.3, 1.6, 0.6], [3.2, 0.1, 0.6]], 0x1971c2, .45);

  const labelPts = [[-0.6, 5.6, 0], [VX, VTOP + .55, VZ], [-4.4, 0.4, Z1], [1.0, -0.55, Z1], [3.9, -1.75, Z1], [3.6, -3.0, Z1], [1.6, -2.95, Z1 + .1], [4.2, -2.3, Z1]].map(p => new THREE.Vector3(...p));

  return { renderer, scene, camera, controls, sun, skyU, surfMat, surfGeo, surfBase, shale, hydMat, fish, clouds, P, systems, arrows, labelPts, paintWater, FLOOR, mix };
}

// ---------------- Estado y montaje ----------------
let S = null;
const cur = Object.fromEntries(KEYS.map(k => [k, 0]));
let step = 0, timer = 0, tween = null, visible = true, raf = 0, last = 0, tsec = 0, lastAnox = -1, lastBloom = -1, ui = null;
const CAMS = {
  overview: { t:[-0.2, -0.2, 0], p:[8.2, 5.6, 14.5] }, volcano: { t:[-3.2, 2.0, 0], p:[2.2, 5.2, 9.5] },
  sky: { t:[0.5, 2.6, 0], p:[5.5, 4.5, 14] }, methane: { t:[1.4, -1.4, 1.2], p:[5.2, 0.4, 9.5] },
  land: { t:[-2.4, 0.8, 0.4], p:[1.8, 5.6, 9.8] }, bloom: { t:[2.4, -0.3, 0], p:[7.2, 5.0, 10] },
  deep: { t:[2.8, -1.4, 0.6], p:[8.2, 0.9, 10.5] }, shale: { t:[3.0, -2.5, 1.6], p:[7.0, -0.6, 9.4] },
  overview2: { t:[-0.2, 0.2, 0], p:[9.5, 6.4, 13.5] }
};
function flyTo(name, instant) {
  const c = CAMS[name], k = ui.stage.clientWidth < 640 ? 1.35 : 1;
  const tgt = new THREE.Vector3(...c.t), pos = new THREE.Vector3(...c.p).sub(tgt).multiplyScalar(k).add(tgt);
  if (instant || reduced) { S.camera.position.copy(pos); S.controls.target.copy(tgt); tween = null; return; }
  tween = { p0: S.camera.position.clone(), t0: S.controls.target.clone(), p1: pos, t1: tgt, s: performance.now(), d: 1800 };
}
function stopPlay() { if (timer) { clearInterval(timer); timer = 0; } if (ui) ui.play.textContent = TX[lang()].play; }
function go(i, user, instant) {
  const L = TX[lang()];
  step = Math.max(0, Math.min(STEPS.length - 1, i));
  const st = STEPS[step], tx = L.S[step];
  ui.k.textContent = L.stepOf(step + 1, STEPS.length); ui.t.textContent = tx[0]; ui.d.textContent = tx[1]; ui.e.textContent = tx[2];
  ui.prev.disabled = step === 0; ui.next.disabled = step === STEPS.length - 1;
  [...ui.dots.children].forEach((d, k) => { d.classList.toggle("on", k === step); d.classList.toggle("done", k < step); d.setAttribute("aria-current", k === step ? "step" : "false"); });
  ui.labs.forEach((el, k) => el.classList.toggle("on", st.on.includes(k)));
  flyTo(st.cam, instant);
  if (user) stopPlay();
}
const pathOf = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
const CPTS = CURVE.map((v, i) => [20 + i * (292 / (STEPS.length - 1)), 48 - v * 34]);
const ease = (t) => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;

function frame(now) {
  raf = 0;
  if (!visible || !ui || !ui.stage.isConnected) return;
  const dt = Math.max(0, Math.min(.05, (now - last) / 1000)); last = now; tsec += dt;
  const tgt = STEPS[step].s, k = reduced ? 1 : 1 - Math.pow(.03, dt);
  KEYS.forEach(key => { cur[key] = Math.min(1, Math.max(0, cur[key] + ((tgt[key] || 0) - cur[key]) * k)); });
  const act = STEPS[step].a;
  for (const key in S.arrows) { const A = S.arrows[key]; A.v += ((act.includes(key) ? 1 : 0) - A.v) * k; A.mat.opacity = A.v * .92; A.head.material.opacity = A.v * .95; if (!reduced) A.tex.offset.x -= dt * 1.1; }

  const heat = cur.temp * (1 - cur.draw * .45);
  S.skyU.top.value.setHex(0x4f93d2).lerp(new THREE.Color(0x8f7f8e), heat);
  S.skyU.hor.value.setHex(0xd8e9f4).lerp(new THREE.Color(0xf2c9a2), heat);
  S.scene.fog.color.copy(S.skyU.hor.value); ui.stage.style.background = "#" + S.skyU.hor.value.getHexString();
  S.sun.color.setHSL(.08 - heat * .03, .5 + heat * .3, .9 - heat * .1);
  S.clouds.forEach((c, i) => { c.material.opacity = .25 + cur.nutr * .55; c.material.color.setScalar(1 - cur.nutr * .35); if (!reduced) c.position.x += Math.sin(tsec * .2 + i) * .0015; });
  if (Math.abs(cur.anox - lastAnox) > .003 || Math.abs(cur.bloom - lastBloom) > .003) { S.paintWater(cur); lastAnox = cur.anox; lastBloom = cur.bloom; }
  S.surfMat.color.setHex(0x6cc9ea).lerp(new THREE.Color(0x4fb58a), cur.bloom * .7);
  S.shale.scale.y = Math.max(.001, cur.shale * .34); S.shale.position.y = S.FLOOR + S.shale.scale.y / 2;
  S.hydMat.emissiveIntensity = .1 + cur.meth * .9;
  if (!reduced) {
    const a = S.surfGeo.attributes.position.array, b = S.surfBase;
    for (let i = 0; i < a.length; i += 3) a[i+1] = b[i+1] + Math.sin(b[i] * 1.7 + tsec * 1.3) * .035 + Math.cos(b[i+2] * 2.3 + tsec * .9) * .025;
    S.surfGeo.attributes.position.needsUpdate = true; S.surfGeo.computeVertexNormals();
    S.systems.forEach(s => s.tick(dt));
  }
  const P = S.P;
  P.plume.m.opacity = cur.volc * .55; P.ember.m.opacity = cur.volc * .95; P.bubbles.m.opacity = cur.meth * .95; P.rain.m.opacity = cur.nutr * .65;
  P.nutr.m.opacity = cur.nutr * .95; P.bloom.m.opacity = cur.bloom * .85; P.snow.m.opacity = cur.sink * .9; P.draw.m.opacity = cur.draw * .85;
  S.fish.forEach(f => {
    const u = f.userData, t = tsec * u.sp + u.ph, y = S.mix(u.cy, -0.35, Math.min(1, cur.anox * 1.4));
    f.position.set(u.cx + Math.cos(t) * u.rx, y + Math.sin(t * 2) * .05, u.cz + Math.sin(t) * u.rz); f.rotation.y = -t; f.visible = cur.anox < u.lim;
  });
  const T = cur.temp * 8 * (1 - cur.draw * .4), CO = 1000 + cur.temp * 1200 - cur.draw * 550, O = 100 - cur.anox * 92 - cur.meth * 5;
  const dec = lang() === "es" ? "," : ".";
  ui.gT.textContent = "+" + T.toFixed(1).replace(".", dec) + " °C"; ui.bT.style.width = (T / 8 * 100) + "%";
  ui.gC.textContent = Math.round(CO / 10) * 10; ui.bC.style.width = ((CO - 800) / 1600 * 100) + "%";
  ui.gO.textContent = Math.max(0, Math.round(O)) + " %"; ui.bO.style.width = Math.max(0, O) + "%";
  const pr = CPTS.slice(0, step + 1); ui.cProg.setAttribute("d", pathOf(pr));
  ui.cDot.setAttribute("cx", pr[pr.length-1][0]); ui.cDot.setAttribute("cy", pr[pr.length-1][1]);
  if (tween) {
    const u = Math.min(1, (now - tween.s) / tween.d), e = ease(u);
    S.camera.position.lerpVectors(tween.p0, tween.p1, e); S.controls.target.lerpVectors(tween.t0, tween.t1, e);
    if (u >= 1) tween = null;
  }
  S.controls.update();
  S.renderer.render(S.scene, S.camera);
  const w = ui.stage.clientWidth, h = ui.stage.clientHeight, v = new THREE.Vector3();
  const place = (el, p, op) => { v.copy(p).project(S.camera); const x = (v.x*.5+.5)*w, y = (-v.y*.5+.5)*h; const vis = v.z < 1 && x > -40 && x < w + 40 && y > -20 && y < h + 20; el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`; el.style.opacity = vis ? op : 0; };
  S.labelPts.forEach((p, i) => place(ui.labs[i], p, 1));
  for (const key in S.arrows) { const A = S.arrows[key]; place(A.el, A.anchor, A.v > .05 ? Math.min(1, A.v * 1.2) : 0); }
  raf = requestAnimationFrame(frame);
}
function size() {
  if (!S || !ui) return;
  const w = Math.max(1, ui.stage.clientWidth), h = Math.max(1, ui.stage.clientHeight);
  S.renderer.setSize(w, h, false); S.camera.aspect = w / h; S.camera.updateProjectionMatrix();
}

let ro = null, io = null;
function attach() {
  const host = document.getElementById("oae3d");
  if (!host) return;
  injectCSS();
  const L = TX[lang()];
  const head = `<div class="oae-head"><span class="mono kick">${L.kick}</span><h2 class="h2" id="modelo-t">${L.title}</h2><p>${L.intro}</p></div>`;
  if (!hasGL()) { host.innerHTML = head + `<div class="oae-fallback">${window.SECABA ? window.SECABA.figure("oae", lang()) : ""}</div>`; return; }
  const touch = matchMedia("(pointer: coarse)").matches;
  host.innerHTML = head + `<div class="oae-app">
    <div class="oae-stage"><div class="oae-labels" aria-hidden="true"></div>
      <div class="oae-hud"><button class="oae-chip" type="button" data-a="overview">${L.overview}</button><button class="oae-chip" type="button" data-a="labels" aria-pressed="true">${L.labels}</button></div>
      <span class="oae-hint">${touch ? L.hintTouch : L.hintMouse}</span></div>
    <div class="oae-panel">
      <div class="oae-card" aria-live="polite"><span class="oae-k"></span><h3></h3><p class="oae-d"></p><span class="oae-eq"></span>
        <div class="oae-ctrl"><button class="oae-btn" type="button" data-a="prev">${L.prev}</button><button class="oae-btn pri" type="button" data-a="next">${L.next}</button><button class="oae-btn" type="button" data-a="play">${L.play}</button></div>
        <div class="oae-dots"></div></div>
      <div class="oae-card"><span class="oae-k" style="color:var(--muted)">${L.gaugesT}</span>
        <div class="oae-gauges">
          <div class="oae-g"><b data-g="T">+0 °C</b><span>${L.gT}</span><div class="oae-bar"><i data-b="T" style="background:var(--hot)"></i></div></div>
          <div class="oae-g"><b data-g="C">1000</b><span>${L.gC}</span><div class="oae-bar"><i data-b="C" style="background:var(--warm)"></i></div></div>
          <div class="oae-g"><b data-g="O">100 %</b><span>${L.gO}</span><div class="oae-bar"><i data-b="O" style="background:#1c7ed6"></i></div></div>
        </div>
        <div class="oae-curve"><svg viewBox="0 0 320 96" role="img" aria-label="${L.curveAria}">
          <line x1="20" y1="48" x2="312" y2="48" stroke="currentColor" stroke-opacity=".15"></line>
          <path d="${pathOf(CPTS)}" fill="none" stroke="var(--line)" stroke-width="2"></path>
          <path data-c="prog" d="" fill="none" stroke="var(--warm)" stroke-width="2.5" stroke-linecap="round"></path>
          <circle data-c="dot" r="4.5" fill="var(--warm)" cx="20" cy="48"></circle>
          <text x="2" y="14">δ¹³C</text><text x="4" y="30">+</text><text x="4" y="72">−</text><text x="20" y="92">${L.time}</text></svg></div>
        <p class="oae-note">${L.note}</p></div>
    </div></div>`;
  const q = (s) => host.querySelector(s);
  ui = { stage:q(".oae-stage"), k:q(".oae-card .oae-k"), t:q(".oae-card h3"), d:q(".oae-d"), e:q(".oae-eq"), prev:q('[data-a="prev"]'), next:q('[data-a="next"]'), play:q('[data-a="play"]'), dots:q(".oae-dots"),
    gT:q('[data-g="T"]'), gC:q('[data-g="C"]'), gO:q('[data-g="O"]'), bT:q('[data-b="T"]'), bC:q('[data-b="C"]'), bO:q('[data-b="O"]'), cProg:q('[data-c="prog"]'), cDot:q('[data-c="dot"]') };
  if (!S) {
    S = buildScene(ui.stage);
    S.controls.addEventListener("start", () => { tween = null; });
    ro = new ResizeObserver(size);
    io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } });
  } else { ro.disconnect(); io.disconnect(); }
  ui.stage.prepend(S.renderer.domElement);
  const labBox = q(".oae-labels");
  ui.labs = L.L.map((t) => { const el = document.createElement("span"); el.className = "oae-lab"; el.textContent = t; labBox.appendChild(el); return el; });
  for (const key in S.arrows) { const A = S.arrows[key], f = L.F[key]; const el = document.createElement("span"); el.className = "oae-flux"; el.style.background = A.color; el.innerHTML = f[0] + (f[1] ? `<small>${f[1]}</small>` : ""); labBox.appendChild(el); A.el = el; }
  L.S.forEach((s, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "oae-dot"; b.textContent = i + 1; b.setAttribute("aria-label", (lang() === "es" ? "Paso " : "Step ") + (i + 1) + ": " + s[0]); b.onclick = () => go(i, true); ui.dots.appendChild(b); });
  ui.prev.onclick = () => go(step - 1, true);
  ui.next.onclick = () => go(step + 1, true);
  ui.play.onclick = () => {
    if (timer) { stopPlay(); return; }
    if (step === STEPS.length - 1) go(0, false);
    ui.play.textContent = TX[lang()].pause;
    timer = setInterval(() => { if (step >= STEPS.length - 1) { stopPlay(); return; } go(step + 1, false); }, 6500);
  };
  q('[data-a="overview"]').onclick = () => flyTo("overview");
  q('[data-a="labels"]').onclick = (ev) => { const on = labBox.style.visibility !== "hidden" ? false : true; labBox.style.visibility = on ? "visible" : "hidden"; ev.currentTarget.setAttribute("aria-pressed", String(on)); };
  if (timer) { clearInterval(timer); timer = 0; }
  ro.observe(ui.stage); io.observe(ui.stage);
  size();
  S.paintWater(cur);
  go(step, false, true);
  if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
}

addEventListener("secaba:render", attach);
attach();
