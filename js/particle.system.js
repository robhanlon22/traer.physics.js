var ParticleSystem = function ( ) {
  var that = {},
      integrator = new RungeKuttaIntegrator(that),
      particles = [],
      springs = [],
      attractions = [],
      gravity = new Vector3D(),
      drag,
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

  that.setGravity = function ( ) {
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

  that.tick = function ( ) {
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

  that.makeParticle = function ( ) {
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

  that.particles = function () {
    return particles;
  };

  return that;
};

ParticleSystem.RUNGE_KUTTA = 0;
ParticleSystem.MODIFIED_EULER = 1;

ParticleSystem.DEFAULT_GRAVITY = 0;
ParticleSystem.DEFAULT_DRAG = 0.001;
