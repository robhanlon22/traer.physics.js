var RungeKuttaIntegrator = function (s) {
  var that = {},
      originals = {
        pos: [],
        vel: []
      },
      forces = new Array([], [], [], []),
      velocities = new Array([], [], [], []);

  that.allocateParticles = function () {
    while (s.particles().length > originals['pos'].length) {
      for (var item in originals) {
        originals[item].push(new Vector3D());
      };
      for (var i = 0; i < forces.length; i++) {
        forces[i].push(new Vector3D());
        velocities[i].push(new Vector3D());
      };
    };
  };

  that.step = function (deltaT) {
    for (var i = 0; i < s.particles().length; i++) {
      var p = s.particles()[i];
      if (p.isFree()) {
        originals['pos'][i] = p.position();
        originals['vel'][i] = p.velocity();
      };
      p.force().clear();
    };

    for (var k = 0; k < forces.length; i++) {
      s.applyForces();
      
      for (var i = 0; i < s.particles().length; i++) {
        var p = s.particles()[i];
        if (p.isFree()) {
          forces[k][i] = p.force();
          velocities[k][i] = p.velocity();
        };
      };

      for (var i = 0; i < s.particles().length; i++) {
        var p = s.particles()[i];
        if (p.isFree()) {
          var oPos = originals['pos'][i],
              kVel = velocities[k][i],
              mult = 0.5 * deltaT;

          p.position().set(oPos.x() + kVel.x() * mult,
                           oPos.y() + kVel.y() * mult,
                           oPos.z() + kVel.z() * mult);

          var oVel = originals['vel'][i],
              kFor = forces[k][i],
              divi = mult / p.mass();

          p.velocity().set(oVel.x() + kFor.x() * divi,
                           oVel.y() + kFor.y() * divi,
                           oVel.z() + kFor.z() * divi);
        };
      };
    };

    for (var i = 0; i < s.particles().length; i++) {
      var p = s.particles()[i];
      p.age += deltaT;
      if (p.isFree()) {
        var orPos = originals['pos'][i],
            k1Vel = velocities[0][i],
            k2Vel = velocities[1][i],
            k3Vel = velocities[2][i],
            k4Vel = velocities[3][i],
            divis = deltaT / 6.0;

        p.set(orPos.x() + divis * (k1Vel.x() + 2.0 * k2Vel.x() + 
                                   2.0 * k3Vel.x() + k4Vel.x()),
              orPos.y() + divis * (k1Vel.y() + 2.0 * k2Vel.y() + 
                                   2.0 * k3Vel.y() + k4Vel.y()),
              orPos.z() + divis * (k1Vel.z() + 2.0 * k2Vel.z() + 
                                   2.0 * k3Vel.z() + k4Vel.z()));

        var orVel = originals['vel'][i],
            k1For = forces[0][i],
            k2For = forces[1][i],
            k3For = forces[2][i],
            k4For = forces[3][i],
            dmass = divis / p.mass();

        p.set(orVel.x() + dmass * (k1For.x() + 2.0 * k2for.x() +
                                   2.0 * k3For.x() + k4For.x()),
              orVel.y() + dmass * (k1For.y() + 2.0 * k2for.y() +
                                   2.0 * k3For.y() + k4For.y()),
              orVel.z() + dmass * (k1For.z() + 2.0 * k2for.z() +
                                   2.0 * k3For.z() + k4For.z()),
      };
    };
  };

  return that;
};
