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
    myFactory.$inject = ['$http', '$state', 'alertService'];
    MetronicApp.factory('owner.service', myFactory);
}());
