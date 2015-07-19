(function() {
    'use strict';
    function myFactory($http, $q, $state) {
        var get = function(vehicleId) {

            var promise = $q.defer();
            console.log(vehicleId);

            var setting = {
                    method: 'GET',
                    url: 'api/fuelentrie/getOdometerReading.php?vehicleId='+vehicleId
                };
            var httpCall = $http(setting);

                httpCall.success(function(data){
                    console.log(data);
                    promise.resolve(data);
                });

                return promise;
        }

        return {
            get: get
        }
    }
    myFactory.$inject = ['$http', '$q', '$state'];
    MetronicApp.factory('fuelEntrie.odoMeter.service', myFactory);
}());