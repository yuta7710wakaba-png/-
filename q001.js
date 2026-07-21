registerQuestion({
  scene: 'park',
  id: 'flower-appears',
  before: {
    ball: true,
    flower: false,
    birdCount: 0,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  },
  after: {
    ball: true,
    flower: true,
    birdCount: 0,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  }
});
