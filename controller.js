angular.module('ngApp').controller('TestController', ['$scope','$timeout','Square','Rectangle', 'Circle', function($scope, $timeout, Square, Rectangle, Circle) {

    var objects = {};

    $scope.objects = objects;

    window.shapes = [];

    function create() {

      var square = new Square({
        position: {
          x: 0,
          y: 0
        },
        size: 10
      });
      console.log(square.toString());
      console.log("Square", square);
      objects.push(square);
      window.shapes.push(square);

      var rectangle = new Rectangle({
        position: {
          x: 0,
          y: 0
        },
        width: 10,
        height: 30
      });
      console.log(rectangle.toString());
      console.log("Rectangle", rectangle);
      objects.push(rectangle);
      window.shapes.push(rectangle);

      var circle = new Circle({
        position: {
          x: 0,
          y: 0
        },
        radius: 10
      });
      console.log(circle.toString());
      console.log("Circle", circle);
      objects.push(circle);
      window.shapes.push(circle);


      objects.forEach(function(shape) {
        console.log("Shape", shape);
        console.log("   Area: ", shape.getArea());
      });
    }

    function createObjects() {
      create();

      objectViewer.viewer({
            id:'OV',
            data: objects,
            appendTo:'#ovr',
            limit: -1,
            closeChilds: 1
        });

      $scope.status = "DONE";
      $scope.buttonLabel = "TRY AGAIN";
    }

    function clean() {
      objects = [];
    }

    $scope.restart = function() {
      $scope.status = "Cleaning...";
      $timeout(function() {
        clean();
        $scope.status = "Processing...";
        $timeout(createObjects,0);
      },0);
    };

    $scope.buttonLabel = "Create Shapes";

  }]);