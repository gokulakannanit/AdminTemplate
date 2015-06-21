(function() {
    'use strict';
    function myFactory($http, $state, alertService) {
        var myService = function() {
            this.getScope = function(){
                return {
                    ownershipType:'own',
                    vehicleNo: '',
                    date:new Date(),
                    amtPurchased:'',
                    modelYear:'',
                    make:'',
                    modelYear:'',
                    owner:'',
                    fuelType:'',
                    type:'',
                    chasisNo:'',
                    engineNo:'',
                    odometer:''               
                };
            };
            this.$http = $http;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'vehicle';
            this.SERVICE_URL = {
                GET_URL: 'api/vehicleInfo/getDetails.php',
                ADD_URL: 'api/vehicleInfo/addDetails.php',
                DELETE_URL: 'api/vehicleInfo/deleteRecord.php'
            };
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('vehicle.service', myFactory);
}());
