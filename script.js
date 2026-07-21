const menu = document.getElementById('menu');
const viewer = document.getElementById('viewer');
const scene = document.getElementById('scene');
const nextScene = document.getElementById('nextScene');
const paperStage = document.getElementById('paperStage');
const counter = document.getElementById('counter');
const teacherMenu = document.getElementById('teacherMenu');
const hint = document.getElementById('hint');

let questionIndex = 0;
let pageIndex = 0; // 0＝変化前、1＝変化後
let highlight = false;
let holdTimer = null;
let moved = false;
let isTurning = false;

function getQuestion(qIndex = questionIndex) {
  return material.questions[qIndex] || null;
}

function getCurrentState(qIndex = questionIndex, pIndex = pageIndex) {
  const question = getQuestion(qIndex);
  if (!question) return {};
  return pIndex === 0 ? question.before : question.after;
}

function renderScene(qIndex = questionIndex, pIndex = pageIndex, showHighlight = highlight) {
  const question = getQuestion(qIndex);

  if (!question) {
    return '<div class="scene-error">表示できる問題がありません</div>';
  }

  const renderer = window.sceneRenderers[question.scene];

  if (typeof renderer !== 'function') {
    console.warn(`シーン「${question.scene}」が登録されていません`);
    return `<div class="scene-error">シーン「${question.scene}」を表示できません</div>`;
  }

  return renderer(getCurrentState(qIndex, pIndex), showHighlight);
}

function updateCounter() {
  if (material.questions.length === 0) {
    counter.textContent = '問題 0/0';
    return;
  }
  const pageText = pageIndex === 0 ? '変化前' : '変化後';
  counter.textContent = `問題 ${questionIndex + 1}/${material.questions.length}｜${pageText}`;
}

function render() {
  scene.innerHTML = renderScene();
  nextScene.innerHTML = '';
  updateCounter();
}

function openViewer() {
  if (material.questions.length === 0) {
    alert('表示できる問題がありません。');
    return;
  }
  questionIndex = 0;
  pageIndex = 0;
  highlight = false;
  render();
  menu.classList.remove('active');
  viewer.classList.add('active');
  hint.classList.add('show');
  setTimeout(() => hint.classList.remove('show'), 2500);
}

function closeViewer() {
  isTurning = false;
  paperStage.classList.remove('turning-next', 'turning-prev');
  viewer.classList.remove('active');
  menu.classList.add('active');
  closeTeacherMenu();
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
}

function getTarget(direction) {
  if (material.questions.length === 0) return null;

  let q = questionIndex;
  let p = pageIndex;

  if (direction === 'next') {
    if (p === 0) {
      p = 1;
    } else {
      q += 1;
      p = 0;
    }
  } else {
    if (p === 1) {
      p = 0;
    } else {
      q -= 1;
      p = 1;
    }
  }

  if (q < 0 || q >= material.questions.length) return null;
  return { questionIndex: q, pageIndex: p };
}

function turnPage(direction) {
  if (isTurning) return;

  const target = getTarget(direction);
  if (!target) return;

  isTurning = true;
  highlight = false;
  const turnClass = direction === 'next' ? 'turning-next' : 'turning-prev';

  nextScene.innerHTML = renderScene(target.questionIndex, target.pageIndex, false);
  paperStage.classList.remove('turning-next', 'turning-prev');
  void paperStage.offsetWidth;
  paperStage.classList.add(turnClass);

  window.setTimeout(() => {
    questionIndex = target.questionIndex;
    pageIndex = target.pageIndex;
    scene.innerHTML = nextScene.innerHTML;
    nextScene.innerHTML = '';
    updateCounter();
    paperStage.classList.remove(turnClass);
    isTurning = false;
  }, 640);
}

function next() { turnPage('next'); }
function prev() { turnPage('prev'); }
function openTeacherMenu() {
  teacherMenu.classList.add('open');
  teacherMenu.setAttribute('aria-hidden', 'false');
}
function closeTeacherMenu() {
  teacherMenu.classList.remove('open');
  teacherMenu.setAttribute('aria-hidden', 'true');
}

function startHold() {
  moved = false;
  clearTimeout(holdTimer);
  holdTimer = setTimeout(() => {
    if (!moved) openTeacherMenu();
  }, 900);
}
function cancelHold() { clearTimeout(holdTimer); }

document.getElementById('materialTitle').textContent = material.title;
document.getElementById('startBtn').addEventListener('click', openViewer);
document.getElementById('closeBtn').addEventListener('click', e => {
  e.stopPropagation();
  closeViewer();
});
document.getElementById('nextZone').addEventListener('click', () => {
  if (!teacherMenu.classList.contains('open')) next();
});
document.getElementById('prevZone').addEventListener('click', () => {
  if (!teacherMenu.classList.contains('open')) prev();
});
viewer.addEventListener('pointerdown', e => {
  if (e.target.closest('button') || teacherMenu.classList.contains('open')) return;
  startHold();
});
viewer.addEventListener('pointermove', () => {
  moved = true;
  cancelHold();
});
viewer.addEventListener('pointerup', cancelHold);
viewer.addEventListener('pointercancel', cancelHold);

document.getElementById('firstBtn').addEventListener('click', () => {
  questionIndex = 0;
  pageIndex = 0;
  highlight = false;
  render();
  closeTeacherMenu();
});
document.getElementById('answerBtn').addEventListener('click', () => {
  pageIndex = 1;
  highlight = true;
  render();
  closeTeacherMenu();
});
document.getElementById('resumeBtn').addEventListener('click', closeTeacherMenu);
document.getElementById('exitBtn').addEventListener('click', closeViewer);
document.getElementById('fullscreenBtn').addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (e) {}
  closeTeacherMenu();
});
teacherMenu.addEventListener('click', e => {
  if (e.target === teacherMenu) closeTeacherMenu();
});

render();
