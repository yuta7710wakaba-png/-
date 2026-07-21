window.sceneRenderers = {};

window.registerScene = function registerScene(sceneName, renderer) {
  if (!sceneName || typeof sceneName !== 'string') {
    console.warn('シーン名が正しくありません');
    return;
  }

  if (typeof renderer !== 'function') {
    console.warn(`シーン「${sceneName}」の描画処理が正しくありません`);
    return;
  }

  window.sceneRenderers[sceneName] = renderer;
};
