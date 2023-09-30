
export function Colors() {
  this.colors = [
    {
      c1: "#303030",
      c2: "#575757",
      c3: "#FBB034",
      c4: "#ffffff",
      c5: "#000000",
    }
  ]

  this.selectedColors = this.colors[0];
}

Colors.prototype.setColors = function(colorsN = 0) {
  this.selectedColors = this.colors[colorsN];
}
Colors.prototype.getColors = function() {
  return this.selectedColors;
}
