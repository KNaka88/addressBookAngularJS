const addressBook = angular.module('addressBook', []);

addressBook.controller('testController', ($scope, $http) => {
    const baseUrl = 'http://localhost:5000/api/';
    $scope.users = [];
    $scope.user = {};

    // Watch
    $scope.$watch('users', function(newValue, oldValue) {
        // console.log('New', newValue);
        // console.log('Old', oldValue);
    });


    // API 
    $scope.getUsers = function() {
        $http.get(baseUrl + "user")
            .success(function(data, status, headers, config) {
                console.log(data);
                $scope.users = data;
            })
            .error(function(data, status, headers, config) {
                console.log("error");
            });
    };

    $scope.getUser = function(id) {
        $http.get(baseUrl + "user/" + id)
            .success(function(data, status, headers, config) {
                console.log(data);
                $scope.user = data;
            })
            .error(function(data, status, headers, config) {
                console.log("error");
            });
    };

    $scope.deleteUser = function(id) {
        $http.delete(baseUrl + "user/" + id)
            .success(function(response) {
                console.log("Successfully deleted");
                $scope.users.splice(_.findIndex($scope.users, {id: id}), 1);
            })
            .error(function(response) {
                console.log(response);
                console.log("error");
            });
    }
});