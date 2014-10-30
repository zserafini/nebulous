var Player = function (args) {
  // this is your constructor
  this.health = args.key;
}

Player.prototype.collidesWith = function (other) {

}


var newPlayer = new Player({ key: "val" });

console.log(newPlayer.health);  // "val"
