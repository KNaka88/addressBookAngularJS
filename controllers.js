addressBook.controller('testController', function($scope, $http) {
    var baseUrl = 'http://localhost:5000/api/';
    $scope.users = [];
    $scope.user = {};

    // Watch
    $scope.$watch('users', function(newValue, oldValue) {
        // console.log('New', newValue);
        // console.log('Old', oldValue);
    });

    // API 
    $scope.getUsers = function() {
        $http({
            method: 'GET',
            url: baseUrl + "user"
        }).then(function success(res) {
            $scope.users = res.data;
    
        }, function error(data) {
            console.log("error");
        });
    };

    $scope.getUser = function(id) {
        console.log("getUser" + id);
        $http({
            method: 'GET',
            url: baseUrl + 'user/' + id
        }).then(function success(res) {
            console.log(res);
            $scope.user = res.data;
        }, function error(data) {
            console.log("error");
        })
    };

    $scope.deleteUser = function(id) {
        $http({
            method: 'DELETE',
            url: baseUrl + "user/" + id
        }).then(function success(res) {
            console.log("Successfully deleted");
            $scope.users.splice(_.findIndex($scope.users, {id: id}), 1);
        }, function error(res) {
            console.log(res);
            console.log("error");
        });
    };
});

addressBook.controller('loginController', function($scope, $http) {

});