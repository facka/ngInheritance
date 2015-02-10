  angular.module('ngApp').factory('Idol', ['Define', function(Define) {
    var Idol = function(properties) {
      Idol.super(this, properties);
      this.team = properties.team;
    };

    Idol.super = Define(Idol).as(['Entity', 'Followable']);

    Idol.prototype.toString = function() {
      return Idol.parents.Entity.toString.apply(this) + ", " + Idol.parents.Followable.toString.apply(this) + ", " + "I am an Idol!";
    };

    return Idol;
  }]);