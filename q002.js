registerQuestion({
  scene: 'park',
  id: 'bird-appears',
  before: {
    ball: true,
    flower: true,
    birdCount: 0,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  },
  after: {
    ball: true,
    flower: true,
    birdCount: 1,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  }
});
