(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
	                date:new Date(),
	                rto:'',
	                emissionNo:'',
	                amount:'',
	                renewalDate:'',
	                paymentMode:'Cash',
	                vehicleId:$scope.$parent.editId      
	            };
        	};
        	this.filter = 'vehicleId';
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.SERVICE_URL = {
                GET_URL: 'api/vehicleInfo/emission/getDetails.php',
                ADD_URL: 'api/vehicleInfo/emission/addDetails.php',
                DELETE_URL: 'api/vehicleInfo/emission/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vehicle.emission.service', myFactory);
}());
