'use strict';

MetronicApp.controller('vehicle.basic.mainController', ['$scope', '$state', 'vehicle.service',
    function($scope, $state, updateService) {
        
        $scope.$on('$viewContentLoaded', function() {
            // initialize core components
            Metronic.initAjax();
            init();
        });
        
        function init(){
        	$scope.makeList = [{title:'Tata', value:'Tata'}, {title:'Leyland', value:'Leyland'}];
        	
        	$scope.ownerShiptype = [{label:"Own", value:"own"}, {label:"Hired", value:"hired"}];

        	$scope.model = {
        		ownershipType:'own',
        		vehicleNo: '',
        		date:new Date(),
        		amtPurchased:'',
        		modelYear:'',
        		make:'',
        		modelYear:'',
        		owner:'',
        		fuelType:'',
        		type:'',
        		chasisNo:'',
        		engineNo:'',
        		odometer:''		
        	}

    		if($scope.$parent.editId){
    			updateService.get($scope.$parent.editId).then(function(data){
					$scope.model = data[0];
	        	})
    		}
        	
        }

        $scope.updateDetails = function() {
            updateService.add($scope.model);
        }

        $scope.reset = function(){
            $scope.form.$setPristine()
        } 

    }
]);