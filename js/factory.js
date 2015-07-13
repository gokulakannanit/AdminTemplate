MetronicApp.factory('modalService', function($rootScope, $q, $timeout) {
    var modalService = {},
        defer,
        buttons = {
            'delete': 'danger'
        };

    modalService.show = function(obj) {
        defer = $q.defer();
        $rootScope.modalInitiated = true;
        $rootScope.ftModal = obj;
        $rootScope.ftModal.button = buttons[obj.action];
        $rootScope.ftModal.show = true;
        return defer.promise;
    };

    $rootScope.$watch('ftModal.show', function(newVal) {
        if (defer && newVal === false) {
            defer.resolve($rootScope.ftModal);
        }
    });

    return modalService;
});


MetronicApp.factory('serviceInterceptor', ['$q', function($q) {  
    var responseInterceptor = {
        response: function(response) {
            var deferred = $q.defer();
            
           /* if(response.data.status == 200) {
                deferred.resolve(response.data.data)
            } else if(response.data.status == 500) {
                deferred.resolve('');
            } else if(response.data.status == 401) {
                deferred.resolve('');
            }

            console.log(response);
            return deferred.promise;*/
            return response;
        }
    };

    return responseInterceptor;
}]);

MetronicApp.factory('alertService', function($rootScope, $timeout) {
    var alertService = {};

    function addAnimation() {
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item) {
                item.percent = 0;
            });
        }, 500);
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item, index) {
                item.animation = 'flipOutY';
            });
        }, 3500);
        $timeout(function() {
            angular.forEach($rootScope.alerts, function(item, index) {
                alertService.close(index);
            });
        }, 4000);
    }

    alertService.add = function(type, msg) {
        var icons = {
            'success': 'check',
            'danger': 'times-circle-o'
        };

        if(! $rootScope.alerts){
            $rootScope.alerts = [];
        }
        
        $rootScope.alerts.push({
            'type': type,
            'msg': msg,
            'icon': icons[type],
            percent: 100
        });
        addAnimation();
    };

    alertService.clear = function() {
        $rootScope.alerts = [];
    }

    alertService.close = function(index) {
        $rootScope.alerts.splice(Number(index), 1);
    }

    return alertService;
});