var app = angular.module("reviewApp", []);

app.controller("ReviewController", function ($scope, $http) {
  $scope.reviews = [];
  $scope.newReview = {};

  // Fungsi untuk mendapatkan semua ulasan dari server
  $scope.getReviews = function () {
    $http.get("/api/reviews").then(function (response) {
      $scope.reviews = response.data;
    });
  };

  // Fungsi untuk menambahkan ulasan baru
  $scope.addReview = function () {
    $http.post("/api/reviews", $scope.newReview).then(function (response) {
      $scope.reviews.push(response.data);
      $scope.newReview = {}; // Reset form ulasan
    });
  };

  // Fungsi untuk menghapus ulasan berdasarkan ID
  $scope.deleteReview = function (id) {
    $http.delete("/api/reviews/" + id).then(function () {
      $scope.reviews = $scope.reviews.filter(function (review) {
        return review._id !== id;
      });
    });
  };

  // Memuat ulasan saat aplikasi dimulai
  $scope.getReviews();
});
