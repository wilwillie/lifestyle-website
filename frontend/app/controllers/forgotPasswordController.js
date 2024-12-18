angular.module('fashionPediaApp').controller('ForgotPasswordController', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};
    $scope.message = '';
    $scope.messageClass = ''; // Tambahkan ini untuk mengatur kelas CSS
    $scope.isLoading = false; // Variabel untuk melacak status loading

    $scope.sendResetLink = function() {
        console.log('Sending reset link for email:', $scope.user.email);
        $scope.isLoading = true; // Mulai loading

        $http.post('http://localhost:5000/auth/forgot-password', { email: $scope.user.email })
            .then((res) => {
                console.log('Reset link sent successfully:', res.data.message);
                $scope.message = res.data.message || 'Reset link sent! Please check your email.';
                $scope.messageClass = 'success'; // Set ke hijau untuk sukses
            })
            .catch((err) => {
                console.error('Error sending reset link:', err);
                $scope.message = err.data.message || 'An error occurred.';
                $scope.messageClass = 'error'; // Set ke merah untuk error
            })
            .finally(() => {
                $scope.isLoading = false; // Selesai loading
            });
    };
}]);
