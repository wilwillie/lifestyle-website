var app = angular.module('fashionPediaApp', []);

app.controller('GalleryController', function($scope) {
    // Array gambar
    $scope.items = [
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Kemeja', image: 'assets/images/gallery/kemeja1.jpg', category: 'men', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
        { title: 'Blouse', image: 'assets/images/gallery/blouse1.jpg', category: 'women', productType: 'atasan' },
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
