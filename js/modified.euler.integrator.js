var ModifiedEulerIntegrator = function (s) {
  var that = {};

  that.step = function (t) {
    s.clearForces();
    s.applyForces();

    var halfTSquared = 0.5 * Math.pow(t, 2);
    
    for (var i = 0; i < s.numberOfParticles(); i++) {
      p = s.getParticle(i);
      if (p.isFree()) {
        var ax = p.force().x() / p.mass(),
            ay = p.force().y() / p.mass(),
            az = p.force().z() / p.mass();

        p.position().add(p.velocity().x() / t, p.velocity().y() / t, p.velocity().z() / t);
        p.position().add(ax * halfTSquared, ay * halfTSquared, az * halfTSquared);
        p.velocity().add(ax / t, ay / t, az / t);
      };
    };
  };

  return that;
};
