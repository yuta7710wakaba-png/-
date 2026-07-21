const menu = document.getElementById('menu');
const viewer = document.getElementById('viewer');
const scene = document.getElementById('scene');
const nextScene = document.getElementById('nextScene');
const paperStage = document.getElementById('paperStage');
const counter = document.getElementById('counter');
const teacherMenu = document.getElementById('teacherMenu');
const hint = document.getElementById('hint');
let step = 0;
let highlight = false;
let holdTimer = null;
let moved = false;
let isTurning = false;

function parkSvg(s){
  const ball = s.ball ? `<g class="change-target"><circle cx="1220" cy="690" r="52" fill="#ffcf4a" stroke="#fff" stroke-width="10"/><path d="M1170 690h100M1220 640v100" stroke="#ef7c57" stroke-width="16"/></g>` : '';
  const flower = s.flower ? `<g class="change-target"><circle cx="340" cy="710" r="20" fill="#ffd84f"/><g fill="#ff8fb1"><circle cx="340" cy="676" r="23"/><circle cx="374" cy="710" r="23"/><circle cx="340" cy="744" r="23"/><circle cx="306" cy="710" r="23"/></g><path d="M340 748v72" stroke="#4ca66b" stroke-width="13"/></g>` : '';
  const bird = s.bird ? `<g class="change-target"><path d="M1040 210q35-40 70 0q35-40 70 0" fill="none" stroke="#405e78" stroke-width="13" stroke-linecap="round"/></g>` : '';
  return `
  <svg viewBox="0 0 1600 900" role="img" aria-label="公園の場面">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfeaff"/><stop offset="1" stop-color="#eefbff"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="1600" height="900" fill="url(#sky)"/>
    <circle cx="1420" cy="120" r="68" fill="#ffe27a"/>
    <path d="M0 610 Q250 540 500 620 T1000 600 T1600 610 V900 H0Z" fill="#8bd17f"/>
    <path d="M0 720 Q320 650 620 720 T1250 700 T1600 710 V900 H0Z" fill="#6dbc69"/>
    <g transform="translate(160 250)">
      <rect x="110" y="260" width="35" height="310" fill="#8a5b3c"/><circle cx="128" cy="210" r="115" fill="#61b86f"/><circle cx="40" cy="260" r="90" fill="#6cc47b"/><circle cx="205" cy="275" r="95" fill="#67bd73"/>
    </g>
    <g transform="translate(680 420)">
      <path d="M0 250h330" stroke="#5f7180" stroke-width="24"/><path d="M25 250V60M305 250V60" stroke="#5f7180" stroke-width="22"/><path d="M25 70h280" stroke="#ef8b67" stroke-width="34"/><path d="M60 70l90 180M270 70l-90 180" stroke="#ef8b67" stroke-width="28"/>
      <rect x="130" y="190" width="70" height="35" rx="8" fill="#6b5d4e"/>
    </g>
    <g transform="translate(1070 390)">
      <rect x="0" y="140" width="210" height="36" rx="10" fill="#9a6745"/><rect x="22" y="176" width="25" height="120" fill="#6d4b38"/><rect x="164" y="176" width="25" height="120" fill="#6d4b38"/>
    </g>
    <g transform="translate(520 540)">
      <circle cx="0" cy="0" r="55" fill="#ffd2b8"/><path d="M-48-15q48-65 96 0" fill="#704e3c"/><rect x="-55" y="52" width="110" height="155" rx="42" fill="#79b7f2"/><path d="M-35 205l-25 115M35 205l25 115" stroke="#536c82" stroke-width="25" stroke-linecap="round"/><path d="M-50 95l-85 65M50 95l85 65" stroke="#ffd2b8" stroke-width="24" stroke-linecap="round"/>
      <circle cx="-18" cy="0" r="5" fill="#445"/><circle cx="18" cy="0" r="5" fill="#445"/><path d="M-18 24q18 16 36 0" fill="none" stroke="#d36f6f" stroke-width="5" stroke-linecap="round"/>
    </g>
    ${ball}${flower}${bird}
    ${highlight ? `<rect x="20" y="20" width="1560" height="860" rx="30" fill="none" stroke="#ff5e5e" stroke-width="18" stroke-dasharray="30 20" filter="url(#glow)"/>` : ''}
  </svg>`;
}

function render(){
  scene.innerHTML = parkSvg({...material.steps[step], highlight});
  nextScene.innerHTML = '';
  counter.textContent = `${step + 1}/${material.steps.length}`;
}

function openViewer(){
  step = 0; highlight = false; render();
  menu.classList.remove('active'); viewer.classList.add('active');
  hint.classList.add('show'); setTimeout(()=>hint.classList.remove('show'),2500);
}
function closeViewer(){
  isTurning=false; paperStage.classList.remove('turning-next','turning-prev');
  viewer.classList.remove('active'); menu.classList.add('active'); closeTeacherMenu();
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
}
function turnPage(direction){
  if(isTurning) return;
  const target = direction === 'next' ? step + 1 : step - 1;
  if(target < 0 || target >= material.steps.length) return;

  isTurning = true;
  highlight = false;
  const turnClass = direction === 'next' ? 'turning-next' : 'turning-prev';

  nextScene.innerHTML = parkSvg({...material.steps[target], highlight:false});
  paperStage.classList.remove('turning-next','turning-prev');
  void paperStage.offsetWidth;
  paperStage.classList.add(turnClass);

  window.setTimeout(()=>{
    step = target;
    scene.innerHTML = nextScene.innerHTML;
    nextScene.innerHTML = '';
    counter.textContent = `${step + 1}/${material.steps.length}`;
    paperStage.classList.remove(turnClass);
    isTurning = false;
  },640);
}
function next(){ turnPage('next'); }
function prev(){ turnPage('prev'); }
function openTeacherMenu(){ teacherMenu.classList.add('open'); teacherMenu.setAttribute('aria-hidden','false'); }
function closeTeacherMenu(){ teacherMenu.classList.remove('open'); teacherMenu.setAttribute('aria-hidden','true'); }

function startHold(){ moved=false; clearTimeout(holdTimer); holdTimer=setTimeout(()=>{ if(!moved) openTeacherMenu(); },900); }
function cancelHold(){ clearTimeout(holdTimer); }

document.getElementById('startBtn').addEventListener('click',openViewer);
document.getElementById('closeBtn').addEventListener('click',e=>{e.stopPropagation();closeViewer();});
document.getElementById('nextZone').addEventListener('click',()=>{if(!teacherMenu.classList.contains('open'))next();});
document.getElementById('prevZone').addEventListener('click',()=>{if(!teacherMenu.classList.contains('open'))prev();});
viewer.addEventListener('pointerdown',e=>{ if(e.target.closest('button')||teacherMenu.classList.contains('open')) return; startHold(); });
viewer.addEventListener('pointermove',()=>{moved=true;cancelHold();});
viewer.addEventListener('pointerup',cancelHold);
viewer.addEventListener('pointercancel',cancelHold);
document.getElementById('firstBtn').addEventListener('click',()=>{step=0;highlight=false;render();closeTeacherMenu();});
document.getElementById('answerBtn').addEventListener('click',()=>{highlight=true;render();closeTeacherMenu();});
document.getElementById('resumeBtn').addEventListener('click',closeTeacherMenu);
document.getElementById('exitBtn').addEventListener('click',closeViewer);
document.getElementById('fullscreenBtn').addEventListener('click',async()=>{
  try{ if(!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); }catch(e){}
  closeTeacherMenu();
});
teacherMenu.addEventListener('click',e=>{ if(e.target===teacherMenu) closeTeacherMenu(); });

render();