(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    entrieDate:'',
                    vehicleId:'',
                    lastOdometerReading:'',
                    currentOdometerReading:'',           
                    kmDifference:'', 
                    litres:'',
                    totalCost:'',
                    dealerId:'',
                    driverName:'',
                    comments:''
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'fuelEntrie';
            this.SERVICE_URL = {
                GET_URL: 'api/fuelentrie/getDetails.php',
                ADD_URL: 'api/fuelentrie/addDetails.php',
                DELETE_URL: 'api/fuelentrie/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('fuelEntrie.service', myFactory);
}());