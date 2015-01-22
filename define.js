var ngInheritance = angular.module("ngInheritance", []);

ngInheritance.factory("Define", [function() {

    var Define = function(child) {

      var extend = function(child, parent) {
        for (var i in parent.prototype) {
          child.prototype[i] = parent.prototype[i];
        }
      };


      return {
        as : function(parent) {
          if (angular.isArray(parent)) {
            for (var i in parent) {
              extend(child, parent[i]);
            }
          }
          else {
            extend(child, parent);
          }
          child.prototype.constructor = child;
          return function(/*this, arguments*/) {
            var args = Array.prototype.slice.call(arguments);
            var self = args.shift();
            if (angular.isArray(parent)) {
              for (var i in parent) {
                parent[i].apply(self, args);
              }
            }
            else {
              parent.apply(self, args);
            }
          };
        }
      };
    };

    return Define;
}]);