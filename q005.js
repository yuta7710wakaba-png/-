registerQuestion({
  scene: 'park',
  id: 'cup-appears',
  before: {
    ball: false,
    flower: true,
    birdCount: 1,
    shirtColor: '#ef8b67',
    cup: false,
    flowerSide: 'left'
  },
  after: {
    ball: false,
    flower: true,
    birdCount: 1,
    shirtColor: '#ef8b67',
    cup: true,
    flowerSide: 'left'
  }
});
