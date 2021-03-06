(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    address:'',                 
                    email:'',
                    phone:'',
                    companyName:'',
                    contactPerson:''               
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'client';
            this.SERVICE_URL = {
                GET_URL: 'api/client/getDetails.php',
                ADD_URL: 'api/client/addDetails.php',
                DELETE_URL: 'api/client/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('client.service', myFactory);
}());