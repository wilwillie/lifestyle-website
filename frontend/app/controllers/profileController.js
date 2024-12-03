angular.module('fashionPediaApp', [])
.controller('ProfileController', function ($scope, $http, $window) {
    // Fungsi untuk mengecek status login dan mengambil data profil
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

    // Fungsi logout
    $scope.logout = function () {
        localStorage.removeItem('user');
        $window.location.href = 'login.html';
    };

    // Panggil fungsi saat aplikasi dimuat
    $scope.checkLoginStatus();
});
