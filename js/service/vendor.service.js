(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    companyName:'',
                    typeOfGoods:'',
                    contactPerson:'',
                    phone:'',           
                    address:'', 
                    email:''
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'vendor';
            this.SERVICE_URL = {
                GET_URL: 'api/vendor/getDetails.php',
                ADD_URL: 'api/vendor/addDetails.php',
                DELETE_URL: 'api/vendor/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('vendor.service', myFactory);
}());