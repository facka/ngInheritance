  angular.module('ngApp').factory('Idol', ['Define','Entity','Followable',function(Define, Entity, Followable) {
    var Idol = function(properties) {
      Idol.super(this, properties);
      this.team = properties.team;
    };

    Idol.super = Define(Idol).as([Entity, Followable]);

    return Idol;
  }]);