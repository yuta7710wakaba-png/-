const menu = document.getElementById('menu');
const viewer = document.getElementById('viewer');
const scene = document.getElementById('scene');
const nextScene = document.getElementById('nextScene');
const paperStage = document.getElementById('paperStage');
const counter = document.getElementById('counter');
const teacherMenu = document.getElementById('teacherMenu');
const hint = document.getElementById('hint');

let selectedScene = '';
let activeQuestions = [];
let stepIndex = 0;
let highlight = false;
let holdTimer = null;
let moved = false;
let isTurning = false;

function getRenderer() {
  return window.sceneRenderers[selectedScene];
}

function getStepState(index = stepIndex) {
  if (activeQuestions.length === 0) return {};
  if (index === 0) return activeQuestions[0].before;
  return activeQuestions[index - 1].after;
}

function renderScene(index = stepIndex, showHighlight = highlight) {
  const renderer = getRenderer();

  if (typeof renderer !== 'function') {
    return `<div class="scene-error">「${selectedScene}」の風景を表示できません</div>`;
  }

  return renderer(getStepState(index), showHighlight);
}

function updateCounter() {
  if (activeQuestions.length === 0) {
    counter.textContent = '問題 0/0';
    return;
  }

  if (stepIndex === 0) {
    counter.textContent = `よくみてね｜全${activeQuestions.length}問`;
    return;
  }

  counter.textContent = `問題 ${stepIndex}/${activeQuestions.length}`;
}

function render() {
  scene.innerHTML = renderScene();
  nextScene.innerHTML = '';
  updateCounter();
}

function openViewer(sceneName) {
  selectedScene = sceneName;
  activeQuestions = material.questions.filter(question => question.scene === sceneName);

  if (activeQuestions.length === 0) {
    alert('この風景には表示できる問題がありません。');
    return;
  }

  stepIndex = 0;
  highlight = false;
  render();
  menu.classList.remove('active');
  viewer.classList.add('active');
  hint.classList.add('show');
  window.setTimeout(() => hint.classList.remove('show'), 2500);
}

function closeViewer() {
  isTurning = false;
  paperStage.classList.remove('turning-next', 'turning-prev');
  viewer.classList.remove('active');
  menu.classList.add('active');
  closeTeacherMenu();

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
}

function getTarget(direction) {
  const target = direction === 'next' ? stepIndex + 1 : stepIndex - 1;
  if (target < 0 || target > activeQuestions.length) return null;
  return target;
}

function turnPage(direction) {
  if (isTurning) return;

  const targetIndex = getTarget(direction);
  if (targetIndex === null) return;

  isTurning = true;
  highlight = false;
  const turnClass = direction === 'next' ? 'turning-next' : 'turning-prev';

  nextScene.innerHTML = renderScene(targetIndex, false);
  paperStage.classList.remove('turning-next', 'turning-prev');
  void paperStage.offsetWidth;
  paperStage.classList.add(turnClass);

  window.setTimeout(() => {
    stepIndex = targetIndex;
    scene.innerHTML = nextScene.innerHTML;
    nextScene.innerHTML = '';
    updateCounter();
    paperStage.classList.remove(turnClass);
    isTurning = false;
  }, 640);
}

function next() {
  turnPage('next');
}

function prev() {
  turnPage('prev');
}

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
  holdTimer = window.setTimeout(() => {
    if (!moved) openTeacherMenu();
  }, 900);
}

function cancelHold() {
  clearTimeout(holdTimer);
}

document.querySelectorAll('.scene-start-btn').forEach(button => {
  button.addEventListener('click', () => openViewer(button.dataset.scene));
});

document.getElementById('closeBtn').addEventListener('click', event => {
  event.stopPropagation();
  closeViewer();
});

document.getElementById('nextZone').addEventListener('click', () => {
  if (!teacherMenu.classList.contains('open')) next();
});

document.getElementById('prevZone').addEventListener('click', () => {
  if (!teacherMenu.classList.contains('open')) prev();
});

viewer.addEventListener('pointerdown', event => {
  if (event.target.closest('button') || teacherMenu.classList.contains('open')) return;
  startHold();
});

viewer.addEventListener('pointermove', () => {
  moved = true;
  cancelHold();
});

viewer.addEventListener('pointerup', cancelHold);
viewer.addEventListener('pointercancel', cancelHold);

document.getElementById('firstBtn').addEventListener('click', () => {
  stepIndex = 0;
  highlight = false;
  render();
  closeTeacherMenu();
});

document.getElementById('answerBtn').addEventListener('click', () => {
  if (stepIndex === 0 && activeQuestions.length > 0) {
    stepIndex = 1;
  }
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
  } catch (error) {
    console.warn('全画面表示を切り替えられませんでした', error);
  }

  closeTeacherMenu();
});

teacherMenu.addEventListener('click', event => {
  if (event.target === teacherMenu) closeTeacherMenu();
});
