(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {
        	this.model = {
        		dataList:[],
        		dataModel:{
	                companyName:'',
                    typeOfGoods:'',
                    contactPerson:'',
                    phone:'',           
                    address:'', 
                    email:''
	            }
        	};
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'vendor';
            this.SERVICE_URL = {
                GET_URL: 'api/vendor/getDetails.php',
                ADD_URL: 'api/vendor/addDetails.php',
                DELETE_URL: 'api/vendor/deleteRecord.php'
            };
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vendor.service', myFactory);
}());