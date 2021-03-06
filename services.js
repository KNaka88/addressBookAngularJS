addressBook.service('authService', ['$http', '$localStorage', 'jwtHelper', 'authManager', function($http, $localStorage, jwtHelper, authManager) {
    var baseUrl = "http://localhost:5000/api/auth/";
    
    this.login = function(email, password, callback) {
        $http({
            method: 'POST',
            url: baseUrl + 'login',
            data: {
                email: email,
                password: password
            }
        }).then(function success(res) {
            if (res.data) {
                // add JWT token and user info to localStorage
                $localStorage.token = res.data.tokenString;
                $localStorage.user = res.data.user;

                var decodedToken = jwtHelper.decodeToken(res.data.tokenString);
                
                // add token to header
                $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.tokenString;

                callback(true);
            }
        }, function error(res) {
            callback(false);
        });
    }

    this.isLoggedIn = function() {
        if (!$localStorage.token) {
            return false;
        }

        return !jwtHelper.isTokenExpired($localStorage.token);
    }
}]);