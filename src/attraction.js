var Attraction = function (a, b, k, distanceMin) {
  var that = {},
      on = true,
      distanceMinSquared = Math.pow(distanceMin, 2);

  that.toString = function () {
    return "a: " + a +
           "\nb: " + b +
           "\nk: " + k +
           "\ndistanceMin " + distanceMin;
  };

  that.setA = function (p) {
    a = p;
  };

  that.setB = function (p) {
    b = p;
  };

  that.getMinimumDistance = function () {
    return distanceMin;
  };

  that.setMinimumDistance = function (d) {
    distanceMin = d;
    distanceMinSquared = Math.pow(d, 2);
  };

  that.turnOff = function () {
    on = false;
  };

  that.turnOn = function () {
    on = true;
  };

  that.setStrength = function (newK) {
    k = newK;
  };

  that.getOneEnd = function () {
    return a;
  };

  that.getTheOtherEnd = function () {
    return b;
  };

  that.apply = function () {
    if (on && (a.isFree() || b.isFree())) {
      var a2bX = a.position().x() - b.position().x(),
          a2bY = a.position().y() - b.position().y(),
          a2bZ = a.position().z() - b.position().z(),
          a2bDistanceSquared = a2bX*a2bX + a2bY*a2bY + a2bZ*a2bZ;

      if (a2bDistanceSquared < distanceMinSquared) {
        a2bDistanceSquared = distanceMinSquared;
      };

      var force = k * a.mass() * b.mass() / a2bDistanceSquared,
          length = Math.sqrt(a2bDistanceSquared);

      a2bX /= length;
      a2bY /= length;
      a2bZ /= length;

      a2bX *= force;
      a2bY *= force;
      a2bZ *= force;

      if (a.isFree()) {
        a.force().add(-a2bX, -a2bY, -a2bZ);
      };
      if (b.isFree()) {
        b.force().add(a2bX, a2bY, a2bZ);
      };
    };
  };

  that.getStrength = function () {
    return k;
  };

  that.isOn = function () {
    return on;
  };

  that.isOff = function () {
    return !on;
  };

  return that;
};
