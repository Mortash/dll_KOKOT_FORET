// Singleton of the main object
var canvas = {
  canva: "",
  ctx: "",
  w: 0,
  h: 0,
  ballArray: [],
  etArray: [],
  nuageArray: [],
  writ: [],
  delta: 0,
  score: 0,

  constructor: function() {
    this.canva = document.querySelector("#myCanvas");
    this.ctx = this.canva.getContext('2d');
    this.w = this.canva.width;
    this.h = this.canva.height;
  },

  // Reset the game
  reset: function() {
    this.ballArray = [];
    this.etArray = [];
    this.nuageArray = [];
  }
};