'use strict';

MetronicApp.controller('manage.mainController', ['$scope', '$state', '$stateParams',
    function($scope, $state, $stateParams) {

        $state.go('manage.manufacturer');

        $scope.links = [{view:'manage.manufacturer', label:'Manufacturer', selected:true},
                        {view:'manage.trucks', label:'Trucks', selected:false}
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