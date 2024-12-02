angular.module('fashionPediaApp', [])
.controller('ProfileController', function ($scope, $http, $window) {
    // Mengambil data user dari localStorage
    $scope.checkLoginStatus = function () {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            $scope.username = user.username;
            $scope.userIcon = user.icon || 'assets/images/default-profile.jpg';
            $scope.userBio = user.bio || '';  
            $scope.userWeight = user.weight || '';  
            $scope.userHeight = user.height || '';  
        } else {
            $window.location.href = 'login.html'; 
        }
    };    

    // Fungsi untuk menyimpan profil yang sudah diperbarui
    $scope.saveProfile = function () {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
    
        if (user && token) {
            user.bio = $scope.userBio;
            user.weight = $scope.userWeight;
            user.height = $scope.userHeight;
    
            // Kirim data ke server untuk disimpan di database
            $http.put('http://localhost:5000/api/user/updateProfile', user, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(function(response) {
                if (response.data.success) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));  // Update user di localStorage
                    $window.location.href = 'profile.html';  // Redirect ke halaman profil setelah berhasil
                } else {
                    $scope.errorMessage = response.data.message || 'Gagal memperbarui profil.';
                    $scope.errorClass = 'error';
                }
            }, function(error) {
                if (error.status === 0) {
                    $scope.errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
                } else if (error.status === 401) {
                    $scope.errorMessage = 'Autentikasi gagal. Token mungkin sudah kedaluwarsa.';
                } else {
                    $scope.errorMessage = 'Terjadi kesalahan. Coba lagi nanti.';
                }
                $scope.errorClass = 'error';
            });
        }
    };    

    $scope.logout = function () {
        // Menghapus user dari localStorage dan redirect ke login
        localStorage.removeItem('user');
        $window.location.href = 'login.html';
    };

    // Panggil fungsi saat aplikasi dimuat
    $scope.checkLoginStatus();
});