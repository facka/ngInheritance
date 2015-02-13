angular.module('ngApp').controller('TestController', ['$scope','$timeout','Idol', function($scope, $timeout, Idol) {

    var objects = {};

    $scope.objects = objects;

    function create(type) {

      var idol = new Idol({
        id: 0,
        displayName: 'Leo Messi',
        birthday: '02/05/1989',
        link: 'http://leomessi.com',
        icon: 'http://leomessi.com/profile.jpg',
        role: 'idol',
        followers: ['Juan','Pedro','Carlitos']
      });
      console.log(idol.toString());
      //idol.setDisplayName('Lionel Messi (10)');
      console.log(idol);
      console.log(idol.toString());
      objects.push(idol);
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

    $scope.buttonLabel = "Create an Idol";

  }]);