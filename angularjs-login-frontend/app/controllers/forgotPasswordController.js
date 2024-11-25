angular.module('loginApp').controller('ForgotPasswordController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.message = '';

    $scope.sendResetLink = function() {
        console.log('Sending reset link for email:', $scope.user.email);

        $http.post('http://localhost:5000/auth/forgot-password', { email: $scope.user.email })
            .then((res) => {
                console.log('Reset link sent successfully:', res.data.message);
                $scope.message = res.data.message || 'Reset link sent! Please check your email.';
            })
            .catch((err) => {
                console.error('Error sending reset link:', err);
                $scope.message = err.data.message || 'An error occurred.';
            });
    };
}]);
