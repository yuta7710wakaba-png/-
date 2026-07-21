療育教材「みんなでみつけよう！」 Ver1.4

【今回の変更】
・問題データを「変化前／変化後」の1セットとして管理
・data.jsへ問題オブジェクトを追加するだけで問題数が自動的に増える構造へ変更
・問題数の手入力を廃止
・画面右側で「変化前→変化後→次の問題」へ進む
・画面左側で逆順に戻る
・先生用メニューの「変化を強調」で、現在の問題の変化後を表示

【新しい問題の追加方法】
data.jsのquestions配列の最後へ、以下の形を追加します。

,{
  id: 'new-question',
  before: {
    ball: true,
    flower: false,
    birdCount: 0,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  },
  after: {
    ball: false,
    flower: false,
    birdCount: 0,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  }
}

保存後、index.htmlを開き直すだけで問題が追加されます。

【現在変更できる項目】
ball：ボールの表示 true / false
flower：花の表示 true / false
birdCount：鳥の数 0 / 1 / 2
shirtColor：服の色 CSSカラー
cup：コップの表示 true / false
flowerSide：花の位置 'left' / 'right'

【注意】
現在は「公園の場面」を使った問題をデータ追加だけで増やせます。
部屋や教室など、まったく新しい背景を追加する場合は、背景を描く処理の追加が必要です。

【GitHub Pages更新】
このフォルダ内の4ファイルを既存リポジトリへ上書きしてください。
