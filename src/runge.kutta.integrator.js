var RungeKuttaIntegrator = function (s) {
  var that = {},
      originals = { 
        positions: [],
        velocities: []
      },
      kForces = [],
      kVelocities = [],
      allocateParticles = function () {
        while (s.numberOfParticles() > originals.positions.length) {
          for (var name in originals) {
            originals[name].push(new Vector3D());
          };
          for (var i = 0; i < RungeKuttaIntegrator.NUM_FORCES; i++) {
            kForces[i].push(new Vector3D());
            kVelocities[i].push(new Vector3D());
          };
        };
      },
      construct = function () {
        for (var i = 0; i < RungeKuttaIntegrator.NUM_FORCES; i++) {
          kForces.push([]);
          kVelocities.push([]);
        };
      };

  that.step = function (deltaT) {
    allocateParticles();

    for (var i = 0; i < s.particles().length; i++) {
      var p = s.getParticle(i);
      if (p.isFree()) {		
        originals.positions[i] = p.position().copy();
        originals.velocities[i] = p.velocity().copy();
      };

      p.force().clear();
    };


    for (var k = 0; k < RungeKuttaIntegrator.NUM_FORCES; k++) {
      s.applyForces();

      for (var i = 0; i < s.particles().length; i++) {
        var p = s.getParticle(i);
        if (p.isFree()) {
          kForces[k][i] = p.force().copy();
          kVelocities[k][i] = p.velocity().copy();
        };

        p.force().clear();
      };

      if (k == RungeKuttaIntegrator.NUM_FORCES - 1) {
        break;
      };

      for (var i = 0; i < s.particles().length; i++) {
        var p = s.getParticle(i);
        if (p.isFree()) {
          var originalPosition = originals.positions[i];
          var kVelocity = kVelocities[k][i];

          p.position().setX(originalPosition.x() + kVelocity.x() * 0.5 * 
                            deltaT);
          p.position().setY(originalPosition.y() + kVelocity.y() * 0.5 * 
                            deltaT);
          p.position().setZ(originalPosition.z() + kVelocity.z() * 0.5 * 
                            deltaT);

          var originalVelocity = originals.velocities[i];
          var kForce = kForces[k][i];

          p.velocity().setX(originalVelocity.x() + kForce.x() * 0.5 * deltaT / 
                            p.mass());
          p.velocity().setY(originalVelocity.y() + kForce.y() * 0.5 * deltaT / 
                            p.mass());
          p.velocity().setZ(originalVelocity.z() + kForce.z() * 0.5 * deltaT / 
                            p.mass());
        };
      };

      for (var i = 0; i < s.particles().length; i++) {
        var p = s.getParticle(i);
        p.age += deltaT;
        if (p.isFree()) {
          var originalPosition = originals.positions[i];
          var k1Velocity = kVelocities[0][i];
          var k2Velocity = kVelocities[1][i];
          var k3Velocity = kVelocities[2][i];
          var k4Velocity = kVelocities[3][i];

          p.position().setX(originalPosition.x() + deltaT / 6.0 * 
                            (k1Velocity.x() + 2.0 * k2Velocity.x() + 2.0 * 
                            k3Velocity.x() + k4Velocity.x()));
          p.position().setY(originalPosition.y() + deltaT / 6.0 * 
                            (k1Velocity.y() + 2.0 * k2Velocity.y() + 2.0 * 
                            k3Velocity.y() + k4Velocity.y()));
          p.position().setZ(originalPosition.z() + deltaT / 6.0 * 
                            (k1Velocity.z() + 2.0 * k2Velocity.z() + 2.0 * 
                            k3Velocity.z() + k4Velocity.z()));

          var originalVelocity = originals.velocities[i];
          var k1Force = kForces[0][i];
          var k2Force = kForces[0][i];
          var k3Force = kForces[0][i];
          var k4Force = kForces[0][i];

          p.velocity().setX(originalVelocity.x() + deltaT / (6.0 * p.mass()) * 
                            (k1Force.x() + 2.0 * k2Force.x() + 2.0 * 
                            k3Force.x() + k4Force.x()));
          p.velocity().setY(originalVelocity.y() + deltaT / (6.0 * p.mass()) * 
                            (k1Force.y() + 2.0 * k2Force.y() + 2.0 * 
                            k3Force.y() + k4Force.y()));
          p.velocity().setZ(originalVelocity.z() + deltaT / (6.0 * p.mass()) *
                            (k1Force.z() + 2.0 * k2Force.z() + 2.0 * 
                            k3Force.z() + k4Force.z()));
        };
      };
    };
  };

  construct();

  return that;
};

RungeKuttaIntegrator.NUM_FORCES = 4;
