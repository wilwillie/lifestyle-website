angular.module('fashionPediaApp', [])
.controller('galleryController', function ($scope, $http, $window) {
    /** Komentar (Comment Section) **/
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        $window.location.href = 'login.html';
        return;
    }

    $scope.comments = []; // Array untuk komentar
    $scope.userComment = ''; // Input komentar

    // Fungsi untuk mengambil komentar
    $scope.getComments = function () {
        $http.get('http://localhost:5000/comments')
            .then(function (response) {
                $scope.comments = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching comments:', error);
            });
    };

    // Memanggil fungsi saat aplikasi dimulai
    $scope.getComments();

    // Fungsi untuk menyimpan komentar
    $scope.saveComment = function () {
        const commentData = {
            username: user.username,
            icon: user.icon || 'default-icon.jpg',
            comment: $scope.userComment
        };

        if (!$scope.userComment || $scope.userComment.trim() === '') {
            alert("Please enter a comment.");
            return;
        }

        $http.post('http://localhost:5000/comments', commentData)
            .then(function (response) {
                $scope.comments.unshift(commentData);
                $scope.userComment = '';
            })
            .catch(function (error) {
                console.error('Error posting comment:', error);
            });
    };

    $scope.editComment = function (comment) {
        // Menetapkan komentar yang ingin diedit ke input field
        $scope.userComment = comment.comment;
        // Menghapus komentar yang sudah ada jika tombol simpan diklik
        $scope.saveComment = function () {
            const updatedCommentData = {
                comment: $scope.userComment
            };
            
            $http.put('http://localhost:5000/comments/' + comment._id, updatedCommentData)
                .then(function (response) {
                    // Perbarui komentar di tampilan
                    comment.comment = $scope.userComment;
                    $scope.userComment = ''; // Reset input field
                })
                .catch(function (error) {
                    console.error('Error updating comment:', error);
                });
        };
    };
    
// Fungsi untuk menghapus komentar
$scope.deleteComment = function(commentId, index) {
    console.log("Deleting comment with ID: " + commentId);  // Cek ID yang dikirimkan
    if (confirm("Are you sure you want to delete this comment?")) {
        $http.delete('http://localhost:5000/comments/' + commentId)
            .then(function(response) {
                // Hapus komentar dari array lokal setelah berhasil dihapus dari server
                $scope.comments.splice(index, 1);
                alert("Comment deleted successfully!");
            })
            .catch(function(error) {
                console.error('Error deleting comment:', error);
                alert("Error deleting comment.");
            });
    }
};


    

    /** Galeri Produk **/
    $scope.items = [
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Flannel', image: 'assets/images/gallery/flannel.jpg', category: 'men', productType: 'atasan' },
        { title: 'Sweater', image: 'assets/images/gallery/sweater1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Graphic Tee', image: 'assets/images/gallery/graphictee1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Hoodie', image: 'assets/images/gallery/hoodie.jpg', category: 'men', productType: 'atasan' },
        { title: 'Celana Bahan', image: 'assets/images/gallery/celanabahan1.jpg', category: 'men', productType: 'bawahan' },
        { title: 'Celana Chinos', image: 'assets/images/gallery/celanachinos1.jpg', category: 'men', productType: 'bawahan' },
        { title: 'Celana Jeans', image: 'assets/images/gallery/celanajeans1.jpg', category: 'men', productType: 'bawahan' },
        { title: 'Ikat Pinggang', image: 'assets/images/gallery/ikatpinggang1.jpg', category: 'men', productType: 'aksesoris' },
        { title: 'Jam Tangan', image: 'assets/images/gallery/jamtangan1.jpg', category: 'men', productType: 'aksesoris' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Babytee', image: 'assets/images/gallery/babytee1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Cardigan', image: 'assets/images/gallery/cardigan1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Peplum Top', image: 'assets/images/gallery/peplumtop1.jpg', category: 'women', productType: 'atasan' },
        { title: 'T-shirt', image: 'assets/images/gallery/tshirt.jpg', category: 'women', productType: 'atasan' },
        { title: 'Rok', image: 'assets/images/gallery/rok1.jpg', category: 'women', productType: 'bawahan' },
        { title: 'Celana Jeans', image: 'assets/images/gallery/celanajeans2.jpg', category: 'women', productType: 'bawahan' },
        { title: 'Kalung', image: 'assets/images/gallery/kalung1.jpg', category: 'women', productType: 'aksesoris' },
        { title: 'Anting', image: 'assets/images/gallery/anting1.jpg', category: 'women', productType: 'aksesoris' },
        { title: 'Gelang', image: 'assets/images/gallery/gelang1.jpg', category: 'women', productType: 'aksesoris' },


    ];

    // Filtered items yang ditampilkan
    $scope.filteredItems = $scope.items;

    // Fungsi filter gambar
    $scope.filterImages = function() {
        var isFilterEmpty = !$scope.selectedCategory && !$scope.selectedProduct && !$scope.searchQuery;

        if (isFilterEmpty) {
            $scope.noFilterMessage = "Tidak ada filter yang diterapkan.";
            $scope.filteredItems = $scope.items;
        } else {
            $scope.noFilterMessage = "";
            $scope.filteredItems = $scope.items.filter(function(item) {
                var matchesCategory = !$scope.selectedCategory || item.category === $scope.selectedCategory;
                var matchesProduct = !$scope.selectedProduct || item.productType === $scope.selectedProduct;
                var matchesSearch = !$scope.searchQuery || item.title.toLowerCase().startsWith($scope.searchQuery.toLowerCase());
                return matchesCategory && matchesProduct && matchesSearch;
            });
        }

        // Update dropdown produk berdasarkan kategori yang dipilih
        if ($scope.selectedCategory) {
            let availableProductTypes = $scope.items.filter(item => item.category === $scope.selectedCategory).map(item => item.productType);
            availableProductTypes = [...new Set(availableProductTypes)]; // Menghilangkan duplikat
            $scope.productTypes = availableProductTypes.length ? availableProductTypes : ['atasan', 'bawahan', 'aksesoris'];
        } else {
            $scope.productTypes = ['atasan', 'bawahan', 'aksesoris'];  // Menampilkan semua produk jika kategori tidak dipilih
        }

        // Memperbarui visibilitas kategori berdasarkan produk yang difilter
        $scope.isMenCategoryVisible = $scope.filteredItems.some(item => item.category === 'men');
        $scope.isWomenCategoryVisible = $scope.filteredItems.some(item => item.category === 'women');
    };

    // Set default value untuk filter
    $scope.selectedCategory = ''; 
    $scope.selectedProduct = ''; 
    $scope.searchQuery = ''; 

    // Fungsi untuk menyaring item berdasarkan kriteria filter
    $scope.isVisible = function(item) {
        return (!$scope.selectedCategory || item.category === $scope.selectedCategory) && 
               (!$scope.selectedProduct || item.productType === $scope.selectedProduct) &&
               (!$scope.searchQuery || item.title.toLowerCase().startsWith($scope.searchQuery.toLowerCase()));
    };

    // Pastikan filter dijalankan ketika halaman pertama kali dimuat
    $scope.filterImages();
});
