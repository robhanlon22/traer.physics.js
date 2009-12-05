var Particle = function (mass) {
  var that = {}, 
      position = new Vector3D(), 
      velocity = new Vector3D(), 
      force = new Vector3D(), 
      age = 0, 
      dead = false,
      fixed = false;
  
  that.toString = function () {
    return "position: " + position +
           "\n velocity: " + velocity +
           "\n force: " + force +
           "\n age: " + age +
           "\n dead: " + dead +
           "\n fixed: " + fixed;
  };

  that.distanceTo = function (p) {
    return that.position().distanceTo(p.position());
  };

  that.makeFixed = function () {
    fixed = true;
    velocity.clear();
  };

  that.isFixed = function () {
    return fixed;
  };

  that.isFree = function () {
    return !fixed;
  };

  that.position = function () {
    return position;
  };

  that.velocity = function () {
    return velocity;
  };

  that.mass = function () {
    return mass;
  };

  that.setMass = function (m) {
    mass = m;
  };

  that.force = function () {
    return force;
  };

  that.age = function () {
    return age;
  };

  that.reset = function () {
    age = 0;
    dead = false;
    position.clear();
    velocity.clear();
    force.clear();
    mass = 1;
  };

  return that;
};

