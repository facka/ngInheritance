  angular.module('ngApp').factory('Rectangle', ['Define', function(Define) {
    var Rectangle = function(properties) {
      Rectangle.super(this, properties);
      this.width = properties.width;
      this.height = properties.height;
    };

    Rectangle.super = Define(Rectangle).as(['Shape']);

    Rectangle.prototype.toString = function() {
      return "I am a Rectangle!" + JSON.stringify(this);
    };

    Rectangle.prototype.getArea = function() {
      return this.width * this.height;
    };

    return Rectangle;
  }]);