var Vector3D = function () {
  var that = {}, 
      x = 0, 
      y = 0, 
      z = 0,
      err = function (method) {
        throw 'Invalid number of arguments to ' + method + ', bozo';
      };

  switch (arguments.length) {
    case 0:
      break;
    case 1:
      var p = arguments[0];
      x = p.x();
      y = p.y();
      z = p.z();
      break;
    case 3:
      x = arguments[0];
      y = arguments[1];
      z = arguments[2];
      break;
    default:
      err('constructor');
  };

  that.x = function () {
    return x;
  };
  
  that.y = function () {
    return y;
  };
  
  that.z = function () {
    return z;
  };

  that.setX = function (_x) {
    x = _x;
  };

  that.setX = function (_y) {
    y = _y;
  };

  that.setX = function (_z) {
    z = _z;
  };

  that.set = function () {
    switch (arguments.length) {
      case 1:
        var p = arguments[0];
        x = p.x();
        y = p.y();
        z = p.z();
        break;
      case 3:
        x = arguments[0];
        y = arguments[1];
        z = arguments[2];
        break;
      default:
        err('set');
    };
  };

  that.add = function () {
    switch (arguments.length) {
      case 1:
        var p = arguments[0];
        x += p.x();
        y += p.y();
        z += p.z();
        break;
      case 3:
        x += arguments[0];
        y += arguments[1];
        z += arguments[2];
        break;
      default:
        err('add');
    };
  };

  that.subtract = function () {
    switch (arguments.length) {
      case 1:
        var p = arguments[0];
        x -= p.x();
        y -= p.y();
        z -= p.z();
        break;
      case 3:
        x -= arguments[0];
        y -= arguments[1];
        z -= arguments[2];
        break;
      default:
        err('subtract');
    };
  };

  that.multiplyBy = function (f) {
    x *= f;
    y *= f;
    z *= f;
    return that;
  };

  that.distanceTo = function () {
    switch (arguments.length) {
      case 1:
        return Math.sqrt(that.distanceSquaredTo(arguments[0]));
      case 3:
        return Math.sqrt(that.distanceSquaredTo(new Vector3D(arguments[0],
                                                             arguments[1],
                                                             arguments[2])));
      default:
        err('distanceTo');
    };
  };

  that.distanceSquaredTo = function (p) {
    return Math.pow(x - p.x(), 2) + 
           Math.pow(y - p.y(), 2) +
           Math.pow(z - p.z(), 2);
  };

  that.dot = function (p) {
    return x * p.x() + y * p.y() + z * p.z();
  };

  that.length = function () {
    return Math.sqrt(that.lengthSquared());
  };

  that.lengthSquared = function () {
    return Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2); 
  };

  that.clear = function () {
    x = y = z = 0;
  };

  that.toString = function () {
    return "(" + x + ", " + y + ", " + z + ")";
  };

  that.cross = function () {
    return new Vector3D(y * p.z() - z * p.y(),
                        x * p.z() - z * p.x(),
                        x * p.y() - y * p.x());
  };

  that.isZero = function () {
    return x == 0 && y == 0 && z == 0;
  };

  return that;
};
