var ngInheritance = angular.module("ngInheritance", []);

ngInheritance.factory("Define", ['$injector', function($injector) {

    var Define = function(child) {

      var extend = function(child, parent) {
        for (var i in parent.prototype) {
          child.prototype[i] = parent.prototype[i];
        }
      };


      return {
        as : function(parents) {
          if (!angular.isArray(parents)) {
            parents = [parents];
          }
          child.parents = {};

          parents.forEach(function(parent) {
            var Parent = $injector.get(parent);
            extend(child, Parent);
            child.parents[parent] = Parent.prototype;
          });

          child.prototype.constructor = child;

          return function(/*this, arguments*/) {
            var args = Array.prototype.slice.call(arguments);
            var self = args.shift();
            parents.forEach(function(parent) {
                var Parent = $injector.get(parent);
                Parent.apply(self, args);
            });
          };
        }
      };
    };

    return Define;
}]);