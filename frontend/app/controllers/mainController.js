app.controller('MainController', ['$scope', '$window', '$interval', '$document', function ($scope, $window, $interval, $document) {
    $scope.isLoggedIn = false; // Default: user belum login
    $scope.username = 'Guest'; // Default username jika belum login
    $scope.userIcon = 'assets/images/default-profile.jpg'; // Pastikan path benar

    $scope.checkLoginStatus = function () {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            $scope.isLoggedIn = true;
            $scope.username = user.username;
            $scope.userIcon = user.icon || 'assets/images/default-profile.jpg';
        } else {
            $scope.isLoggedIn = false;
            $scope.username = 'Guest';
            $scope.userIcon = 'assets/images/default-profile.jpg';
        }
    };    

    // Panggil fungsi saat aplikasi dimuat
    $scope.checkLoginStatus();
    $scope.isDropdownVisible = false;

    $scope.toggleDropdown = function ($event) {
        $event.stopPropagation(); // Mencegah klik menyebar ke elemen lain
        $scope.isDropdownVisible = !$scope.isDropdownVisible;
        console.log("Dropdown state:", $scope.isDropdownVisible);
    };
    
    // Tutup dropdown jika klik di luar elemen dropdown
    angular.element($document).on('click', function (event) {
        const isClickInsideDropdown = event.target.closest('.fp-dropdown');
        if (!isClickInsideDropdown) {
            $scope.$apply(function () {
                $scope.isDropdownVisible = false;
            });
        }
    });

    // Tambahkan event listener untuk scroll
    angular.element($window).on('scroll', function () {
        if ($scope.isDropdownVisible) {
            $scope.$apply(function () {
                $scope.isDropdownVisible = false;
            });
            console.log("Dropdown hidden due to scroll");
        }
    });
    
    // Fungsi untuk navigasi ke halaman login
    $scope.navigateToLogin = function () {
        $window.location.href = 'login.html'; // Ganti path sesuai lokasi login.html Anda
    };

    // Tambahkan event listener untuk mendeteksi scroll
    angular.element($window).on('scroll', function () {
        const header = document.getElementById('main-header');
        if ($window.pageYOffset > $window.innerHeight * 0.9) { 
            header.classList.remove('hidden');
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
            header.classList.add('hidden');
        }
    });

    $scope.isDarkMode = false; // Default ke mode terang
    // Fungsi untuk toggle dark mode
    $scope.toggleDarkMode = function() {
        $scope.isDarkMode = !$scope.isDarkMode;
        document.body.classList.toggle('dark-mode', $scope.isDarkMode);
    };

    // Panggil fungsi saat aplikasi dimuat
    $scope.checkLoginStatus();      

    $scope.slides = [
        { id: 1, image: 'assets/images/hoodie.jpg', alt: 'Hoodie', link: '/desc/main/slide1/index.html' },
        { id: 2, image: 'assets/images/tshirt.jpg', alt: 'Tshirt', link: '/desc/main/slide2/index.html' },
        { id: 3, image: 'assets/images/flannel.jpg', alt: 'Flannel', link: '/desc/main/slide3/index.html' }
    ];

    // Duplikasikan slide pertama dan terakhir dengan salinan mendalam agar tidak ada duplikasi key
    $scope.slides.unshift(JSON.parse(JSON.stringify($scope.slides[$scope.slides.length - 1])));
    $scope.slides[$scope.slides.length - 1].id = 'last-duplicate'; // Tambahkan ID unik untuk duplikat terakhir
    $scope.slides.push(JSON.parse(JSON.stringify($scope.slides[1])));
    $scope.slides[$scope.slides.length - 1].id = 'first-duplicate'; // Tambahkan ID unik untuk duplikat pertama

    let currentIndex = 1; // Mulai dari slide kedua (index pertama yang asli)

    // Fungsi untuk memperbarui posisi slider
    function updateSliderPosition(transition = true) {
        const slider = document.querySelector('.slider');
        if (!transition) {
            slider.style.transition = 'none'; // Nonaktifkan animasi saat looping
        } else {
            slider.style.transition = 'transform 1.5s ease-in-out'; // Animasi saat geser slide
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Fungsi manual untuk slide berikutnya
    $scope.nextSlide = function () {
        currentIndex++;
        updateSliderPosition();
        // Jika sampai di slide duplikat terakhir, langsung kembali ke slide pertama tanpa transisi
        if (currentIndex === $scope.slides.length - 1) {
            setTimeout(() => {
                currentIndex = 1; // Kembali ke slide pertama
                updateSliderPosition(false); // Nonaktifkan transisi
            }, 1500); // Tunggu hingga animasi selesai
        }
    };

    // Fungsi manual untuk slide sebelumnya
    $scope.prevSlide = function () {
        currentIndex--;
        updateSliderPosition();
        // Jika sampai di slide duplikat pertama, langsung kembali ke slide terakhir tanpa transisi
        if (currentIndex === 0) {
            setTimeout(() => {
                currentIndex = $scope.slides.length - 2; // Kembali ke slide terakhir
                updateSliderPosition(false); // Nonaktifkan transisi
            }, 1500); // Tunggu hingga animasi selesai
        }
    };

    // Jalankan slider secara otomatis setiap 4 detik
    $interval(function () {
        $scope.nextSlide();
    }, 5000);

    $scope.motto = "Wear your confidence";
    $scope.desc = 'Sesuai motto di atas yaitu mengekspresikan atau menunjukkan rasa percaya diri melalui cara berpakaian. Ini menggambarkan ide bahwa pakaian bisa menjadi alat untuk menciptakan atau memperkuat kepercayaan diri seseorang. Jadi, semakin percaya diri seseorang, semakin baik mereka bisa "memakai" kepercayaan diri itu.';

    $scope.categories = [
        { title: 'Men', image: 'assets/images/men2.jpg', link: 'gallery.html#men' },
        { title: 'Women', image: 'assets/images/women.jpg', link: 'gallery.html#men' }
    ];

    $scope.about = `
        <strong>Fashion Pedia</strong> adalah destinasi utama bagi pecinta mode yang mencari inspirasi, 
        tren terbaru, dan tips styling yang praktis. Didirikan dengan semangat untuk menjadikan fashion 
        sebagai bagian penting dari kehidupan sehari-hari, kami menghubungkan para fashion enthusiast 
        dengan koleksi pakaian dan aksesoris yang modern dan elegan.<br><br>
        Mari eksplorasi dunia fashion bersama kami, karena di <strong>Fashion Pedia</strong>, 
        kami yakin bahwa <i>"Wear Your Confidence"</i> adalah kunci untuk tampil terbaik dalam setiap langkah kehidupanmu.
    `;

    $scope.socialLinks = [
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', alt: 'Facebook', link: '/' },
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', alt: 'Twitter', link: '/' },
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733558.png', alt: 'Instagram', link: '/' }
    ];

    // Inisialisasi posisi slider
    updateSliderPosition(false);
}]);
