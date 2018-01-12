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

addressBook.controller('loginController', ['$scope', '$http', 'authService', '$location', function($scope, $http, authService, $location) {
    var baseUrl = 'http://localhost:5000/api/';
    $scope.email = '';
    $scope.password = '';
    $scope.token;

    $scope.submit = function() {
        authService.login($scope.email, $scope.password, function (isLoggedInSuccess) {
            if (isLoggedInSuccess) {
                $scope.clearForm();
                $location.path('/main');
            } else {
                console.log("Email or Password is incorrect");
            }
        })
    }

    $scope.clearForm = function() {
        $scope.email = '';
        $scope.password = '';
    }
}]);

addressBook.controller('mainController', ['$scope', 'authService', function($scope, authService) {
    
    $scope.checkLogin = function() {
        var result = authService.isLoggedIn();
        console.log(result);
    }
}]);