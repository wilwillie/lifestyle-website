angular.module('fashionPediaApp').controller('LoginController', function ($scope, $http, $timeout) {
    $scope.user = {};
    $scope.message = '';

    $scope.login = function () {
        $http.post('http://localhost:5000/auth/login', $scope.user)
            .then(function (response) {
                // Pastikan status respons adalah 200 dan respons memiliki data yang diharapkan
                if (response.status === 200 && response.data.username) {
                    const user = {
                        username: response.data.username || 'Guest',
                        icon: response.data.icon || 'assets/images/default-profile.jpg'
                    };

                    // Simpan data user ke localStorage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Perbarui status login
                    const scope = angular.element(document.body).scope();
                    $timeout(() => {
                        scope.checkLoginStatus();
                    });

                    // Redirect ke halaman utama
                    $scope.message = response.data.message || 'Login successful.';
                    $scope.messageClass = 'success';

                    // Redirect ke halaman setelah login
                    $timeout(() => {
                        window.location.href = 'index.html#afterlogin';
                    }, 500);
                } else {
                    // Jika respons tidak sesuai
                    throw new Error('Invalid response from server.');
                }
            })
            .catch(function (error) {
                console.error('Login error:', error);

                // Tampilkan error dari server atau gunakan pesan default
                $scope.message = error.data?.message || 'An error occurred.';
                $scope.messageClass = 'error';
            });
    };
});