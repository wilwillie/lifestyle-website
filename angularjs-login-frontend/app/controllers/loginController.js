angular.module('fashionPediaApp').controller('LoginController', function ($scope, $http) {
    $scope.user = {};
    $scope.message = '';

    $scope.login = function () {
        $http.post('http://localhost:5000/auth/login', $scope.user)
            .then(function (response) {
                // Jika login berhasil
                $scope.message = response.data.message;
                window.location.href = 'index.html#afterlogin';
                $scope.messageClass = 'success'; // Set ke hijau untuk sukses
            })
            .catch(function (error) {
                // Tampilkan pesan error dari backend
                $scope.message = error.data.message || 'An error occurred.';
                $scope.messageClass = 'error'; // Set ke hijau untuk gagal
            });
    };
});
