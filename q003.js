registerQuestion({
  scene: 'park',
  id: 'ball-disappears',
  before: {
    ball: true,
    flower: true,
    birdCount: 1,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  },
  after: {
    ball: false,
    flower: true,
    birdCount: 1,
    shirtColor: '#79b7f2',
    cup: false,
    flowerSide: 'left'
  }
});
