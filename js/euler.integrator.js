var EulerIntegrator = function (s) {
  var that = {};

  that.step = function (t) {
    s.clearForces();
    s.applyForces();

    for (var i = 0; i < s.numberOfParticles(); i++) {
      var p = s.getParticle(i);
      
      if (p.isFree()) {
        var force = p.force(),
            veloc = p.velocity();
            multi = p.mass() * t;

        p.velocity().add(force.x() / multi, 
                         force.y() / multi, 
                         force.z() / multi);

        p.position().add(veloc.x() / t, veloc.y() / t, veloc.z() / t);
      
      };
    };
  };

  return that;
};
