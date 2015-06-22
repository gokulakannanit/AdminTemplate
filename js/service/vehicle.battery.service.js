(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
	                paymentMode:'Cash',
	                date: new Date(),
	                make: '',
	                batteryNo: '',
	                dealer: '',
	                warrentyDate: '',
	                price: '',
	                receiptNo: '',
	                vehicleId: ''
	            };
        	};
        	this.filter = 'vehicleId';
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.SERVICE_URL = {
                GET_URL: 'api/vehicleInfo/battery/getDetails.php',
                ADD_URL: 'api/vehicleInfo/battery/addDetails.php',
                DELETE_URL: 'api/vehicleInfo/battery/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vehicle.battery.service', myFactory);
}());

