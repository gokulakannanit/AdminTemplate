(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {
        	this.model = {
        		dataList:[],
        		dataModel:{
	                companyName:'',
	                ssi:'',
	                tan:'',
	                serviceTax:'',
	                pan:'',
	                address:'',
	                owner:'',
	                email:'',
	                phone:'',
	                typeOfCompany:'S'               
	            }
        	};
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'company';
            this.SERVICE_URL = {
                GET_URL: 'api/company/getDetails.php',
                ADD_URL: 'api/company/addDetails.php',
                DELETE_URL: 'api/company/deleteRecord.php'
            };
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('company.service', myFactory);
}());