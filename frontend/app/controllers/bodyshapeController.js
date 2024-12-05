angular.module('fashionPediaApp', [])
.controller('BodyShapeController', function ($scope) {
        $scope.isModalVisible = false;
        $scope.formData = {};
        $scope.bodyShapeResult = '';
        $scope.bodyShapeImage = '';

        // Fungsi untuk menghitung Body Shape
        $scope.calculateBodyShape = function() {
            const { weight, height, chest, hip, gender } = $scope.formData;

            if (!weight || !height || !chest || !hip || !gender) {
                alert('Harap pilih jenis kelamin dan isi semua field!');
                return;
            }

            let chestHipRatio = chest / hip;
            let heightWeightRatio = height / weight;

        if (gender === 'female') {
            if (chestHipRatio > 1.1) {
                $scope.bodyShapeResult = 'Apple Shape';
                $scope.bodyShapeDescription = 'Apple Shape memiliki tubuh dengan berat badan terpusat di area perut, dengan bentuk tubuh yang lebih besar di bagian atas, terutama di sekitar dada dan perut. Biasanya, bentuk tubuh ini memiliki pinggang yang kurang terlihat, dengan pinggul yang lebih sempit dan kaki yang lebih ramping.';
                $scope.fashionProduct1 = 'Wrap Dress - Membantu memberikan bentuk pada tubuh dengan menarik perhatian pada pinggang.';
                $scope.fashionProduct2 = 'V-neck Top - Membantu menciptakan ilusi leher lebih panjang dan menonjolkan garis wajah.';
                $scope.fashionProduct3 = 'High-Waist Jeans - Meningkatkan proporsi tubuh dengan menekankan pinggang dan memperpanjang kaki.';
                $scope.bodyShapeImage = 'assets/images/bodyshapes/applew.png';
            } else if (chestHipRatio < 0.9) {
                $scope.bodyShapeResult = 'Pear Shape';
                $scope.bodyShapeDescription = 'Pear Shape memiliki pinggul yang lebih lebar dibandingkan dengan dada, dengan tubuh bagian bawah lebih besar dari bagian atas. Biasanya, tubuh ini memiliki pinggang yang jelas dan perut yang ramping, dengan paha dan pinggul yang lebih besar. Pemilik body shape ini cenderung memiliki bentuk tubuh seperti pir dengan kaki yang proporsional.';
                $scope.fashionProduct1 = 'A-line Skirt - Menambahkan volume pada bagian bawah tubuh untuk menyeimbangkan pinggul yang lebih besar.';
                $scope.fashionProduct2 = 'Off-Shoulder Top - Membuka bagian atas tubuh dan menarik perhatian pada bahu dan leher, menyeimbangkan pinggul yang lebih besar.';
                $scope.fashionProduct3 = 'Flared Pants - Membantu menyeimbangkan bentuk tubuh dengan memberi kesan kaki lebih panjang dan proporsional dengan pinggul.';
                $scope.bodyShapeImage = 'assets/images/bodyshapes/pearw.png';
            } else if (chestHipRatio >= 0.9 && chestHipRatio <= 1.1) {
                $scope.bodyShapeResult = heightWeightRatio > 3.2 ? 'Hourglass Shape' : 'Square Shape';
                $scope.bodyShapeDescription = heightWeightRatio > 3.2
                    ? 'Hourglass Shape memiliki tubuh dengan proporsi yang seimbang antara dada dan pinggul, dengan pinggang yang kecil. Bentuk tubuh ini sering dianggap sebagai bentuk tubuh ideal karena simetri dan lekukannya yang jelas. Pemilik tubuh ini cenderung memiliki lekukan alami yang menonjolkan bentuk tubuh mereka, baik di bagian atas maupun bawah.'
                    : 'Square Shape cenderung memiliki tubuh dengan sedikit lekuk atau kurva yang jelas, dengan dada, pinggang, dan pinggul yang hampir sejajar. Bentuk tubuh ini terlihat lebih lurus, dan sering kali tampak atletis, dengan sedikit lekukan di bagian pinggang.';
                $scope.fashionProduct1 = heightWeightRatio > 3.2 ? 'Peplum Top - Menambah volume di sekitar pinggang dan menciptakan lebih banyak lekukan tubuh.' : 'Straight Cut Pants - Membantu memberikan bentuk lebih jelas pada tubuh dengan siluet yang lebih lurus.';
                $scope.fashionProduct2 = heightWeightRatio > 3.2 ? 'Bodycon Dress - Memperlihatkan lekukan tubuh alami dengan pas di tubuh.' : 'Boxy Blazer - Memberikan keseimbangan dengan sedikit volume di bagian atas tubuh.';
                $scope.fashionProduct3 = heightWeightRatio > 3.2 ? 'Fitted Skirt - Menekankan lekukan tubuh dengan garis tubuh yang lebih jelas.' : 'Simple T-shirt - Memiliki desain yang minimalis, memberikan kesan tubuh yang lebih proporsional.';
                $scope.bodyShapeImage = heightWeightRatio > 3.2
                    ? 'assets/images/bodyshapes/hourglassw.png'
                    : 'assets/images/bodyshapes/rectanglew.png';
            }
        } else if (gender === 'male') {
            if (chestHipRatio > 1.1) {
                $scope.bodyShapeResult = 'Inverted Triangle';
                $scope.bodyShapeDescription = 'Inverted Triangle memiliki tubuh dengan dada yang lebih besar dibandingkan pinggul. Pemilik bentuk tubuh ini umumnya memiliki bahu yang lebih lebar dan tubuh bagian atas yang lebih besar. Pinggul mereka cenderung sempit dan kaki terlihat lebih ramping. Bentuk tubuh ini sering ditemukan pada individu dengan tubuh atletis atau berotot, terutama di bagian atas tubuh.';
                $scope.fashionProduct1 = 'Fitted Shirt - Menekankan tubuh bagian atas dengan potongan yang pas di badan, memperlihatkan bentuk tubuh lebih jelas.';
                $scope.fashionProduct2 = 'Slim Fit Jeans - Membantu memberi kesan ramping pada kaki dan menyeimbangkan bagian atas tubuh yang lebih besar.';
                $scope.fashionProduct3 = 'V-neck Sweater - Membuka area leher, menonjolkan bentuk tubuh bagian atas dengan memberikan kesan tubuh lebih ramping di bagian bawah.';
                $scope.bodyShapeImage = 'assets/images/bodyshapes/invertedtrianglem.png';
            } else if (chestHipRatio < 0.9) {
                $scope.bodyShapeResult = 'Triangle';
                $scope.bodyShapeDescription = 'Triangle memiliki tubuh dengan pinggul yang lebih besar dibandingkan dada. Bentuk tubuh ini memiliki bagian bawah tubuh yang lebih besar dari bagian atas. Pinggang mereka jelas terlihat, namun dada cenderung lebih sempit. Pemilik tubuh ini memiliki bentuk tubuh yang lebih lebar di bagian bawah, dengan pinggul yang lebih besar dan kaki yang lebih proporsional.';
                $scope.fashionProduct1 = 'Slim Fit Shirts - Membantu menonjolkan bagian atas tubuh dan membuat tubuh bagian bawah lebih seimbang.';
                $scope.fashionProduct2 = 'Jogger Pants - Memberikan kenyamanan dan keseimbangan dengan bagian bawah tubuh yang lebih lebar.';
                $scope.fashionProduct3 = 'Tapered Trousers - Membantu menyeimbangkan tubuh dengan siluet yang lebih ramping pada bagian kaki.';
                $scope.bodyShapeImage = 'assets/images/bodyshapes/trapezoidm.png';
            } else if (chestHipRatio >= 0.9 && chestHipRatio <= 1.1) {
                $scope.bodyShapeResult = 'Rectangle Shape';
                $scope.bodyShapeDescription = 'Rectangle Shape memiliki tubuh yang lebih lurus tanpa banyak lekukan, dengan dada, pinggang, dan pinggul yang hampir sejajar. Bentuk tubuh ini lebih sering terlihat pada individu dengan tubuh atletis atau kurus, dengan sedikit lekukan atau tidak ada sama sekali di sekitar pinggang. Proporsi tubuh mereka cenderung simetris dan kurang memiliki perbedaan yang jelas antara bagian atas dan bawah.';
                $scope.fashionProduct1 = 'Slim Fit Jackets - Menambahkan struktur pada tubuh dengan memberikan bentuk yang lebih jelas pada bagian atas.';
                $scope.fashionProduct2 = 'Straight Fit Jeans - Memberikan tampilan tubuh yang lebih seimbang dan siluet yang lebih lurus.';
                $scope.fashionProduct3 = 'Casual Shirts - Menambah volume pada bagian atas tubuh untuk memberikan ilusi lekukan alami.';
                $scope.bodyShapeImage = 'assets/images/bodyshapes/rectanglem.png';
            }
        }

        $scope.isModalVisible = true;
    
    };

    // Fungsi untuk menutup modal
    $scope.closeModal = function() {
        $scope.isModalVisible = false;
    };
});