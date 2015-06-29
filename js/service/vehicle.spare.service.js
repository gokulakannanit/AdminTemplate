(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
	                purchaseDate:new Date(),
	                paymentMode:'Cash',
                    dealerName:'',
                    spareName:'',
                    spareCode:'',
                    quantity:'',
	                rate:'',
                    amount:'',
                    warrantyPeriod:'',
                    vehicleId:''
	            };
        	};
        	this.filter = 'vehicleId';
            this.$http = $http;
            this.$q = $q;
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
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('vehicle.spare.service', myFactory);
}());