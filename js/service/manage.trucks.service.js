(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {        	        	
        	this.getScope = function(){
        		return {
    	            truckModel: '',
                    truckType:'HCV',
                    aircondition:'No',
                    tonnage: '',
                    tankCapacity: '',
                    tyreSize: '',
                    engineCapacity: '',
                    manufacturerId:'',
	            };
        	};
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.SERVICE_URL = {
                GET_URL: 'api/manage/trucks/getDetails.php',
                ADD_URL: 'api/manage/trucks/addDetails.php',
                DELETE_URL: 'api/manage/trucks/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('manage.trucks.service', myFactory);
}());
