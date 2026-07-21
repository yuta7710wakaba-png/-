const material = {
  title: 'なにがかわった？',
  difficulty: 1,

  // ここへ問題を追加するだけで、自動的に教材へ反映されます。
  // before＝変化前、after＝変化後
  questions: [
    {
      id: 'flower-appears',
      before: { ball: true,  flower: false, birdCount: 0, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' },
      after:  { ball: true,  flower: true,  birdCount: 0, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' }
    },
    {
      id: 'bird-appears',
      before: { ball: true,  flower: true, birdCount: 0, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' },
      after:  { ball: true,  flower: true, birdCount: 1, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' }
    },
    {
      id: 'ball-disappears',
      before: { ball: true,  flower: true, birdCount: 1, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' },
      after:  { ball: false, flower: true, birdCount: 1, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' }
    },
    {
      id: 'shirt-color',
      before: { ball: false, flower: true, birdCount: 1, shirtColor: '#79b7f2', cup: false, flowerSide: 'left' },
      after:  { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: false, flowerSide: 'left' }
    },
    {
      id: 'cup-appears',
      before: { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: false, flowerSide: 'left' },
      after:  { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: true,  flowerSide: 'left' }
    },
    {
      id: 'flower-moves',
      before: { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: true, flowerSide: 'left' },
      after:  { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: true, flowerSide: 'right' }
    },
    {
      id: 'bird-increases',
      before: { ball: false, flower: true, birdCount: 1, shirtColor: '#ef8b67', cup: true, flowerSide: 'right' },
      after:  { ball: false, flower: true, birdCount: 2, shirtColor: '#ef8b67', cup: true, flowerSide: 'right' }
    }

    /*
    ▼ 新しい問題の追加例

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
    */
  ]
};
