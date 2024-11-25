angular.module('loginApp').controller('SignupController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.emailAvailable = null; // Status validasi email (null, true, atau false)

    // Fungsi untuk signup
    $scope.signup = function() {
        if ($scope.emailAvailable === false) {
            alert('Email already exists!'); // Validasi di frontend
            return;
        }

        $http.post('http://localhost:5000/auth/signup', $scope.user)
            .then((res) => {
                $scope.message = res.data.message || 'Signup successful!';
                alert($scope.message);
                // Redirect to login page after signup
                window.location.href = 'login.html';
            })
            .catch((err) => {
                $scope.message = err.data.message || 'An error occurred';
                alert($scope.message);
            });
    };
}]);
