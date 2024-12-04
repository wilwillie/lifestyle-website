angular.module('fashionPediaApp', [])
.controller('commentController', function ($scope, $http, $window) {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        $window.location.href = 'login.html';
        return;
    }

    // Variabel untuk menyimpan komentar yang akan ditampilkan
    $scope.comments = [];  // Array untuk menyimpan komentar yang diterima dari backend
    $scope.userComment = '';  // Variabel untuk input komentar

    // Fungsi untuk mengambil komentar dari server
    $scope.getComments = function () {
        $http.get('http://localhost:5000/comments')  // Ganti URL sesuai dengan server Anda
            .then(function (response) {
                $scope.comments = response.data;  // Menyimpan komentar yang diterima dari server
            })
            .catch(function (error) {
                console.error('Error fetching comments:', error);
            });
    };

    // Panggil fungsi getComments saat controller dimulai untuk menampilkan komentar yang sudah ada
    $scope.getComments();

    // Fungsi untuk menyimpan komentar ke server
    $scope.saveComment = function () {
        const commentData = {
            username: user.username,  // Username dari localStorage
            icon: user.icon || 'default-icon.jpg',  // Gambar icon pengguna (gunakan gambar default jika tidak ada)
            comment: $scope.userComment
        };

        // Validasi input untuk memastikan komentar tidak kosong
        if (!$scope.userComment || $scope.userComment.trim() === '') {
            alert("Please enter a comment.");
            return;
        }

        // Kirimkan komentar ke server
        $http.post('http://localhost:5000/comments', commentData)
            .then(function (response) {
                // Menambahkan komentar baru ke array comments
                console.log('Comment added successfully:', response.data);
                $scope.comments.unshift(commentData);  // Menambahkan komentar baru di atas (komentar terbaru)
                $scope.userComment = '';  // Mengosongkan input komentar setelah dikirim
            })
            .catch(function (error) {
                console.error('Error posting comment:', error);
            });
    };
});
