angular.module('ngApp').factory('Followable', [function() {
    var Followable = function(properties) {
      this.followers =  properties.followers || [];
    };

    Followable.prototype.getFollowers = function() {
      return this.followers;
    };

    Followable.prototype.follow = function(entity) {
      this.followers.push(entity) ;
    };

    return Followable;
  }]);