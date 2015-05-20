  angular.module('ngApp').factory('Square', ['Define', function(Define) {
    var Square = function(properties) {
      var parentProps = {
          width: properties.size,
          height: properties.size,
          position: properties.position
        };
        Square.super(this, parentProps);
    };

    Square.super = Define(Square).as(['Rectangle']);

    Square.prototype.toString = function() {
      return "I am a Square!" + JSON.stringify(this);
    };

    return Square;
  }]);