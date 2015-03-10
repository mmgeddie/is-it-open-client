var app = angular.module('iio-app', ['yaru22.angular-timeago']);

app.controller('PageController', function($scope, $http) {
	$http.get('/establishments').
		success(function(data, status, headers, config) {
			angular.forEach(data, function(value, key) {
				var lastUpdate = new Date(value.lastUpdate);
				var currentDate = new Date();
				if (currentDate-lastUpdate<3600000) {
					value.class = "text-success";
				} else if (currentDate-lastUpdate<8.64e+7) {
					value.class = "text-warning";
				} else {
					value.class = "text-danger";
				}
			});
		    $scope.establishments = data;
		});
});