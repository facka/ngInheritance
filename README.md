# ngInheritance
AngularJS classical inheritance for model classes in a less verbose way

## Install

bower install ng-inheritance

## Documentation

- Define the entity with multiple inheritance in one line:
```javascript
      Idol.super = Define(Idol).as(['Entity', 'Followable']);
```
All properties are flatten to Idol and the methods of the parents too. If there is a colision with properties and methods names between parents, it will take the last one in the list. Anyway you can override a method and also you will have a reference to the parents methods if you want to call them.

- Call the super constructor to initialize the instance

```javascript
        var Idol = function(properties) {
          Idol.super(this, properties);
          //custom properties
          this.team = properties.team;
        };
```

- Call parents functions

```javascript
    Idol.prototype.toString = function() {
      return Idol.parents.Entity.toString.apply(this) + ", " + Idol.parents.Followable.toString.apply(this) + ", " + "I am an Idol!";
    };
```

  - Full example

```javascript
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

          return Entity;
        }]);




        angular.module('ngApp').factory('Idol', ['Define',function(Define) {
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
        }])

```
