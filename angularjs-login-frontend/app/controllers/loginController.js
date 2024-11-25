angular.module('loginApp').controller('LoginController', function ($scope, $http) {
    $scope.user = {};
    $scope.message = '';

    $scope.login = function () {
        $http.post('http://localhost:5000/auth/login', $scope.user)
            .then(function (response) {
                // Jika login berhasil
                $scope.message = response.data.message;
                alert('Login successful! Redirecting...');
                // Redirect ke halaman utama setelah login berhasil
                window.location.href = '/home.html';
            })
            .catch(function (error) {
                // Tampilkan pesan error dari backend
                $scope.message = error.data.message || 'An error occurred.';
            });
    };
});
