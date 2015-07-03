(function() {
    'use strict';
    function myFactory($http, $q, $state, alertService) {
        var myService = function() {            
            this.getSpareScope = function(){
                return{
                    spareName:'',
                    spareCode:'',
                    rate:'',
                    quantity:'',
                    tax:'',
                    discount:'',
                    warrenty:''
                };
            }
            this.getScope = function(){
                return {
                    paymentMode: 'Cash',
                    vehicleId: '',
                    billNumber: '',
                    billDate: '',
                    workorderType: 'L',
                    labour:'',
                    spareDetail:[this.getSpareScope()]
                };
            };
            this.$http = $http;
            this.$q = $q;
            this.$state = $state;
            this.alertService = alertService;
            this.REDIRECT_STATE = 'workorder';
            this.SERVICE_URL = {
                GET_URL: 'api/workorder/getDetails.php',
                ADD_URL: 'api/workorder/addDetails.php',
                DELETE_URL: 'api/workorder/deleteRecord.php'
            };
            
            this.init();
        }
        myService.prototype = baseService;
        return (new myService());
    }
    myFactory.$inject = ['$http', '$q', '$state', 'alertService'];
    MetronicApp.factory('workorder.service', myFactory);
}());
