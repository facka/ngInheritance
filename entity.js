 angular.module('ngApp').factory('Entity', [function() {
    var Entity = function(properties) {
      this.id =  properties.id;
      this.link = properties.link;
      this.icon = properties.icon;
      this.role = properties.role;
      this.birthday = properties.birthday;
      this.displayName = properties.displayName;
    };

    Entity.prototype.getLocalizedCountry = function() {
      return 'something that calculates localized country';
    };

    Entity.prototype.setDisplayName = function(name) {
      this.displayName = name;
    };

    Entity.prototype.toString = function() {
      return "I am entity! " + this.displayName;
    };

    return Entity;
  }]);