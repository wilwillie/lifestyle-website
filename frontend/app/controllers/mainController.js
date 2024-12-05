app.controller('MainController', ['$scope', '$window', '$interval', '$document', '$http', function ($scope, $window, $interval, $document, $http) {
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
        { id: 1, image: 'assets/images/hoodie.jpg', alt: 'Hoodie', link: 'informationpages/hoodie.html' },
        { id: 2, image: 'assets/images/tshirt.jpg', alt: 'Tshirt', link: 'informationpages/tshirt.html' },
        { id: 3, image: 'assets/images/flannel.jpg', alt: 'Flannel', link: 'informationpages/flannel.html' }
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
        { title: 'Women', image: 'assets/images/women.jpg', link: 'gallery.html#women' }
    ];

    $scope.about = `
        <strong>Fashion Pedia</strong> adalah destinasi utama bagi pecinta mode yang mencari inspirasi, 
        tren terbaru, dan tips styling yang praktis. Didirikan dengan semangat untuk menjadikan fashion 
        sebagai bagian penting dari kehidupan sehari-hari, kami menghubungkan para fashion enthusiast 
        dengan koleksi pakaian dan aksesoris yang modern dan elegan.<br><br>
        Mari eksplorasi dunia fashion bersama kami, karena di <strong>Fashion Pedia</strong>, 
        kami yakin bahwa <i>"Wear Your Confidence"</i> adalah kunci untuk tampil terbaik dalam setiap langkah kehidupanmu.
    `;

    $scope.blogs = [
        {
            title: 'Fashion trends according to seasons',
            category: 'Fashion',
            image: 'assets/images/blogs/article1.jpg',
            link: 'https://www.whowhatwear.com/fashion/trends',
            date: 'Apr 06, 2022',
            author: 'who what wear'
        },
        {
            title: 'Fall & Winter fashion trends',
            category: 'Fashion',
            image: 'assets/images/blogs/article2.jpg',
            link: 'https://www.glamour.com/story/2024-fashion-trends',
            date: 'Jan 18, 2022',
            author: 'glamour'
        },
        {
            title: 'The importance of personal style',
            category: 'Fashion',
            image: 'assets/images/blogs/article3.jpg',
            link: 'https://www.elysestyled.com/blog/what-is-personal-style',
            date: 'Feb 10, 2022',
            author: 'elysestyled'
        },
        {
            title: 'How to Define Your Personal Style',
            category: 'Fashion',
            image: 'assets/images/blogs/article4.jpg',
            link: 'https://www.refinery29.com/en-us/how-to-define-your-style',
            date: 'Mar 01, 2022',
            author: 'Refinery29'
        },
        {
            title: '2024 Color Trends in Fashion',
            category: 'Fashion',
            image: 'assets/images/blogs/article5.jpg',
            link: 'https://www.pantone.com/articles/fashion-color-trends',
            date: 'Mar 15, 2022',
            author: 'Pantone'
        },
        {
            title: 'Minimalist Wardrobe: Essentials You Need',
            category: 'Fashion',
            image: 'assets/images/blogs/article6.jpg',
            link: 'https://www.theminimalistwardrobe.com/blog/minimalist-essentials',
            date: 'Apr 10, 2022',
            author: 'The Minimalist Wardrobe'
        },
        {
            title: 'The Rise of Sustainable Fashion in 2024',
            category: 'Fashion',
            image: 'assets/images/blogs/article7.jpg',
            link: 'https://www.thegoodtrade.com/features/sustainable-fashion',
            date: 'May 20, 2022',
            author: 'The Good Trade'
        },
        {
            title: 'The Ultimate Guide to Capsule Wardrobes',
            category: 'Fashion',
            image: 'assets/images/blogs/article8.jpg',
            link: 'https://www.becomingminimalist.com/capsule-wardrobe/',
            date: 'Jun 05, 2022',
            author: 'Becoming Minimalist'
        },
        {
            title: 'Street Style Looks Dominating 2024',
            category: 'Fashion',
            image: 'assets/images/blogs/streetstyle.jpg',
            link: 'https://www.vogue.com/article/street-style-trends',
            date: 'Jun 18, 2022',
            author: 'Vogue'
        },
        {
            title: 'Fashion Tips for Petite Women',
            category: 'Fashion',
            image: 'assets/images/blogs/article9.jpg',
            link: 'https://www.thepetiteclub.com/blog/fashion-tips-for-petite-women',
            date: 'Jul 10, 2022',
            author: 'The Petite Club'
        },
        {
            title: 'Fashion Trends for Every Body Type',
            category: 'Fashion',
            image: 'assets/images/blogs/article10.jpg',
            link: 'https://www.stitchfix.com/blog/trends/body-type-fashion-tips/',
            date: 'Aug 02, 2022',
            author: 'Stitch Fix'
        },
        {
            title: 'History of Iconic Fashion Eras',
            category: 'Fashion',
            image: 'assets/images/blogs/article11.jpg',
            link: 'https://www.fashiongonerogue.com/history-iconic-fashion-eras/',
            date: 'Sep 12, 2022',
            author: 'Fashion Gone Rogue'
        },
        {
            title: 'Wardrobe Essentials for the Modern Man',
            category: 'Fashion',
            image: 'assets/images/blogs/article12.jpg',
            link: 'https://www.mrporter.com/en-us/journal/fashion/wardrobe-essentials-modern-man-2024',
            date: 'Oct 05, 2022',
            author: 'Mr Porter'
        }
        
    ];

    const container = document.querySelector('.blog-cards-wrapper');

    // Auto-scroll every 3 seconds, loop seamlessly
    let scrollInterval;
    function autoScroll() {
        const maxScrollLeft = container.scrollWidth - container.clientWidth; // Maximum scroll distance
        const currentScrollLeft = container.scrollLeft; // Current scroll position

        // Check if we have reached the end of the scroll
        if (currentScrollLeft >= maxScrollLeft) {
            // When it reaches the end, reset to start but without snapping to position
            container.scrollLeft = 0;
        } else {
            // Continue scrolling to the right
            container.scrollBy({ left: 300, behavior: 'smooth' });
        }
    }

    // Start the auto-scroll interval
    scrollInterval = $interval(autoScroll, 3000);

    // Clear interval when the user manually scrolls to avoid auto-scroll conflicts
    container.addEventListener('scroll', function() {
        if (scrollInterval) {
            $interval.cancel(scrollInterval);
            scrollInterval = null;
        }
    });

    // Restart the auto-scroll after 2 seconds of inactivity
    $interval(function() {
        if (!scrollInterval) {
            scrollInterval = $interval(autoScroll, 3000);
        }
    }, 2000);

    $scope.userRating = null;

    $scope.$watch('userRating', function (newValue, oldValue) {
        console.log('Rating berubah dari:', oldValue, 'ke:', newValue);
    });
    $scope.onRatingChange = function () {
        console.log('Rating berubah ke:', $scope.userRating);
    };
    
    $scope.submitRating = function () {
        if (!$scope.userRating) {
            alert('Silakan pilih rating terlebih dahulu.');
            return;
        }
    
        // Buat payload data
        const payload = {
            email: $scope.username || 'user@example.com', // Ganti dengan email aktual jika ada
            rating: parseInt($scope.userRating, 10) // Pastikan rating adalah angka
        };
    
        console.log('Payload dikirim:', payload);
    
        $http.post('http://127.0.0.1:5000/ratings', payload)
            .then(function (response) {
                console.log('Response dari server:', response.data);
                alert('Rating berhasil dikirim!');
            })
            .catch(function (error) {
                console.error('Error submitting rating:', error);
                alert(error.data.message || 'Terjadi kesalahan. Silakan coba lagi.');
            });

    };
    
    $scope.getRatingStatistics = function () {
        $http.get('http://127.0.0.1:5000/ratings/statistics')
            .then(function (response) {
                const stats = response.data;
                $scope.averageRating = stats.averageRating || 0;
                $scope.totalRatings = stats.totalRatings || 0;
    
                console.log('Statistik Rating:', stats);
            })
            .catch(function (error) {
                console.error('Error fetching rating statistics:', error);
                alert('Gagal memuat statistik rating.');
            });
    };
    
    // Panggil fungsi statistik saat halaman dimuat
    $scope.getRatingStatistics();
    
    
    


    // Data untuk formulir
    $scope.question = {
        email: '',
        text: ''
    };    

    // Fungsi untuk memeriksa login sebelum menampilkan formulir
    $scope.checkLoginForQuestion = function () {
        if (!$scope.isLoggedIn) {
            alert('Silakan login terlebih dahulu untuk mengirimkan pertanyaan.');
            return false;
        }
        return true;
    };

    // Periksa status login dan isi email untuk pertanyaan
    $scope.checkLoginStatus = function () {
        const user = JSON.parse(localStorage.getItem('user')); // Ambil data user dari localStorage
        if (user && user.username) {
            $scope.isLoggedIn = true; // Tandai user sebagai login
            $scope.username = user.username; // Simpan email user sebagai username
            $scope.question.email = user.username; // Isi email ke dalam question
        } else {
            $scope.isLoggedIn = false; // Tandai user sebagai tidak login
            $scope.username = ''; // Kosongkan username
            $scope.question.email = ''; // Kosongkan email
        }
    };

    // Panggil fungsi checkLoginStatus saat controller diinisialisasi
    $scope.checkLoginStatus();


    // Fungsi untuk mengirimkan pertanyaan
    $scope.submitQuestion = function () {
        console.log('submitQuestion dipanggil');
        console.log('Email:', $scope.question.email);
        console.log('Pertanyaan:', $scope.question.text);

        if (!$scope.isLoggedIn) {
            alert('Silakan login terlebih dahulu untuk mengirimkan pertanyaan.');
            return;
        }
        if (!$scope.question.text.trim()) {
            alert('Pertanyaan tidak boleh kosong.');
            return;
        }

        // Kirim data ke backend menggunakan $http
        $http.post('http://127.0.0.1:5000/questions', { 
            email: $scope.question.email,
            question: $scope.question.text
        }).then(function (response) {
            $scope.question.text = ''; // Reset formulir
            alert('Pertanyaan berhasil dikirim. Kami akan membalasnya melalui email!');
        }).catch(function (error) {
            console.error('Error submitting question:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    };
    
    

    $scope.socialLinks = [
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733547.png', alt: 'Facebook', link: '/' },
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png', alt: 'Twitter', link: '/' },
        { icon: 'https://cdn-icons-png.flaticon.com/512/733/733558.png', alt: 'Instagram', link: '/' }
    ];

    // Inisialisasi posisi slider
    updateSliderPosition(false);
}]);
