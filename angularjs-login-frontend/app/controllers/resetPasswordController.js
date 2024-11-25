angular.module('loginApp').controller('ResetPasswordController', function ($scope, $http, $location) {
    // Ambil token dari query parameter
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
        $scope.message = 'Invalid or missing token.';
        return;
    }

    $scope.resetPassword = function () {
        if ($scope.password !== $scope.confirmPassword) {
            $scope.message = 'Passwords do not match.';
            return;
        }

        // Kirim permintaan reset password ke backend
        $http.post('http://localhost:5000/auth/reset-password', {
            token: token,
            password: $scope.password,
        }).then(function (response) {
            $scope.message = 'Password reset successfully. You can now log in.';
        }).catch(function (error) {
            $scope.message = error.data.message || 'An error occurred.';
        });
    };
});
