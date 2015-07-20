(function() {
    'use strict';
    function myFactory($http, $q, $state) {
        var get = function(vehicleId) {

            var defered = $q.defer();
            var setting = {
                    method: 'GET',
                    url: 'api/fuelentrie/getOdometerReading.php?vehicleId='+vehicleId
                };
            var httpCall = $http(setting);

                httpCall.success(function(data){
                    defered.resolve(data);
                });

                return defered.promise;
        }

        return {
            get: get
        }
    }
    myFactory.$inject = ['$http', '$q', '$state'];
    MetronicApp.factory('fuelEntrie.odoMeter.service', myFactory);
}());