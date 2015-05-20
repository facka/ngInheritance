  angular.module('ngApp').factory('Circle', ['Define', function(Define) {
    var Circle = function(properties) {
      Circle.super(this, properties);
      this.radius = properties.radius;
    };

    Circle.super = Define(Circle).as(['Shape']);

    Circle.prototype.toString = function() {
      return "I am a Circle!" + JSON.stringify(this);
    };

    Circle.prototype.getArea = function() {
      return 3.14 * this.radius * this.radius;
    };

    return Circle;
  }]);