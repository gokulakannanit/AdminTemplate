'use strict';

MetronicApp.controller('vehicle.basic.mainController', ['$scope', '$state', '$stateParams', 'vehicle.service',
    function($scope, $state, $stateParams, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });
        
        function init(){
        	$scope.makeList = [{id:'Tata', name:'Tata'}, {id:'Leyland', name:'Leyland'}];
        	
        	$scope.ownerShiptype = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];

        	$scope.model = {
        		vehicleNo: '',
        		date:'',
        		amtPurchased:'',
        		modelYear:'',
        		make:'',
        		typeOfOwnership:'own'
        	}
        }

        $scope.reset = function(){
            $scope.form.$setPristine()
        } 

    }
]);