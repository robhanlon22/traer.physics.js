var Spring = function (springConstant, damping, restLength, a, b) {
  var that = {},
      on = true;

  that.turnOff = function () {
    on = false;
  };

  that.turnOn = function () {
    on = true;
  };

  that.isOn = function () {
    return on;
  };

  that.isOff = function () {
    return !on;
  };

  that.getOneEnd = function () {
    return a;
  };

  that.getTheOtherEnd = function () {
    return b;
  };

  that.currentLength = function () {
    return a.position().distanceTo(b.position());
  };

  that.restLength = function () {
    return restLength;
  };

  that.strength = function () {
    return springConstant;
  }

  that.setStrength = function (ks) {
    springConstant = ks;
  };

  that.damping = function () {
    return damping;
  };

  that.setDamping = function (d) {
    damping = d;
  };

  that.setRestLength = function (l) {
    restLength = l;
  };

  that.apply = function () {
    if (on && (a.isFree() || b.isFree())) {
      var a2bX = a.position().x() - b.position().x(),
          a2bY = a.position().y() - b.position().y(),
          a2bZ = a.position().z() - b.position().z(),
          a2bDistance = Math.sqrt(Math.pow(a2bX, 2) +
                                  Math.pow(a2bY, 2) +
                                  Math.pow(a2bZ, 2));

      if (a2bDistance == 0) {
        a2bX = a2bY = a2bZ = 0;
      } else {
        a2bX /= a2bDistance;
        a2bY /= a2bDistance;
        a2bZ /= a2bDistance;
      };

      var springForce = -(a2bDistance - restLength) * springConstant,
          vA2bX = a.velocity().x() - b.velocity().x(),
          vA2bY = a.velocity().y() - b.velocity().y(),
          vA2bZ = a.velocity().z() - b.velocity().z(),
          dampingForce = -damping * (a2bX * vA2bX + a2bY * vA2bY + a2bZ * vA2bZ),
          r = springForce + dampingForce;

      a2bX *= r;
      a2bY *= r;
      a2bZ *= r;

      if (a.isFree()) {
        a.force().add(a2bX, a2bY, a2bZ);
      };
      if (b.isFree()) {
        b.force().add(-a2bX, -a2bY, -a2bZ);
      };
    };
  };

  return that;
};
