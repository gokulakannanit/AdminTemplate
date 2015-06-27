(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    typeOfCompany:'S',
                    companyName:'',
                    ssi:'',
                    tan:'',
                    serviceTax:'',
                    pan:'',
                    address:'',
                    owner:'',
                    email:'',
                    phone:''                                  
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'company';
            this.SERVICE_URL = {
                GET_URL: 'api/company/getDetails.php',
                ADD_URL: 'api/company/addDetails.php',
                DELETE_URL: 'api/company/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('company.service', myFactory);
}());