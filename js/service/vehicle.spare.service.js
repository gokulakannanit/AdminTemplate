(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
	                purchaseDate:new Date(),
	                companyName:'',
	                policyNo:'',
	                amount:'',
	                coverageLimit:'',
	                paymentMode:'Cash',
	                vehicleId:''
	            };
        	};
        	this.filter = 'vehicleId';
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.SERVICE_URL = {
                GET_URL: 'api/vehicleInfo/spare/getDetails.php',
                ADD_URL: 'api/vehicleInfo/spare/addDetails.php',
                DELETE_URL: 'api/vehicleInfo/spare/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vehicle.spare.service', myFactory);
}());
