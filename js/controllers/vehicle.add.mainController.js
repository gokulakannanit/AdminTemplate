'use strict';

MetronicApp.controller('vehicle.add.mainController', ['$scope', '$state', '$stateParams', 'vehicle.service',
    function($scope, $state, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            $scope.editId = $stateParams.editId;
        });

        $state.go('vehicleDetail.basic');
    
        $scope.links = [{view:'vehicleDetail.basic', label:'Basic', selected:true},
                        {view:'vehicleDetail.insurance', label:'Insurance', selected:false},
                        {view:'vehicleDetail.fc', label:'Fitness Certificate', selected:false},
                        {view:'vehicleDetail.tyre', label:'Tyre', selected:false},
                        {view:'vehicleDetail.battery', label:'Battery', selected:false},
                        {view:'vehicleDetail.emission', label:'Emission', selected:false}
                        ];

        $scope.selectTab = function(index){
            angular.forEach($scope.links, function(item){
                item.selected = false;
            })
            $scope.links[index].selected = true;
            $state.go($scope.links[index].view);
        };
    }
]);