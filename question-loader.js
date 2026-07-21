window.material = {
  title: 'なにがかわった？',
  difficulty: 1,
  questions: []
};

window.registerQuestion = function registerQuestion(question) {
  try {
    if (!question || typeof question !== 'object') {
      throw new Error('問題データがオブジェクトではありません');
    }

    if (!question.id || typeof question.id !== 'string') {
      throw new Error('idがありません');
    }

    if (!question.scene || typeof question.scene !== 'string') {
      throw new Error('sceneがありません');
    }

    if (!question.before || typeof question.before !== 'object') {
      throw new Error('beforeがありません');
    }

    if (!question.after || typeof question.after !== 'object') {
      throw new Error('afterがありません');
    }

    const duplicated = window.material.questions.some(item => item.id === question.id);
    if (duplicated) {
      throw new Error(`id「${question.id}」が重複しています`);
    }

    window.material.questions.push(question);
  } catch (error) {
    console.warn('問題ファイルを読み込めませんでした:', error.message, question);
  }
};
