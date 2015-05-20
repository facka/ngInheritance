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

##  Full example

Diagram

  - ![alt tag](https://raw.githubusercontent.com/facka/ngInheritance/master/example/shapes/shapes.jpg)

```javascript
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

```

## Example of usage 

https://github.com/facka/ngTodoList
