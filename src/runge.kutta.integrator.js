var RungeKuttaIntegrator = function (s) {
  var that = {},
      originalPositions = [],
      originalVelocities = [],
      k1Forces = [],
      k1Velocities = [],
      k2Forces = [],
      k2Velocities = [],
      k3Forces = [],
      k3Velocities = [],
      k4Forces = [],
      k4Velocities = [],
      allocateParticles = function () {
        while (s.numberOfParticles() > originalPositions.length) {
          originalPositions.push(new Vector3D());
          originalVelocities.push(new Vector3D());
          k1Forces.push(new Vector3D());
          k1Velocities.push(new Vector3D());
          k2Forces.push(new Vector3D());
          k2Velocities.push(new Vector3D());
          k3Forces.push(new Vector3D());
          k3Velocities.push(new Vector3D());
          k4Forces.push(new Vector3D());
          k4Velocities.push(new Vector3D());
        };
      };

  that.step = function (deltaT) {
    allocateParticles();
    // save original position and velocities

    for (var i = 0; i < s.particles().length; ++i ) {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {		
        originalPositions[i] = p.position();
        originalVelocities[i] = p.velocity();
      }

      p.force().clear();	// and clear the forces
    }

    // get all the k1 values

    s.applyForces();

    // save thevarermediate forces
    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        k1Forces[i] = p.force();
        k1Velocities[i] = p.velocity();
      }

      p.force().clear();
    }

    // get k2 values

    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        var originalPosition = originalPositions[i];
        var k1Velocity = k1Velocities[i];

        p.position().setX( originalPosition.x() + k1Velocity.x() * 0.5 * deltaT);
        p.position().setY( originalPosition.y() + k1Velocity.y() * 0.5 * deltaT);
        p.position().setZ( originalPosition.z() + k1Velocity.z() * 0.5 * deltaT);

        var originalVelocity = originalVelocities[i];
        var k1Force = k1Forces[i];

        p.velocity().setX( originalVelocity.x() + k1Force.x() * 0.5 * deltaT / p.mass());
        p.velocity().setY( originalVelocity.y() + k1Force.y() * 0.5 * deltaT / p.mass());
        p.velocity().setZ( originalVelocity.z() + k1Force.z() * 0.5 * deltaT / p.mass());
      }
    }

    s.applyForces();

    // save thevarermediate forces
    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        k2Forces[i] = p.force();
        k2Velocities[i] = p.velocity();
      }

      p.force().clear();	// and clear the forces now that we are done with them
    }


    // get k3 values

    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        var originalPosition = originalPositions[i];
        var k2Velocity = k2Velocities[i];

        p.position().setX( originalPosition.x() + k2Velocity.x() * 0.5 * deltaT);
        p.position().setY( originalPosition.y() + k2Velocity.y() * 0.5 * deltaT);
        p.position().setZ( originalPosition.z() + k2Velocity.z() * 0.5 * deltaT);

        var originalVelocity = originalVelocities[i];
        var k2Force = k2Forces[i];

        p.velocity().setX( originalVelocity.x() + k2Force.x() * 0.5 * deltaT / p.mass());
        p.velocity().setY( originalVelocity.y() + k2Force.y() * 0.5 * deltaT / p.mass());
        p.velocity().setZ( originalVelocity.z() + k2Force.z() * 0.5 * deltaT / p.mass());
      }
    }

    s.applyForces();

    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        k3Forces[i] = p.force();
        k3Velocities[i] = p.velocity();
      }

      p.force().clear();
    }

    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        var originalPosition = originalPositions[i];
        var k3Velocity = k3Velocities[i];

        p.position().setX( originalPosition.x() + k3Velocity.x() * deltaT);
        p.position().setY( originalPosition.y() + k3Velocity.y() * deltaT);
        p.position().setZ( originalPosition.z() + k3Velocity.z() * deltaT);

        var originalVelocity = originalVelocities[i];
        var k3Force = k3Forces[i];

        p.velocity().setX( originalVelocity.x() + k3Force.x() * deltaT / p.mass());
        p.velocity().setY( originalVelocity.y() + k3Force.y() * deltaT / p.mass());
        p.velocity().setZ( originalVelocity.z() + k3Force.z() * deltaT / p.mass());

      }
    }

    s.applyForces();

    // save thevarermediate forces
    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      if ( p.isFree() )
      {
        k4Forces[i] = p.force();
        k4Velocities[i] = p.velocity();
      }
    }

    // put them all together and what do you get?

    for (var i = 0; i < s.particles().length; ++i )
    {
      var p = s.getParticle(i);
      p.age += deltaT;
      if ( p.isFree() )
      {
        // update position()

        var originalPosition = originalPositions[i];
        var k1Velocity = k1Velocities[i];
        var k2Velocity = k2Velocities[i];
        var k3Velocity = k3Velocities[i];
        var k4Velocity = k4Velocities[i];

        p.position().setX( originalPosition.x() + deltaT / 6.0 * ( k1Velocity.x() + 2.0*k2Velocity.x() + 2.0*k3Velocity.x() + k4Velocity.x() ));
        p.position().setY( originalPosition.y() + deltaT / 6.0 * ( k1Velocity.y() + 2.0*k2Velocity.y() + 2.0*k3Velocity.y() + k4Velocity.y() ));
        p.position().setZ( originalPosition.z() + deltaT / 6.0 * ( k1Velocity.z() + 2.0*k2Velocity.z() + 2.0*k3Velocity.z() + k4Velocity.z() ));

        // update velocity

        var originalVelocity = originalVelocities[i];
        var k1Force = k1Forces[i];
        var k2Force = k2Forces[i];
        var k3Force = k3Forces[i];
        var k4Force = k4Forces[i];

        p.velocity().setX( originalVelocity.x() + deltaT / ( 6.0 * p.mass() ) * ( k1Force.x() + 2.0*k2Force.x() + 2.0*k3Force.x() + k4Force.x() ));
        p.velocity().setY( originalVelocity.y() + deltaT / ( 6.0 * p.mass() ) * ( k1Force.y() + 2.0*k2Force.y() + 2.0*k3Force.y() + k4Force.y() ));
        p.velocity().setZ( originalVelocity.z() + deltaT / ( 6.0 * p.mass() ) * ( k1Force.z() + 2.0*k2Force.z() + 2.0*k3Force.z() + k4Force.z() ));
      }
    }

    
    /*allocateParticles();
    
    for (var i = 0; i < s.numberOfParticles(); i++) {
      var p = s.getParticle(i);
      if (p.isFree()) {
        originals['pos'][i] = p.position()();
        originals['vel'][i] = p.velocity();
      };
      p.force().clear();
    };

    for (var k = 0; k < forces.length; k++) {
      s.applyForces();
      
      for (var i = 0; i < s.numberOfParticles(); i++) {
        var p = s.getParticle(i);
        if (p.isFree()) {
          forces[k][i] = p.force();
          velocities[k][i] = p.velocity();
        };
        p.force().clear();
      };

      if (k == 3) {
        break;
      };

      for (var i = 0; i < s.numberOfParticles(); i++) {
        var p = s.getParticle(i);
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

    for (var i = 0; i < s.numberOfParticles(); i++) {
      var p = s.getParticle(i);
      p.age += deltaT;
      if (p.isFree()) {
        var orPos = originals['pos'][i],
            k1Vel = velocities[0][i],
            k2Vel = velocities[1][i],
            k3Vel = velocities[2][i],
            k4Vel = velocities[3][i],
            divis = deltaT / 6.0;

        p.position().set(orPos.x() + divis * (k1Vel.x() + 2.0 * k2Vel.x() + 
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

        p.velocity().set(orVel.x() + dmass * (k1For.x() + 2.0 * k2For.x() +
                                              2.0 * k3For.x() + k4For.x()),
                         orVel.y() + dmass * (k1For.y() + 2.0 * k2For.y() +
                                              2.0 * k3For.y() + k4For.y()),
                         orVel.z() + dmass * (k1For.z() + 2.0 * k2For.z() +
                                              2.0 * k3For.z() + k4For.z()));
      };
    };*/
  };

  return that;
};
