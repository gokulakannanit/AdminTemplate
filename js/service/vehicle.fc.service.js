(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
	                date:new Date(),
	                rto:'',
	                fcNo:'',
	                amount:'',
	                renewalDate:'',
	                paymentMode:'Cash',
	                vehicleId:''
	            };
        	};
        	this.filter = 'vehicleId';
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.SERVICE_URL = {
                GET_URL: 'api/vehicleInfo/fc/getDetails.php',
                ADD_URL: 'api/vehicleInfo/fc/addDetails.php',
                DELETE_URL: 'api/vehicleInfo/fc/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vehicle.fc.service', myFactory);
}());
