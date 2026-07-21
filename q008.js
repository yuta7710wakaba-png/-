registerQuestion({
  scene: 'festival',
  id: 'festival-balloon-disappears',
  before: {
    lanternCount: 5,
    balloon: true,
    goldfishCount: 1,
    maskType: 'fox',
    cottonCandy: true,
    childYukataColor: '#79b7f2'
  },
  after: {
    lanternCount: 5,
    balloon: false,
    goldfishCount: 1,
    maskType: 'fox',
    cottonCandy: true,
    childYukataColor: '#79b7f2'
  }
});
