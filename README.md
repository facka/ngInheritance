# ngInheritance
AngularJS inheritance for model classes. Recommended for Java developers


- Define the entity with multiple inheritance in one line:
```javascript
      Idol.super = Define(Idol).as([Entity, Followable]);
```
- Call the super constructor to initialize the instance

```javascript      
        var Idol = function(properties) {
          Idol.super(this, properties);
          //custom properties
          this.team = properties.team;
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
      
    

      
        angular.module('ngApp').factory('Idol', ['Define','Entity','Followable',function(Define, Entity, Followable) {
          var Idol = function(properties) {
            Idol.super(this, properties);
            this.team = properties.team;
          };

          Idol.super = Define(Idol).as([Entity, Followable]);

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
