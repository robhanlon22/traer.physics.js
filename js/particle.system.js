// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// Quick 'n dirty each.
if (Array.prototype.forEach) {
  Array.prototype.each = Array.prototype.forEach;
} else {
  Array.prototype.each = function (callback) {
    for (var i = 0, i < this.length, i++) {
      callback(this[i]);
    };
  };
};

var ParticleSystem = function () {
  var that = {},
      integrator = new RungeKuttaIntegrator(that),
      particles = [],
      springs = [],
      attractions = [],
      customForces = [],
      gravity = new Vector3D(),
      drag,
      hasDeadParticles = false,
      err = function (method) {
        throw 'Invalid number of arguments to ' + method + ', bozo';
      };

  switch (arguments.length) {
    case 2:
      gravity.set(0, arguments[0], 0);
      drag = arguments[1];
      break;
    case 4:
      gravity.set(arguments[0], arguments[1], arguments[2]);
      drag = arguments[3];
      break;
    case 0:
      gravity.set(0, ParticleSystem.DEFAULT_GRAVITY, 0);
      drag = ParticleSystem.DEFAULT_DRAG;
      break;
    default:
      err('constructor');
  };

  that.setIntegrator = function (integrator) {
    switch (integrator) {
      case ParticleSystem.RUNGE_KUTTA:
        this.integrator = new RungeKuttaIntegrator(that);
        break;
      case ParticleSystem.MODIFIED_EULER:
        this.integrator = new ModifiedEulerIntegrator(that);
      default:
        throw 'No such integrator.';
    };
  };

  that.setGravity = function () {
    switch (arguments.length) { 
      case 1:
        gravity.set(0, arguments[0], 0);
        break;
      case 3:
        gravity.set(arguments[0], arguments[1], arguments[2]);
        break;
      default:
        err('setGravity');
    };
  };

  that.setDrag = function (d) {
    drag = d;
  };

  that.tick = function () {
    switch (arguments.length) {
      case 0:
        integrator.step(0);
        break;
      case 1:
        integrator.step(arguments[0]);
        break;
      default:
        err('tick');
    };
  };

  that.makeParticle = function () {
    var mass = 1.0, x = 0, y = 0, z = 0;
    
    switch (arguments.length) {
      case 0:
        break;
      case 4:
        mass = arguments[0];
        x = arguments[1];
        y = arguments[2];
        z = arguments[3];
        break;
      default:
        err('makeParticle');
    };

    var p = new Particle(mass);
    p.position().set(x, y, z);
    particles.add(p);
    return p;
  };

  that.makeSpring = function (a, b, ks, d, r) {
    var s = new Spring(a, b, ks, d, r);
    springs.push(s);
    return s;
  };

  that.clear = function () {
    particles = [];
    springs = [];
    attractions = [];
  };

  that.makeAttraction = function (a, b, k, minDistance) {
    var m = new Attraction(a, b, k, minDistance);
    attractions.push(m);
    return m;
  };

  that.applyForces = function () {
      particles.each(function (particle) {
        if (!gravity.isZero()) {
          particle.force().add(gravity);
        };
        particle.force().add(p.velocity().x() * -drag,
                             p.velocity().y() * -drag,
                             p.velocity().z() * -drag);
      });
    };
    springs.each(function (spring) {
      spring.apply();
    });
    attractions.each(function (attraction) {
      attraction.apply();
    });
    customForces.each(function (customForce) {
      customForce.apply();
    });
  };

  that.clearForces = function () {
    for (var i = 0; i < particles.length; i++) {
      particles[i].force().clear();
    };
  };

  that.numberOfParticles = function () {
    return particles.length;
  };

  that.numberOfSprings = function () {
    return springs.length;
  };

  that.numberOfAttractions = function () {
    return attractions.length;
  };

  that.getParticle = function (i) {
    return particles[i];
  };

  that.getSpring = function (i) {
    return springs[i];
  };

  that.getAttraction = function (i) {
    return attractions[i];
  };

  that.addCustomForce = function (f) {
    customForces.push(f);
  };

  that.numberOfCustomForces = function () {
    return customForces.length;
  };

  that.getCustomForce = function (i) {
    return customForces[i];
  };

  that.removeParticle = function (i) {
    var p = that.getParticle(i);
    particles.remove(i);
    return p;
  };

  that.removeSpring = function (i) {
    var s = that.getSpring(i);
    springs.remove(i);
    return s;
  };

  that.removeAttraction = function (i) {
    var a = that.getAttraction(i);
    attractions.remove(i);
    return a;
  };

  that.removeCustomForce = function (i) {
    var f = that.getCustomForce(i);
    customForces.remove(i);
    return f;
  };

  that.particles = function () {
    return particles;
  };

  return that;
};

ParticleSystem.RUNGE_KUTTA = 0;
ParticleSystem.MODIFIED_EULER = 1;

ParticleSystem.DEFAULT_GRAVITY = 0;
ParticleSystem.DEFAULT_DRAG = 0.001;
