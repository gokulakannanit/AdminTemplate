'use strict';

MetronicApp.controller('DashboardController', ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        Metronic.initAjax();
    });

}]);