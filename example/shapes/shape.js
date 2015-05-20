  angular.module('ngApp').factory('Shape', [function() {
    var Shape = function(properties) {
      this.position = properties.position;
    };

    Shape.prototype.toString = function() {
      return "I am a Shape at " + this.position;
    };

    Shape.prototype.move = function(x, y) {
      this.position.x += x;
      this.position.y += y;
    };

    return Shape;
  }]);