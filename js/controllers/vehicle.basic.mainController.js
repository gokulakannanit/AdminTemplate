'use strict';

MetronicApp.controller('vehicle.basic.mainController', ['$scope', '$state', '$stateParams', 'vehicle.service',
    function($scope, $state, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
        });
            
        $scope.reset = function(){
            $scope.form.$setPristine()
        } 

    }
]);