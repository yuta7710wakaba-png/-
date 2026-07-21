療育教材「みんなでみつけよう！」 Ver2.0

【Ver2.0の目的】
問題データと風景の描画処理を分離し、公園以外の場面も追加できる構造にしました。

【収録内容】
・公園シーン：7問
・お祭りシーン：3問
・合計10問
・q011.js～q030.js：未使用の空ファイル

【ファイル構成】
index.html
style.css
script.js
scene-loader.js
question-loader.js

scenes/
  park.js
  festival.js

questions/
  q001.js～q030.js

【仕組み】
各問題ファイルに、使用する風景をsceneで指定します。

公園：
scene: 'park'

お祭り：
scene: 'festival'

script.jsがsceneの指定を確認し、対応するscenesファイルの描画処理を自動で使用します。

【新しい問題を追加するとき】
フォルダ一式をチャッピーへ渡し、次のように依頼します。

例：
「q011.jsに、お祭りで綿あめが消える問題を追加して」
「次の空ファイルに、公園で服の色が変わる問題を追加して」

ユーザー自身がコードをコピーして書き足す必要はありません。

【新しい風景を追加するとき】
例：
「教室シーンを追加して、その教室を使った問題を3問作って」

チャッピーが次の作業を行います。
1. scenes/classroom.jsを作成
2. index.htmlへシーンファイルの参照を追加
3. 空いている問題ファイルへscene: 'classroom'の問題を登録

【現在のお祭りシーンで使える変化】
lanternCount：提灯の数
balloon：風船の表示
goldfishCount：金魚の数
maskType：お面の種類（fox / cat）
cottonCandy：綿あめの表示
childYukataColor：子どもの浴衣の色

【安全設計】
・未登録のシーンを指定した問題は、エラー表示に切り替わります。
・問題IDの重複やbefore／after不足は自動で除外します。
・空ファイルは問題数に含まれません。
・1つの問題ファイルに不備があっても、正常な問題は継続して使用できます。
