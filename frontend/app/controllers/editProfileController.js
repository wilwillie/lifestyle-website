angular.module('fashionPediaApp', [])
.controller('EditProfileController', function ($scope, $window) {
    // Mengambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        // Menyimpan data user ke model untuk dapat diedit
        $scope.userBio = user.bio || '';
        $scope.userWeight = user.weight || '';
        $scope.userHeight = user.height || '';
    } else {
        // Jika user tidak ada di localStorage, redirect ke halaman login
        $window.location.href = 'login.html';
    }

    // Fungsi untuk menyimpan perubahan profil
    $scope.saveProfile = function () {
        const updatedUser = {
            username: user.username,  // Mengambil username dari data user yang sudah ada
            icon: user.icon,          // Mengambil icon dari data user yang sudah ada
            bio: $scope.userBio,
            weight: $scope.userWeight,
            height: $scope.userHeight
        };
        
        // Simpan data user yang sudah diperbarui ke localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Redirect ke halaman profil setelah berhasil menyimpan
        $window.location.href = 'profile.html';
    };
});
