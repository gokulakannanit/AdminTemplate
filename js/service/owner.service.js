(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    name: '',
                    phone: '',
                    address: '',
                    email: '',
                    pan: ''
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'owner';
            this.SERVICE_URL = {
                GET_URL: 'api/owner/getDetails.php',
                ADD_URL: 'api/owner/addDetails.php',
                DELETE_URL: 'api/owner/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('owner.service', myFactory);
}());
