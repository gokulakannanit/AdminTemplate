'use strict';

MetronicApp.controller('vehicle.add.mainController', ['$scope', '$state', '$stateParams', 'vehicle.service',
    function($scope, $state, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            $scope.selectedTab = 0;
        });

        $state.go('vehicleDetail.basic');
    
        $scope.links = [{view:'vehicleDetail.basic', label:'Basic'},{view:'vehicleDetail.maintain', label:'Maintain'}];

        $scope.selectTab = function(index){
            $scope.selectedTab = index;
        }
        
        $scope.reset = function(){
            $scope.form.$setPristine()
        } 

    }
]);